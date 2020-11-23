const fs = require("fs");
const nano = require("nano")("http://admin:admin@localhost:5984");
const process = require("process");
const { start } = require("repl");

function main() {
  const prompt = require('prompt-sync')({sigint: true});
  console.log("Please enter link of your file");
  let file_name = prompt('>');
  console.log("wait.....");
  insertMulti(file_name);
}

function getNanoDbFunc() {
  console.log(nano.db);
}

function testRequest() {
  const opts = {
    db: "_all_dbs",
    method: "GET",
    path: "http://admin:admin@localhost:5984/_all_dbs",
  };
  nano
    .request(opts)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
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
  var start ;
  var hrStart;
  testFile(path).then((data) => {
    start = new Date();
    hrStart = process.hrtime();
    return person.bulk(JSON.parse(data))
  }).then((res) => {
      var end = new Date() - start;
      var hrEnd = process.hrtime(hrStart);
      console.info("Execution time: %dms", end);
      console.info('Execution time (hr): %ds %dms', hrEnd[0], hrEnd[1] / 1000000);
      console.log("done");
  }).catch((err) => {
      var end = new Date() - start;
      var hrEnd = process.hrtime(hrStart);
      console.info("Execution time: %dms", end);
      console.info('Execution time (hr): %ds %dms', hrEnd[0], hrEnd[1] / 1000000);
      console.log("err");
  }) 
}

function insertMultiInFolder(path) {
  
}

main();


