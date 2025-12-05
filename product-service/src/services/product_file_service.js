const Product = require("../model/product_modal")
const fs = require("fs")
// function readProductFile() {
//     fs.readFile("C:/Users/Aziz/Downloads/importantFiles-20250311T134635Z-001/importantFiles/Credentials.txt", "utf8", (err, data) => {
//         if (data) {
//             console.log(" file data : ", data);
//         }
//         if (err) {
//             console.log(" file data : ", err);

//         }
//     })
// }

// readProductFile()




// const fs = require("fs");
const csv = require("csv-parser");

function uploadProductData(filePath) {
    
    return new Promise((resolve, reject) => {
        try {
            let product_list = [];

            fs.createReadStream(filePath)
                .pipe(csv()) // CSV headers must match: first_name, phone
                .on("data", (row) => {
                    let product_obj = {
                        name: row.First_name,
                        description: row.Phone
                    };
                    product_list.push(product_obj);
                })
                .on("end", () => resolve(product_list))
                .on("error", (err) => reject(err));
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { uploadProductData };

// module.exports = { uploadProductData }
// module.exports = { readProductFile, uploadProductData }