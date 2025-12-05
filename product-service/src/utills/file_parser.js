// const fs = require("fs");
// const csv = require("csv-parser");
// const XLSX = require("xlsx");
// const { nextTick } = require("process");
// const logger = require("../utills/logger");
// const { log } = require("console");

// module.exports.parseFile = async (filePath) => {
//   try{
//      logger.info("Got hit to file parser ", filePath)
//     console.log("file - path : ", filePath);
    
//   const ext = filePath.split(".").pop().toLowerCase();

//   if (ext === "csv") return await parseCSV(filePath);
//   if (ext === "xlsx") return parseExcel(filePath);

//   throw new Error("Only CSV and Excel files are supported.");
//   }catch(error){
//     logger.error("Error in File Parse ", error)
//     throw error
//   }
// };





const csv = require("csv-parser");
const XLSX = require("xlsx");
const logger = require("../utills/logger");
const stream = require("stream");

module.exports.parseFileFromBuffer = async (file) => {
  try {
    logger.info("Got hit to file parser: " + file.originalname);

    const ext = file.originalname.split(".").pop().toLowerCase();

    if (ext === "csv") return await parseCSVBuffer(file.buffer);
    // if (ext === "xlsx") return parseExcelBuffer(file.buffer);

    throw new Error("Only CSV and Excel files are supported.");
  } catch (error) {
    logger.error("Error in file parser", error);
    throw error;
  }
};



// function parseCSV(filePath) {
//   return new Promise((resolve, reject) => {
//     const rows = [];

//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on("data", (row) => rows.push(row))
//       .on("end", () => resolve(rows))
//       .on("error", reject);
//   });
// }


function parseCSVBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const rows = [];
    const readStream = new stream.Readable();

    readStream.push(buffer);
    readStream.push(null);

    readStream
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}

function parseExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet);
}



// function parseCSV(filePath, callback) {
//   const rows = [];

//   fs.createReadStream(filePath)
//     .pipe(csv())
//     .on("data", row => rows.push(row))
//     .on("end", () => callback(null, rows))
//     .on("error", err => callback(err));
// }

// parseCSV("file.csv", (err, rows) => {
//   console.log(rows);
// });
