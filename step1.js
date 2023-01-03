'use strict';

const fsP = require('fs/promises');

/**
 * cat: Read a file and print its contents
 *
 * path: Path to a file to be read
 */
async function cat(path){
  try {
    const contents = await fsP.readFile(path, 'utf8');
    console.log(contents);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

cat(process.argv[2]);