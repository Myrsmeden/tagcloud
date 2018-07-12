# PTC - Political Tag Cloud - Tagcloud.online
A facelift of the Software Engineering project from Findwise, originally conducted in 2016. The tagcloud is a website where the hashtag usage is displayed in a tag cloud, divided by which political parties the account is following

# Architecture
The project is divided in a bunch of different microservices. 
- Index service
- Search service
- Frontend service

## The index service
The index service is responsible for fetching tweets and inserting them into Elastic. The service is divided into the following tasks:
- FollowerFetcher
- TweetFetcher
- TweetIndexer
### The follower fetcher
The follower fetcher is written in golang and is populating the `followers` folder inside the `config` folder. There, files will be found that contains a list with the followers for the account with the same ID as the file name.

### The Tweet fetcher
The Tweet fetcher is fetching tweets from the accounts specified in the files inside the `followers` folder, found in the `config` folder.
The data is sent to RabbitMQ

### The Tweet indexer
The indexing function is consuming from RabbitMQ and inserting the data into Elastic

## The Search service
The search service is serving the endpoints for the frontend and is delivering data from Elastic

## The Frontend service
The frontend service is the static files that forms the frontend seen by the users and is communicating with the search service in order to retrieve data