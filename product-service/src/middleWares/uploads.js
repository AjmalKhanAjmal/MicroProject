const multer = require("multer");
const fs = require("fs");
const path = require("path");
// const pat = require("../../src/uploads")


// const uploadDir = path.join(__dirname, "../../src/uploads"); // adjust according to your folder depth
const uploadDir = path.join(__dirname, "../uploads"); // adjust according to your folder depth



console.log("__dirname",__dirname);   //C:\MicroSe\product-service\src\middleWares

console.log("uploadDir",uploadDir);  //C:\MicroSe\product-service\src\uploads


if (!fs.existsSync(uploadDir)) {    //Checks does this folder already exist?    
    fs.mkdirSync(uploadDir, { recursive: true }); 
    // Creates the folder uploadDir
// recursive: true means:
// Create parent folders if missing
// Don’t throw error if already exists
// recursive ensures nested folders are created
} 

const storage = multer.diskStorage(
    {  //Store uploaded files on DISK, not in memory
    
    destination: (req, file, cb) => cb(null, uploadDir), // Tells Multer WHERE to save the file
    // req → request object (not used here)
    // file → uploaded file metadata
    // cb →     callback Multer uses

    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    //Generates a unique filename Adds timestamp before original name EX : 1700000000-products.xlsx
});

const upload = multer({ storage });

module.exports = upload;



// middlewares/upload.middleware.js
// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (_, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// module.exports = multer({
//   storage,
//   fileFilter: (_, file, cb) => {
//     if (!file.originalname.endsWith(".xlsx")) {
//       return cb(new Error("Only Excel files allowed"));
//     }
//     cb(null, true);
//   },
// });
