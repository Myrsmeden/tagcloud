'''
    Script to fetch the tweets from one or more users
    The account ids are read from mongodb and 
    the tweets are sent to RabbitMQ
'''
from requests.packages.urllib3 import response
import pika
from pymongo import MongoClient
import ConnectionList as CL
import json
from twython import Twython,TwythonRateLimitError,TwythonError,TwythonAuthError
import sys
import os
import datetime
import time
import io

client = MongoClient("mongodb", port=27017, username="mongouser", password="mongopassword")
db=client.accounts
sinceId = None

pos = os.path.realpath(__file__).find("/src")
rootdir = os.path.realpath(__file__)[(pos+1):(pos+4)]
conn = CL.ConnectionList(filepath=rootdir + "/config/access.conf")

def main():
    # Set up connection to RabbitMQ
    while True:
        try:
            connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
            print("Connected to RabbitMQ")
            break
        except pika.exceptions.ConnectionClosed:
            print("Could not connect to RabbitMQ, waiting")
            time.sleep(10)
    channel = connection.channel()
    channel.queue_declare(queue='tweets')

    maxId = None
    global sinceId
    # Variable used to check how many connections that have been tested before putting the script to sleep
    timeout = 1
    
    # Variable to hold the number of downloaded tweets
    printcount = 0
    # Variables for timestamps
    first = 0
    start = time.time()

    for party in db.accounts.find():
        for userId in party['followers']:
            while True:
                try: 
                    # Fetch next response
                    response = conn.connection().get_user_timeline(user_id = userId,count=200,include_rts = True, trim_user = True, max_id = maxId, since_id = sinceId)
                    if response == []:
                        break

                    for stuff in response:
                        # Set up tweet data to match data wanted in elastic
                        tweet = {}
                        tweet['date'] = datetime.datetime.strptime(stuff["created_at"],
                        "%a %b %d %H:%M:%S %z %Y").strftime("%Y-%m-%dT%H:%M:%S.%fZ")
                        tweet['user_id'] = stuff['user']['id']
                        tweet['tweet_id'] = stuff['id']
                        tweet['hashtags'] = []
                        tweet['lang'] = stuff['lang']
                        tweet['following'] = currentPoliticianId

                        for tag in stuff['entities']['hashtags']:
                            tweet['hashtags'].append(tag['text'])
                        if len(tweet['hashtags']): # Send to RabbitMQ if we have hashtags
                            """channel.basic_publish(exchange='',
                            routing_key='tweets',
                            body=json.dumps(tweet))"""
                        # Increase the number of downloaded tweets
                        printcount += 1

                    # Update last id
                    maxId = response[-1]['id']-1

                except TwythonAuthError:
                    # We have reached a private account. Fetch next
                    maxId = None
                    break
                            
                            
                except TwythonRateLimitError as err:
                    # Rate limit error, wait for 16 minutes
                    timeout += 1
                    print("access "+str(conn.position())+" timed out.", file=sys.stderr)
                    if timeout > conn.size():
                        timeout = 1
                        print(":(", file=sys.stderr)
                        print(err, file=sys.stderr)
                        print(datetime.datetime.now(), file=sys.stderr)
                        time.sleep(60*15+60) #In sec. 60*15 = 15 min + 1min 
                        print(":)", file=sys.stderr)
                except TwythonError as err: #Handle timeouts
                    print("Error:", file=sys.stderr)
                    print(err, file=sys.stderr)
                    print(err.error_code, file=sys.stderr)
                    print("User Id: " +'\t'+ str(userId), file=sys.stderr)
                    if err.error_code == 404:
                        maxId = None
                        break

                except EOFError as eof:
                    print(eof, file=sys.stderr)
                    break
                except Exception as other:
                    # Some other error message
                    print(other, file=sys.stderr)
                    print("{\"userId\":"+str(userId)+",\"maxId\":"+str(maxId)+" \"error\":\"")
                    print(str(other).replace('\n',"\\n"))
                    print("\"}")
                    # Fetch next
                    maxId = None
                    break

main()
