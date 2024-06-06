/**
 * Team 3:
 * Tracy Mai
 * Minnie Cao
 * Kamile Vaicekonis
 * CSC3221 - Netcentric Computing
 * Task Manager Project
 * Filemgr.js
 */

const fs = require("fs/promises");
const jsonFile = "./listdata.json";

/**
 * ReadData function
 * This funciton reads the data from the json file within the try block.
 * It checks to see if the file is there, reads from it, and uses the JSON.parse method to parse the listdata file 
 * and transform it to a JavaScript array, so that it may be treated as an expression.
 * If the request fails, the try block throws an exception and the catch block executes to display an error message.
 * @returns an array that that contains strings from the listdata JSON file
 */
async function ReadData() {
  try {
    await fs.access(jsonFile, fs.constants.R_OK|fs.constants.W_OK);
    const data = await fs.readFile(jsonFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error('ReadData() error');
    return [];
  }
}

/**
 * WriteData function
 * This funciton writes data to the listdata.json file within the try block.
 * If the request fails, the try block throws an exception and the catch block executes to display an error message.
 * @param dataOut is the data that will be written to the listdata JSON file
 * @returns true if the data was written to the JSON file successfully, false if there has been an error
 */
async function WriteData(dataOut) {
  try {
    const data = JSON.stringify(dataOut);
    await fs.writeFile(jsonFile, data, "utf8");
    return true;
  } catch (error) {
    console.error('WriteData() error');
    return false;
  }
}

exports.ReadData = ReadData;
exports.WriteData = WriteData;
