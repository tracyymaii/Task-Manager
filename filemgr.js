
const fs = require("fs/promises");
const jsonFile = "./listdata.json";


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

async function WriteData(dataOut) {
  try {

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