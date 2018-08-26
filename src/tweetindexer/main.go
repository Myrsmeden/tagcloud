package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/streadway/amqp"
	"gopkg.in/olivere/elastic.v5"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

// Tweet is a structure used for serializing/deserializing data in Elasticsearch.
type Tweet struct {
	UserID    int                   `json:"user_id"`
	TweetID   int                   `json:"tweet_id"`
	Text      string                `json:"text"`
	Hashtags  []string              `json:"hashtags"`
	Mentions  []string              `json:"mentions"`
	Language  string                `json:"lang"`
	Date      string                `json:"date"`
	Suggest   *elastic.SuggestField `json:"suggest_field,omitempty"`
	Following string                `json:"following"`
}

func main() {
	// Starting with elastic.v5, you must pass a context to execute each service
	ctx := context.Background()

	mapping := `{
		"settings":{
			"number_of_shards":1,
			"number_of_replicas":0
		},
		"mappings":{
			"tweet": {
				"properties": {
					"user_id": {
						"type": "long"
					},
					"tweet_id": {
						"type": "long"
					},
					"following": {
						"type": "keyword"
					},
					"text": {
						"type": "text"
					},
					"hashtags": {
						"type": "keyword"
					},
					"lang": {
						"type": "text"
					},
					"date": {
						"format": "date_time",
						"type": "date"
					}
				}
			}
		}
	}`

	// Obtain a client and connect to the default Elasticsearch installation
	// on 127.0.0.1:9200. Of course you can configure your client to connect
	// to other hosts and configure it in various other ways.
	var err error
	var client *elastic.Client
	for {
		client, err = elastic.NewClient(
			elastic.SetURL("http://elasticsearch:9200"),
			elastic.SetSniff(false),
		)
		if err != nil {
			log.Println(err)
			time.Sleep(5 * time.Second)
		} else {
			break
		}
	}

	// Ping the Elasticsearch server to get e.g. the version number
	info, code, err := client.Ping("http://elasticsearch:9200").Do(ctx)
	if err != nil {
		// Handle error
		panic(err)
	}
	fmt.Printf("Elasticsearch returned with code %d and version %s\n", code, info.Version.Number)

	// Getting the ES version number is quite common, so there's a shortcut
	esversion, err := client.ElasticsearchVersion("http://elasticsearch:9200")
	if err != nil {
		// Handle error
		panic(err)
	}
	fmt.Printf("Elasticsearch version %s\n", esversion)

	_, err = client.DeleteIndex("tweets").Do(ctx)

	// Use the IndexExists service to check if a specified index exists.
	exists, err := client.IndexExists("tweets").Do(ctx)
	if err != nil {
		// Handle error
		panic(err)
	}

	if !exists {
		// Create a new index.
		createIndex, err := client.CreateIndex("tweets").BodyString(mapping).Do(ctx)
		if err != nil {
			// Handle error
			panic(err)
		}
		if !createIndex.Acknowledged {
			// Not acknowledged
		}
	}

	conn, err := amqp.Dial("amqp://guest:guest@rabbitmq:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"tweets", // name
		false,    // durable
		false,    // delete when unused
		false,    // exclusive
		false,    // no-wait
		nil,      // arguments
	)
	failOnError(err, "Failed to declare a queue")

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	failOnError(err, "Failed to register a consumer")

	forever := make(chan bool)

	var tweet Tweet

	go func() {
		for d := range msgs {
			//log.Printf("Received a message: %s", d.Body)
			err := json.Unmarshal(d.Body, &tweet)
			if err != nil {
				panic(err)
			}
			_, err = client.Index().
				Index("tweets").
				Type("tweet").
				BodyJson(tweet).
				Do(ctx)
			if err != nil {
				// Handle error
				panic(err)
			}
			//fmt.Printf("Indexed tweet %s to index %s, type %s\n", put.Id, put.Index, put.Type)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}
