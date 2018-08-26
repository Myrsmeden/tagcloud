package storage

import (
	"log"
	"time"

	"gopkg.in/olivere/elastic.v5"
)

var ElasticSearch Elastic

// A type that holds our Elastic client, to prevent us from creating it over and over again
type Elastic struct {
	Client *elastic.Client
}

// Create the elastic client and return a Elastic struct containing the client
func Connect() error {
	// Create the Elasticsearch client
	var err error
	var client *elastic.Client
	for {
		client, err = elastic.NewClient(
			elastic.SetURL("http://localhost:9200"),
			elastic.SetSniff(false),
		)
		if err != nil {
			log.Println(err)
			time.Sleep(5 * time.Second)
		} else {
			ElasticSearch = Elastic{client}
			return nil
		}
	}
}
