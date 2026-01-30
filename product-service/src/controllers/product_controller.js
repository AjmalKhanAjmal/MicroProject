const createProduct = require("../services/product_service")
const productFileService = require("../services/product_file_service")
const logger = require("../utills/logger")
const { parseFileFromBuffer } = require("../utills/file_parser")
const { processProductFile } = require("../services/productUpload.service")
const path = require("path");
const { readProductsFromExcel } = require("../services/product_file_service_streams")
const Product = require("../model/product_modal")
const saveProduct = async (req, res) => {

    try {
        if (!req || !req.body) {
            return res.status(400).json({
                status: "error",
                message: "bad requst"
            })
        }

        let results = await createProduct.createProduct(req.body, req.redisClient)

        return res.status(200).json(results)


    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error : " + error.message
        })
    }
}


const productById = async (req, res) => {
    try {
        if (req.params && req.params.id) {


            let results = await createProduct.getProductById(req.params.id, req.redisClient)
            if (results === null) {
                return res.status(404).json({
                    status: "error",
                    message: "product not found"
                })
            }
            return res.status(200).json(results)
        }
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}


const getProductS = async (req, res) => {
    try {
        if (req && req.query && req.query) {
            if (req.query.store_id) {
                limit = req.query.limit
                offset = req.query.offset
                sort = req.query.sort
                sort_type = req.query.sort_type
                category_id = req.query.category_id
                status = req.query.status
                store_id = req.query.store_id

                let results = await createProduct.getAllProducts(limit, offset, sort, sort_type, store_id, category_id, status, req.redisClient)

                return res.status(200).json(results)
            } else {
                return res.json({
                    status: "error",
                    message: "store id is required"
                })
            }
        }
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

const removeProduct = async (req, res) => {
    try {
        if (req && req.params) {
            let id = req.params.id
            let results = await createProduct.deleteProductById(id, req.redisClient)
            if (results === null) {
                return res.status(404).json({
                    status: "error",
                    message: "product not found "
                })
            }
            return res.status(200).json(results)
        }
    } catch (error) {
        return res.status(200).json({
            status: "error",
            message: error.message
        })
    }
}



const uploadFileProducts = async (req, res) => {
    console.log("req.file.path  : ", "abcccccc");
    try {
        console.log("req.file.path  : ", req.file.path);
        console.log("req.file  : ", req.file);
        let results = await productFileService.uploadProductData(req.file.path)
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({
            status: "error",
            "message": error.message
        })
    }
}

// const productUploadController = async (req,res)=>{
//     let results = parseFile(req.file.path)
//     res.json(results)
// }

async function productUploadController(req, res, next) {
    try {
        logger.info("Got hit to process product file controller");
        console.log("File received:", req.file);

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        let results = await parseFileFromBuffer(req.file);
        let files_data = await processProductFile(results)
        res.json(files_data);

    } catch (error) {
        logger.error("Unexpected error in product file controller", error);
        next(error);
    }
}



async function productStream(req, res) {
    // let data = await importProductsWithStream()

    // let parsed_sheet_data = await parseFileFromBuffer(req.file)
    // let data = await importProductsWithStream(parsed_sheet_data)


    // res.json(data)

    // const filePath = path.join(__dirname, "../../uploads/products.xlsx");
    // const filePath = path.join(__dirname, "../../sample_uploads/Book11.xlsx");


    // console.log("folders name ",__dirname);
    
    //   const transaction = await sequelize.transaction();
    if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
let products_data = []
    try {
        console.log("req.file.path : ", req.file.path);
        
        await readProductsFromExcel(req.file.path, async (productsBatch) => {
            
            //   await Product.bulkCreate(productsBatch, {
            //     transaction,
            //     validate: true,
            //   });
           products_data =  productsBatch
           
        });

        // await transaction.commit();

        res.status(200).json({
            data : products_data,
            success: true,
            message: "Products imported successfully",
        });
    } catch (error) {
        // await transaction.rollback();

        console.error("Import failed:", error);

        res.status(500).json({
            success: false,
            message: "Product import failed",
        });
    }
};



module.exports = { saveProduct, productById, getProductS, removeProduct, uploadFileProducts, productUploadController, productStream }