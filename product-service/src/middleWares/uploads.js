const multer = require("multer");
const fs = require("fs");
const path = require("path");
// const pat = require("../../src/uploads")


// const uploadDir = path.join(__dirname, "../../src/uploads"); // adjust according to your folder depth
const uploadDir = path.join(__dirname, "../uploads"); // adjust according to your folder depth



console.log("__dirname",__dirname);   //C:\MicroSe\product-service\src\middleWares

console.log("uploadDir",uploadDir);  //C:\MicroSe\product-service\src\uploads


if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // recursive ensures nested folders are created
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
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
