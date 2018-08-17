'''
    Script to fetch the tweets from one or more users
    The account ids are read from config/followers folder and 
    the tweets are sent to RabbitMQ
'''
print("Hello there")
from requests.packages.urllib3 import response
import pika

import ConnectionList as CL
import json
from twython import Twython,TwythonRateLimitError,TwythonError,TwythonAuthError
import sys
import os
import datetime
import time
import io

sinceId = None
currentUserFile = None
currentUserFileNumber = 0
currentUserFileRow = 0
currentPoliticianId = 0

# Setup files with user ids
files = []
pos = os.path.realpath(__file__).find("/src")
rootdir = os.path.realpath(__file__)[(pos+1):(pos+4)]
for entry in os.scandir(rootdir + '/config/followers'):
    # Exclide stderr file and DS_Store file
    if entry.is_file() and entry.path.find("stderr") == -1 and entry.path.find("DS") == -1:
        files.append(entry.path)

def readUserId():
    global currentUserFile
    global currentUserFileRow
    global currentUserFileNumber
    global currentPoliticianId
    numSearches = 0
    if currentUserFile == None:
        currentUserFile = open(files[currentUserFileNumber]).readlines()
        currentPoliticianId = files[currentUserFileNumber][files[currentUserFileNumber].rfind('/')+1:]
        currentUserFileNumber += 1
    while numSearches < 10:
        
        try:
            user_id = currentUserFile[currentUserFileRow].strip()
            currentUserFileRow += 1
            return user_id 
        except IndexError:
            try:
                currentUserFile = open(files[currentUserFileNumber]).readlines()
                currentUserFileNumber += 1
            except IndexError:
                print("Done with all files. In total processed " + str(currentUserFileNumber) + " files")
                exit()
        numSearches += 1

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
    global currentPoliticianId
    # Variable used to check how many connections that have been tested before putting the script to sleep
    timeout = 1
    conn = CL.ConnectionList(filepath=rootdir + "/config/access.conf")
    # Fetch the first user id
    userId = readUserId()
    # Variable to hold the number of downloaded tweets
    printcount = 0
    # Variables for timestamps
    first = 0
    start = time.time()

    while True:
        try:
            # Fetch next response
            response = conn.connection().get_user_timeline(user_id = userId,count=200,include_rts = True, trim_user = True, max_id = maxId, since_id = sinceId)
            while response == []:
                # If empty response: print to log (stderr)
                end = time.time()
                last = printcount
                print("User Id: " +'\t'+ str(userId), file=sys.stderr)
                print("Tweets: " +'\t'+ str(last - first), file=sys.stderr)
                print("Duration: " +'\t'+ str(end - start), file=sys.stderr)
                print("Total Fetched: " +'\t'+ str(last), file=sys.stderr)
                print("Timestamp: " +'\t'+ str(datetime.datetime.now())+'\n', file=sys.stderr)
                start = time.time()
                first = printcount
                # Fetch next id and reset maxId and fetch new response
                maxId = None
                userId = readUserId()
                response = conn.connection().get_user_timeline(user_id = userId,count=200,include_rts = True, trim_user = True, max_id = maxId, since_id = sinceId)

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
                    channel.basic_publish(exchange='',
                      routing_key='tweets',
                      body=json.dumps(tweet))
                # Increase the number of downloaded tweets
                printcount += 1

            # Update last id
            maxId = response[-1]['id']-1

        except TwythonAuthError:
            # We have reached a private account. Fetch next
            maxId = None
            userId = readUserId()
                    
                    
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
                userId = readUserId()

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
            userId = readUserId()

main()
