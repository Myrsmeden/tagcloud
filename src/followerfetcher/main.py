from pymongo import MongoClient
import json
import ConnectionList as CL
from twython import Twython,TwythonRateLimitError,TwythonError,TwythonAuthError
import sys
import datetime
import time

# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient("mongodb", port=27017, username="mongouser", password="mongopassword")
db=client.accounts

def add_followers(userId, followers):
    db.accounts.update(
        {'id': userId},
        {'$addToSet': {'followers': followers}}
    )


def fetch_followers(userId):
    conn = CL.ConnectionList(filepath="../config/access.conf")
    #Läs userid från stdin
    cursor = -1
    timeout = 1
    while True:
        try:
            # Fetch followers
            response = conn.connection().get_followers_ids(user_id = userId,cursor = cursor)
            
            # Add followers to db
            add_followers(userId, response['ids'])

            # Update cursor
            cursor = response['next_cursor']

            # End if no more data
            if response['next_cursor'] == 0:
                return


        except TwythonAuthError:
                    print("Private account: userId", file=sys.stderr)
                    #Add to blacklist
                    break
                    
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
        #När End Of File: bryt ur while-loopen och avsluta.
        except EOFError as eof:
            print(eof, file=sys.stderr)
            break
        #Skriv ut andra fel till terminalen
        except Exception as other:
            print("Error.. userId="+userid+", cursor="+cursor, file=sys.stderr)
            print(other, file=sys.stderr)

if not db.accounts.find().count():
    accounts_file = open('../config/accounts.json').read()
    accounts = json.loads(accounts_file)
    for party in accounts["parties"]:
        p = {
            'name': party['name'],
            'id': party['users'][0],
            'followers': []
        }
        result=db.accounts.insert_one(p)

for party in db.accounts.find():
    print("Fetching followers for", party['name'])
    fetch_followers(party['id'])
