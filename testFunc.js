const fs = require('fs');

async function print(path) {
  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir) {
    console.log(path + dirent.name);
  }
}
// print('./data/10M-6/1M-1/').catch(console.error);

// Node program to demonstrate the 
// dir.path() API 

// Intiating asyn function 
async function stop(path) { 

// Creating and initiating directory's 
// underlying resource handle 
const dir = await fs.promises.opendir(path); 

// Getting all the dirent of the directory 
for (var i = 1 ; i<=2 ; i++) { 

	// Reading each dirent one by one 
	// by using read() method 
	dir.read( (err, dirent) => { 

	// Display each dirent one by one 
	console.log(`${dirent.name} ${err ? 'does not exist' : 'exists'}`); 
	}); 
} 
} 

// Catching error 
// stop('./data').catch(console.error); 

let f = fs.readFileSync('./data-online/test-data.json');
console.log(JSON.parse(f));
console.log(JSON.parse(f).docs.length);


