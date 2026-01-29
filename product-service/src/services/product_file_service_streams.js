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










async function readProductsFromExcel(filePath, onBatch) {
  const workbook = new ExcelJS.stream.xlsx.WorkbookReader(filePath);
  let batch = [];
  const BATCH_SIZE = 500;

  for await (const worksheet of workbook) {
    let isHeader = true;

    for await (const row of worksheet) {
      if (isHeader) {
        isHeader = false;
        continue;
      }


      const product = {
        name: row.getCell(1).text,
        price: Number(row.getCell(2).value),
        stock: Number(row.getCell(3).value),
        category: row.getCell(4).value,
      };

      //   if (row.getCell(1).value) {
      //   let data = row.getCell(1).value.richText.map(t => t.text).join("");
      //   product.name = data
      // }
      // Basic validation
      if (!product.name || isNaN(product.price) || isNaN(product.stock)) {
        continue; // skip invalid row
      }

      batch.push(product);

      if (batch.length === BATCH_SIZE) {
        await onBatch(batch);
        batch = [];
      }
    }
  }

  if (batch.length) {
    await onBatch(batch);
  }


   fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File deleted");
    }
  });
}



module.exports = {
  readProductsFromExcel
}