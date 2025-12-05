const logger = require("../utills/logger")
const { validateProductRow } = require("../validations/validate_product_row")

try {
   
    module.exports.processProductFile = (rows) => {
        const validRows = [];
        const errors = [];
        logger.info("got hit to process product file service ")
        rows.forEach((row, index) => {

            let error_prod = validateProductRow(row)
            if (Object.keys(error_prod).length > 0) {
                error_prod.index = index + 1
                errors.push(error_prod)
                // break 
            } else {
                validRows.push(row)
            }

        });
        return {
            validRows, errors
        }
    }

} catch (eror) {
    logger.error("Unexpected error while processing product file", error);
    // next(error)
}


// console.log(processProductFile([{ name: "avc", price: "ksnkc",category_id:1 }, {}]));









// module.exports.validateProductRow = (row) => {
//   const errors = [];

//   if (!row.name || row.name.trim() === "")
//     errors.push("Product name is required");

//   if (!row.price || isNaN(row.price))
//     errors.push("Price must be a valid number");

//   if (row.stock && isNaN(row.stock))
//     errors.push("Stock must be numeric");

//   return errors;
// };









// const fs = require("fs");
// const csv = require("csv-parser");
// const XLSX = require("xlsx");

// module.exports.parseFile = async (filePath) => {
//   const ext = filePath.split(".").pop().toLowerCase();

//   if (ext === "csv") return await parseCSV(filePath);
//   if (ext === "xlsx") return parseExcel(filePath);

//   throw new Error("Only CSV and Excel files are supported.");
// };

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

// function parseExcel(filePath) {
//   const workbook = XLSX.readFile(filePath);
//   const sheet = workbook.Sheets[workbook.SheetNames[0]];
//   return XLSX.utils.sheet_to_json(sheet);
// }
