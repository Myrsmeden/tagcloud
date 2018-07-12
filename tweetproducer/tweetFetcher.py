'''
    Script to fetch the tweets from one or more users
    The account ids are read from config/followers folder and 
    the tweets are sent to RabbitMQ
'''

from requests.packages.urllib3 import response
import pika

# @TODO: Clean imports

import ConnectionList as CL
import json
from twython import Twython,TwythonRateLimitError,TwythonError,TwythonAuthError
import sys
import os
import getopt
import datetime
import time
import io

sinceId = None
currentUserFile = None
currentUserFileNumber = 0
currentUserFileRow = 0

# Setup files with user ids
files = []
for entry in os.scandir('../config/followers'):
    # Exclide stderr file and DS_Store file
    if entry.is_file() and entry.path.find("stderr") == -1 and entry.path.find("DS") == -1:
        files.append(entry.path)

def readUserId():
    global currentUserFile
    global currentUserFileRow
    global currentUserFileNumber
    numSearches = 0
    if currentUserFile == None:
        currentUserFile = open(files[currentUserFileNumber]).readlines()
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
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    except pika.exceptions.ConnectionClosed:
        print("Could not connect to RabbitMQ")
        exit()
    channel = connection.channel()
    channel.queue_declare(queue='tweets')

    maxId = None
    global sinceId
    # Variable used to check how many connections that have been tested before putting the script to sleep
    timeout = 1
    conn = CL.ConnectionList(filepath="../config/access.conf")
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
                # Send the tweet to RabbitMQ
                channel.basic_publish(exchange='',
                      routing_key='tweets',
                      body=json.dumps(stuff))
                # Increase the number of downloaded tweets
                printcount += 1

            # Update last id
            maxId = response[-1]['id']-1

        except TwythonAuthError:
                    #Skriv ut dummy json vid privat konto. på det sättet får inte en jsonparser spasmer, men vi har fortfarande info om de kontona.
                    print('{"text": "privateaccount", "entities": {"symbols": [], "urls": [], "hashtags": [], "user_mentions": []}, "id": null, "user": {"id_str": "'+str(userId)+'", "id": '+str(userId)+'}, "created_at": null, "is_quote_status": false, "in_reply_to_user_id_str": null, "id_str": null, "lang": null, "place": null, "in_reply_to_user_id": null, "source": null, "in_reply_to_status_id_str": null}')
                    #Läs nästa
                    maxId = None
                    userId = readUserId()
                    
                    
        except TwythonRateLimitError as err:
            timeout += 1
            print("access "+str(conn.position())+" timed out.", file=sys.stderr)
            if timeout > conn.size():
                timeout = 1
                print(":(", file=sys.stderr)
                print(err, file=sys.stderr)
                print(datetime.datetime.now(), file=sys.stderr)
                time.sleep(60*15+60) #In sec. 60*15 = 15 min + 1min 
                print(":)", file=sys.stderr)
        except TwythonError as err: #Handel timeouts
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
            #Vid annat felmeddelande skriv ut felmeddelandet som json så att det går att se i efterhand.
            #Meddelandet skrivs ut på en rad genom att alla newlines byts ut till '\\n'
            print(other, file=sys.stderr)
            print("{\"userId\":"+str(userId)+",\"maxId\":"+str(maxId)+" \"error\":\"")
            print(str(other).replace('\n',"\\n"))
            print("\"}")
            #Läs nästa
            maxId = None
            userId = readUserId()

main()
