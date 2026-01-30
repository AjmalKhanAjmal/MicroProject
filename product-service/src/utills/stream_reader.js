const ExcelJS = require("exceljs");
async function readProductsFromExcel(filePath, onRow) {
    const workbook = new ExcelJS.stream.xlsx.WorkbookReader(filePath);

    for await (const worksheet of workbook) {
        let isHeader = true;

        for await (const row of worksheet) {
            if (isHeader) {
                isHeader = false;
                continue;
            }

            onRow({
                name: row.getCell(1).text,
                price: Number(row.getCell(2).value),
                stock: Number(row.getCell(3).value),
                category: row.getCell(4).value,/*  */
            })
        
        }
    }



    // fs.unlink(filePath, (err) => {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         console.log("File deleted");
    //     }
    // });
}
const filePath = "C:\\MicroSe\\product-service\\src\\uploads\\1769691020827-Book11.xlsx";



// console.log(readProductsFromExcel("C:\\MicroSe\\product-service\\src\\uploads\\1769691020827-Book11.xlsx", (data)=>{
// console.log(data);

// }));


(async () => {
  await readProductsFromExcel(filePath, (data) => {
    console.log(data);
  });
})();