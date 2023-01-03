'use strict';

const fsP = require('fs/promises');

/**
 * cat: Read a file and print its contents
 *
 * path: Path to a file to be read
 */
async function cat(path){
  let contents;

  try {
    contents = await fsP.readFile(path, 'utf8');
  } catch (err) {
    console.error(err.message); // Could customize this more.
    process.exit(1);
  }

  console.log(contents);
}

cat(process.argv[2]);