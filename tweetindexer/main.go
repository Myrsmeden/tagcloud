package main

import (
	"context"
	"fmt"
	"log"

	"github.com/olivere/elastic"
	"github.com/streadway/amqp"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

// Tweet is a structure used for serializing/deserializing data in Elasticsearch.
type Tweet struct {
	UserID    string                `json:"user_id"`
	TweetID   string                `json:"tweet_id"`
	Text      string                `json:"text"`
	Hashtags  []string              `json:"hashtags"`
	Mentions  []string              `json:"mentions"`
	Langugage string                `json:"lang"`
	Date      string                `json:"date"`
	Suggest   *elastic.SuggestField `json:"suggest_field,omitempty"`
}

func main() {
	// Starting with elastic.v5, you must pass a context to execute each service
	ctx := context.Background()

	// Obtain a client and connect to the default Elasticsearch installation
	// on 127.0.0.1:9200. Of course you can configure your client to connect
	// to other hosts and configure it in various other ways.
	client, err := elastic.NewSimpleClient(elastic.SetURL("http://:9200"))
	if err != nil {
		// Handle error
		panic(err)
	}

	// Ping the Elasticsearch server to get e.g. the version number
	info, code, err := client.Ping("http://localhost:9200").Do(ctx)
	if err != nil {
		// Handle error
		panic(err)
	}
	fmt.Printf("Elasticsearch returned with code %d and version %s\n", code, info.Version.Number)

	// Getting the ES version number is quite common, so there's a shortcut
	esversion, err := client.ElasticsearchVersion("http://localhost:9200")
	if err != nil {
		// Handle error
		panic(err)
	}
	fmt.Printf("Elasticsearch version %s\n", esversion)

	// Use the IndexExists service to check if a specified index exists.
	exists, err := client.IndexExists("tweets").Do(ctx)
	if err != nil {
		// Handle error
		panic(err)
	}

	if !exists {
		// Create a new index.
		createIndex, err := client.CreateIndex("tweets").Do(ctx)
		if err != nil {
			// Handle error
			panic(err)
		}
		if !createIndex.Acknowledged {
			// Not acknowledged
		}
	}

	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
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

	go func() {
		for d := range msgs {
			log.Printf("Received a message: %s", d.Body)
			put, err := client.Index().
				Index("tweets").
				Type("tweet").
				BodyString(string(d.Body)).
				Do(ctx)
			if err != nil {
				// Handle error
				panic(err)
			}
			fmt.Printf("Indexed tweet %s to index %s, type %s\n", put.Id, put.Index, put.Type)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}
