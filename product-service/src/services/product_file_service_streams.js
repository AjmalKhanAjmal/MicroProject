const fs = require("fs");
const ExcelJS = require("exceljs");
// const { Product, sequelize } = require("./models");

async function importProductsWithStream(path) {
  // 1. Create Excel STREAM reader
  // const workbook = new ExcelJS.stream.xlsx.WorkbookReader("C:\\Users\\Aziz\\Downloads\\Book11.xlsx");
  const workbook = new ExcelJS.stream.xlsx.WorkbookReader(path);

  let batch = [];

  // 2. Read worksheet → row by row
  for await (const worksheet of workbook) {
    for await (const row of worksheet) {

      // Skip header row
      if (row.number === 1) continue;
      // const nameCell = row.getCell(1).value;

      // const product = {
      //     name: getSafeValue(row.getCell(1)),
      //     price: Number(getSafeValue(row.getCell(2))),
      //     quantity: Number(getSafeValue(row.getCell(3)))
      // };

      const product = {
        name: row.getCell(1).value,
        price: row.getCell(2).value,
        quantity: row.getCell(3).value
      };

      batch.push(product);

      // 3. Bulk insert every 500 rows (industry practice)
      //   if (batch.length === 500) {
      //     await Product.bulkCreate(batch);
      //     batch = [];
      //   }
    }
  }

  let data = batch

  // 4. Insert remaining rows
  //   if (batch.length > 0) {
  //     await Product.bulkCreate(batch);
  //   }


  console.log("batch : ", data);
  // fs.unlink(path);


  return data

  console.log("Products inserted USING streams + Sequelize");
}


function getSafeValue(cell) {
  if (!cell || cell.value == null) return null;

  // number or plain string
  if (typeof cell.value === "string" || typeof cell.value === "number") {
    return cell.value;
  }

  // rich text
  if (cell.value.richText) {
    return cell.value.richText.map(r => r.text).join("");
  }

  // formula
  if (cell.value.formula) {
    return cell.value.result;
  }

  // fallback (sharedString etc.)
  return String(cell.text);
}

// importProductsWithStream();










// async function readProductsFromExcel(filePath, onBatch) {
//   const workbook = new ExcelJS.stream.xlsx.WorkbookReader(filePath);
//   let batch = [];
//   // const BATCH_SIZE = 500;
//   const BATCH_SIZE = 5;

//   for await (const worksheet of workbook) {
//     let isHeader = true;

//     for await (const row of worksheet) {
//       if (isHeader) {
//         isHeader = false;
//         continue;
//       }

//       const product = {
//         // name: row.getCell(1).text,
//         name: getCellValue(row.getCell(1)),
//         price: Number(row.getCell(2).value),
//         stock: Number(row.getCell(3).value),
//         category: row.getCell(4).value,
//       };

//       if (!product.name || isNaN(product.price) || isNaN(product.stock)) {
//         continue;
//       }

//       batch.push(product);

//       if (batch.length === BATCH_SIZE) {
//         await onBatch(batch);
//         batch = [];
//       }
//     }
//   }

//   if (batch.length) {
//     await onBatch(batch);
//   }


//   fs.unlink(filePath, (err) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log("File deleted");
//     }
//   });
// }






async function readProductsFromExcel(filePath, onBatch) {
  const workbook = new ExcelJS.stream.xlsx.WorkbookReader(filePath);
  let batch = [];
  const BATCH_SIZE = 5;

  for await (const worksheet of workbook) {
    let columnMap = null;

    for await (const row of worksheet) {

      // ---- READ HEADER ----
      if (!columnMap) {
        columnMap = {};

        row.eachCell((cell, colNumber) => {
          const header = cell.text

          if (header.includes("name")) columnMap.name = colNumber;
          if (header.includes("price")) columnMap.price = colNumber;
          // if (header.includes("stock") || header.includes("qty")) columnMap.stock = colNumber;
          // if (header.includes("category")) columnMap.category = colNumber;
        });

        continue;
      }

      // ---- READ DATA ----
      const name = getCellValue(row.getCell(columnMap.name));
      const price = Number(getCellValue(row.getCell(columnMap.price)));
      // const stock = Number(getCellValue(row.getCell(columnMap.stock)));
      // const category = getCellValue(row.getCell(columnMap.category));

      const product = {
        name: name ? `${name}` : null,
        price
        // stock,
        // category
      };

      if (!product.name || isNaN(product.price)) continue;

      batch.push(product);

      if (batch.length === BATCH_SIZE) {
        await onBatch(batch);
        batch = [];
      }
    }
  }

  if (batch.length) await onBatch(batch);

  fs.unlink(filePath, () => {});
}




// async function readProductsFromExcel(filePath, onBatch) {

//   console.log("reached stream ");
  
//   return new Promise((resolve, reject) => {

//     const workbook = new ExcelJS.stream.xlsx.WorkbookReader(filePath, {
//       worksheets: "emit",
//       sharedStrings: "cache"
//     });

//     const BATCH_SIZE = 5;
//     let batch = [];
//     let columnMap = null;

//     workbook.on("worksheet", worksheet => {

//       worksheet.on("row", async row => {

//         try {

//           // HEADER ROW
//           if (!columnMap) {
//             columnMap = {};

//             row.eachCell((cell, colNumber) => {
//               const header = String(cell.text).trim().toLowerCase();

//               if (header === "name") columnMap.name = colNumber;
//               if (header === "price") columnMap.price = colNumber;
//             });

//             if (!columnMap.name || !columnMap.price) {
//               return reject(new Error("Excel must contain name and price columns"));
//             }

//             console.log("Detected Columns:", columnMap);
//             return;
//           }

//           // DATA ROW
//           const name = row.getCell(columnMap.name).text;
//           const price = Number(row.getCell(columnMap.price).text);

//           if (!name || isNaN(price)) return;

//           batch.push({ name, price });

//           if (batch.length >= BATCH_SIZE) {
//             worksheet.pause();          // IMPORTANT
//             await onBatch(batch);
//             batch = [];
//             worksheet.resume();         // IMPORTANT
//           }

//         } catch (err) {
//           reject(err);
//         }
//       });

//       worksheet.on("finished", async () => {
//         if (batch.length) await onBatch(batch);
//       });

//     });

//     workbook.on("end", () => {
//       fs.unlink(filePath, () => {});
//       resolve();
//     });

//     workbook.on("error", reject);
//   });
// }



function getCellValue(cell) {
  if (!cell) return null;

  const v = cell.value;

  // plain
  if (typeof v === "string" || typeof v === "number") return v;

  // shared string
  if (v?.sharedString !== undefined) return cell.text;

  // rich text
  if (v?.richText) return v.richText.map(t => t.text).join("");

  // formula
  if (v?.formula) return v.result;

  // hyperlink
  if (v?.text) return v.text;

  return cell.text || null;
}

module.exports = {
  readProductsFromExcel
}