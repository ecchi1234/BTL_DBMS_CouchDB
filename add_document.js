const fs = require('fs');
const nano = require("nano")("http://admin:admin@localhost:5984");

function create() {
  nano.db
    .create("alice")
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// insert document using promises

function insert() {
  let alice;

  nano.db
    .destroy("alice")
    .then((response) => {
      return nano.db.create("alice");
    })
    .then((response) => {
      alice = nano.use("alice");
      return alice.insert({ happy: true }, "rabbit");
    })
    .then((response) => {
      console.log("you have inserted a document with an _id of rabbit");
      console.log(response);
    });
}

function getDatabaseInformation() {
  nano.db.get("alice").then((body) => {
    console.log(body);
  });
}

function getListDatabase() {
  nano.db.list().then((body) => {
    // body is an array
    body.forEach((db) => {
      console.log(db);
    });
  });
}

function testFile(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, (err, data) => {
            if (!err) {
                resolve(data);
            }
            else {
                reject(err);
            }
        })
})
}

function insertMulti(path) {
    let person = nano.use('person');
    testFile(path).then((data) => {
        return person.bulk(JSON.parse(data))
    }).then((res) => {
        console.log("done");
    }).catch((err) => {
        console.log(err);
    }) 
}

insertMulti('data/data6.json');
