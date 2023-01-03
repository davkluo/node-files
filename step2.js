'use strict';

const fsP = require('fs/promises');
const axios = require('axios');

/**
 * cat: Read a file and print its contents
 *
 * path: Path to a file to be read
 */
async function cat(path) {
  try {
    const contents = await fsP.readFile(path, 'utf8');
    console.log(contents);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

/**
 * webCat: Make a GET request to a URL, read its contents, and print them
 * to the console
 *
 * URL: URL string
 */
async function webCat(URL) {
  try {
    const contents = await axios.get(URL);
    console.log(contents);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

const input = process.argv[2];

if (input.includes('http://') ||
  input.includes('https://')) {
    webCat(input);
  } else {
    cat(input);
  }