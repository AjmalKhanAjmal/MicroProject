const multer = require("multer");
const fs = require("fs");
const path = require("path");
// const pat = require("../../src/uploads")


const uploadDir = path.join(__dirname, "../../src/uploads"); // adjust according to your folder depth

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // recursive ensures nested folders are created
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

module.exports = upload;
