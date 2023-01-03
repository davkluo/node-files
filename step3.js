'use strict';

const fsP = require('fs/promises');
const axios = require('axios');

/**
 * getAndHandleContents: Controller for getting contents and either logging
 * or writing to file.
 */
async function getAndHandleContents() {
    const contents = await getContents();
    handleContents(contents);
}

/**
 * getContents: get contents from path, regardless of write to file or console
 */
async function getContents() {
    let userInputPath;

    if (process.argv[2] === "--out") {
        userInputPath = process.argv[4]
    } else {
        userInputPath = process.argv[2]
    }
    
    if (userInputPath.startsWith('http://') ||
      userInputPath.startsWith('https://')) {
        return await webCat(userInputPath);
    } else {
        return await cat(userInputPath);
    }
}

/**
 * handleContents: either write to file or log to console, depending on whether
 * "--out" flag was provided.
 */
async function handleContents(contents) {
    if (process.argv[2] === "--out") {
        await writeToFile(process.argv[3], contents);
    } else {
        console.log(contents);
    }
}

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

  return contents;
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

  return contents;
}

/**
 * writeToFile: writes the provided data to the provided file; throws error if
 * file path doesn't exist.
 */
async function writeToFile(path, data) {
    try {
        await fsP.writeFile(path, data, "utf8");
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }

    console.log("Successfully written!");
}




getAndHandleContents();