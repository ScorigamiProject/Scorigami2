# Module used to connect Python with MongoDb
import pymongo

# The default port used by MongoDB is 27017
# https://docs.mongodb.com/manual/reference/default-mongodb-port/
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

# Define the 'classDB' database in Mongo
db = client.nfl_teams

# Query all students
# Here, db.classroom refers to the collection 'classroom '
nfl_teams = db.collection.find()

# Iterate through each student in the collection
for x in nfl_teams:
    print(x)