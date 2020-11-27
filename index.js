const fs = require("fs");
const nano = require("nano")("http://admin:admin@localhost:5984");
const process = require("process");

function main() {
  const prompt = require("prompt-sync")({ sigint: true });
  console.log("Please enter origin of your file");
  let file_path = prompt("> ");
  console.log("Please enter your choice");
  console.log("1. Insert 1.000.000 documents");
  console.log("2. Insert 10.000.000 documents");
  console.log("3. Insert 3.000.000 documents");
  let choice = parseInt(prompt("> "));
  
  console.log("wait.....");
  if (choice === 1) {
    calculateInsertPerformance(file_path);
  }
  else if (choice === 2) {
    calculateInsertMultiFolderDuplicate(file_path);
  }
  else if (choice === 3) {
    calculateInsertMultiFolderTuple(file_path);
  }
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
// this version of bulk insert will not return a promise
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
// insertMulti("./data/10M-6/1M-4/output1.json");
// this version of bukl insert will return a promise
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
// this is the latest best function
function calculateInsertPerformance(path) {
  let start = new Date();
  let hrStart = process.hrtime();
  let end;
  let hrEnd;
  insertMultiPromise(path + "output1.json")
    .then((res) => {
      return insertMultiPromise(path + "output2.json");
    })
    .then((res) => {
      return insertMultiPromise(path + "output3.json");
    })
    .then((res) => {
      return insertMultiPromise(path + "output4.json");
    })
    .then((res) => {
      return insertMultiPromise(path + "output5.json");
    })
    .then((res) => {
      return insertMultiPromise(path + "output6.json");
    })
    .then((res) => {
      return insertMultiPromise(path + "output7.json");
    })
    .then((res) => {
      return insertMultiPromise(path + "output8.json");
    })
    .then((res) => {
      return insertMultiPromise(path + "output9.json");
    })
    .then((res) => {
      return insertMultiPromise(path + "output10.json");
    })
    .then((res) => {
      return insertMultiPromise(path + "output11.json");
    })
    .then((res) => {
      return insertMultiPromise(path + "output12.json");
    })
    .then((res) => {
      return insertMultiPromise(path + "output13.json");
    })
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

// this is the latest best function (test function)
function calculateInsertPerformanceTest(path) {
  return new Promise((resolve, reject) => {
    insertMultiPromise(path + "output1.json")
      .then((res) => {
        return insertMultiPromise(path + "output2.json");
      })
      .then((res) => {
        return insertMultiPromise(path + "output3.json");
      })
      .then((res) => {
        return insertMultiPromise(path + "output4.json");
      })
      .then((res) => {
        return insertMultiPromise(path + "output5.json");
      })
      .then((res) => {
        return insertMultiPromise(path + "output6.json");
      })
      .then((res) => {
        return insertMultiPromise(path + "output7.json");
      })
      .then((res) => {
        return insertMultiPromise(path + "output8.json");
      })
      .then((res) => {
        return insertMultiPromise(path + "output9.json");
      })
      .then((res) => {
        return insertMultiPromise(path + "output10.json");
      })
      .then((res) => {
        return insertMultiPromise(path + "output11.json");
      })
      .then((res) => {
        return insertMultiPromise(path + "output12.json");
      })
      .then((res) => {
        return insertMultiPromise(path + "output13.json");
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// upgrade to loop in folder
function calculateInsertMultiFolder(path) {
  let start = new Date();
  let hrStart = process.hrtime();
  let end;
  let hrEnd;
  calculateInsertPerformanceTest(path + "1M-2/")
    .then((res) => {
      return calculateInsertPerformanceTest(path + "1M-3/");
    })
    .then((res) => {
      return calculateInsertPerformanceTest(path + "1M-4/");
    })
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

// loop in a folder (it will add duplicate data but it will be oke because couchdb automatically gen id)

function calculateInsertMultiFolderDuplicate(path) {
  let start = new Date();
  let hrStart = process.hrtime();
  let end;
  let hrEnd;
  // loop 10 times folder 1m-4 => we will get 10M
  calculateInsertPerformanceTest(path + "1M-4/")
    .then((res) => {
      return calculateInsertPerformanceTest(path + "1M-4/");
    })
    .then((res) => {
      return calculateInsertPerformanceTest(path + "1M-4/");
    })
    .then((res) => {
      return calculateInsertPerformanceTest(path + "1M-4/");
    })
    .then((res) => {
      return calculateInsertPerformanceTest(path + "1M-4/");
    })
    .then((res) => {
      return calculateInsertPerformanceTest(path + "1M-4/");
    })
    .then((res) => {
      return calculateInsertPerformanceTest(path + "1M-4/");
    })
    .then((res) => {
      return calculateInsertPerformanceTest(path + "1M-4/");
    })
    .then((res) => {
      return calculateInsertPerformanceTest(path + "1M-4/");
    })
    .then((res) => {
      return calculateInsertPerformanceTest(path + "1M-4/");
    })
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

function calculateInsertMultiFolderTuple(path) {
  let start = new Date();
  let hrStart = process.hrtime();
  let end;
  let hrEnd;
  // loop 3 times folder 1m-4 => we will get 10M
  calculateInsertPerformanceTest(path + "1M-4/")
    .then((res) => {
      return calculateInsertPerformanceTest(path + "1M-4/");
    })
    .then((res) => {
      return calculateInsertPerformanceTest(path + "1M-4/");
    })
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

main();