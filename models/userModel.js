const fs = require('fs').promises;
const path = require('path');

const dataFilePath = path.join(__dirname, '../data.json');

// Read data from the JSON file
async function readData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { users: [], books: [] };
  }
}

// Write data to the JSON file
async function writeData(data) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

module.exports = {
  readData,
  writeData,
};
