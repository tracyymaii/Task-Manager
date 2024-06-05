/**
 * Members: Tracy Mai, Minnie Cao, Kamile Vaicekonis
 * Assignment: List Manager 
 * File: filemgr.js
 * Course: CSC 3221 - Netcentric Computing - Dr. Dennis Vickers 
 * 
 */

const fs = require("fs/promises");
const jsonFile = "./listdata.json";

/**
 * Read Data
 * Uses try to make sure that the file exists, then it reads the file
 * and returns it as a JSON.
 * Catches the error if one occurs and outputs an error message.
 * @returns the JSON of the data requested.
 */
async function ReadData() {
  try {
    // Make sure the file exists
    await fs.access(jsonFile, fs.constants.R_OK|fs.constants.W_OK);
    // Read the file
    const data = await fs.readFile(jsonFile, "utf8");
    // convert the buffer to a json object and return it
    return JSON.parse(data);
  } catch (error) {
    console.error('ReadData() error');
    return [];
  }
}


/**
 * Write Data
 * Uses try to make sure that the file exists, then it write the input
 * to the file.
 * Catches the error if one occurs and outputs an error message.
 * @param dataOut
 * @returns the JSON of the data requested.
 */
async function WriteData(dataOut) {
  try {
    // Write the file
    const data = JSON.stringify(dataOut);
    await fs.writeFile(jsonFile, data, "utf8");

    return;
  } catch (error) {
    console.error('WriteData() error');
    return;
  }
}

exports.ReadData = ReadData;
exports.WriteData = WriteData;