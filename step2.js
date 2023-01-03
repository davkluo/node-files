'use strict';

const fsP = require('fs/promises');
const axios = require('axios');

/**
 * cat: Read a file and print its contents
 *
 * path: Path to a file to be read
 */
async function cat(path) {
  let contents;

  try {
    contents = await fsP.readFile(path, 'utf8');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  console.log(contents);
}

/**
 * webCat: Make a GET request to a URL, read its contents, and print them
 * to the console
 *
 * URL: URL string
 */
async function webCat(URL) {
  let contents;

  try {
    contents = await axios.get(URL);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  console.log(contents);
}

const input = process.argv[2];

if (input.startsWith('http://') ||
  input.startsWith('https://')) {
    webCat(input);
  } else {
    cat(input);
  }