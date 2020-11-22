import couchdb  # importing couchdb
import time
# Connecting with couchdb Server
start_time = time.time()
couch = couchdb.Server("http://admin:admin@127.0.0.1:5984/")
# Creating Database
db = couch['test']
print("Database used")
# Creating document
for a in range(100000):
    doc = {'number': ""}
    doc['number'] = a
    db.save(doc)
    # db.save(doc) # Saving document
    print("Document created")
    # Fetching document from the database
    print("Name is:", doc['number'])
end_time = time.time();
print("time executed:", (end_time - start_time))
