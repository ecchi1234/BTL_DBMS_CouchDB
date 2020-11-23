const fs = require('fs');

async function print(path) {
  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir) {
    console.log(path + dirent.name);
  }
}
print('./data/10M-6/1M-1/').catch(console.error);

