const fs = require("fs");
const nano = require("nano")("http://admin:admin@localhost:5984");
const process = require("process");

function main() {
  const prompt = require("prompt-sync")({ sigint: true });
  console.log("Please enter link of your file");
  let file_name = prompt(">");
  console.log("wait.....");
  insertMulti(file_name);
}

function testFile(path) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}
// this version of insert multi will not return a promise
function insertMulti(path) {
  let person = nano.use("person");
  let start;
  let hrStart;
  testFile(path)
    .then((data) => {
      start = new Date();
      hrStart = process.hrtime();
      return person.bulk(JSON.parse(data));
    })
    .then((res) => {
      var end = new Date() - start;
      var hrEnd = process.hrtime(hrStart);
      console.info("Execution time: %dms", end);
      console.info(
        "Execution time (hr): %ds %dms",
        hrEnd[0],
        hrEnd[1] / 1000000
      );
      console.log("done");
    })
    .catch((err) => {
      var end = new Date() - start;
      var hrEnd = process.hrtime(hrStart);
      console.info("Execution time: %dms", end);
      console.info(
        "Execution time (hr): %ds %dms",
        hrEnd[0],
        hrEnd[1] / 1000000
      );
      console.log("err");
    });
}
// this version of insert multi will return a promise
function insertMultiPromise(path) {
  let person = nano.use("person");
  let fileContent = fs.readFileSync(path);
  return new Promise((resolve, reject) => {
    person
      .bulk(JSON.parse(fileContent))
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// this function insert all of file in a directory but sometimes it raise error???
async function insertMultiFolder(path) {
  const dir = await fs.promises.opendir(path);
  let start = new Date();
  let hrStart = process.hrtime();
  let end;
  let hrEnd;
  for await (const dirent of dir) {
    insertMultiPromise(path + dirent.name)
      .then((res) => {
        end = new Date() - start;
        hrEnd = process.hrtime(hrStart);
        console.info("Execution time: %dms", end);
        console.info(
          "Execution time (hr): %ds %dms",
          hrEnd[0],
          hrEnd[1] / 1000000
        );
        console.log("done");
      })
      .catch((err) => {
        end = new Date() - start;
        hrEnd = process.hrtime(hrStart);
        console.info("Execution time: %dms", end);
        console.info(
          "Execution time (hr): %ds %dms",
          hrEnd[0],
          hrEnd[1] / 1000000
        );
        console.log("err");
      });
  }
}

// another verson of above function

async function insertMultiFolderOld(path) {
  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir) {
    insertMulti(path + dirent.name);
  }
}

// insertMultiFolder('./data-online/');

// const arr = [0, 1, 2, 3, 4]

// for await (const i of arr) {
//   main();
// }

// main();
let start = new Date();
let hrStart = process.hrtime();
let end;
let hrEnd;
insertMultiPromise("./test-data/data3.json")
  .then((res) => {
    return insertMultiPromise("./test-data/data4.json");
  })
  .then((res) => {
    return insertMultiPromise("./test-data/data5.json");
  })
  .then((res) => {
    return insertMultiPromise("./test-data/data6.json");
  })
  .then((res) => {
    end = new Date() - start;
    hrEnd = process.hrtime(hrStart);
    console.info("Execution time: %dms", end);
    console.info("Execution time (hr): %ds %dms", hrEnd[0], hrEnd[1] / 1000000);
    console.log("done");
  })
  .catch((err) => {
    end = new Date() - start;
    hrEnd = process.hrtime(hrStart);
    console.info("Execution time: %dms", end);
    console.info("Execution time (hr): %ds %dms", hrEnd[0], hrEnd[1] / 1000000);
    console.log("err");
  });
