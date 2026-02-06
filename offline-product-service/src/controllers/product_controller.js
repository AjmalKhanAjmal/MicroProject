const product_service = require("../services/product_service")
const logger = require("../utills/logger")
const { productSchema } = require("../utills/productValidator")
const saveProduct = async (req, res, next) => {
    logger.info(" received request to saveProduct /api/product")
    const { name, price, description, status, category_id, store_id, service_type, application_id, product_id, variant_id,tax_category_id } = req.body
    logger.info(" input fields : ", { name, price, description, status, category_id, store_id, service_type, application_id, product_id, variant_id,tax_category_id})
    try {
        let { error } = productSchema.validate(req.body)
        if (error) {
            throw error
        }
        let results = await product_service.createProduct(name, price, description, status, category_id, store_id, service_type, application_id, product_id, variant_id,tax_category_id)
        res.status(200).json(results)

    } catch (error) {
        logger.error("error while saving product : ", {
            error: error.messsage,
            stack: error.stack
        })
        next(error)
        // res.status(500).json(    
        //     {
        //         status : "error",
        //         message : error.message
        //     }
        // )
    }
}


const fetchProducts = async (req, res, next) => {
    try {
        const { store_id, status, service_types, category_ids, application_id } = req.body
        let results = await product_service.getProducts(store_id, status, service_types, category_ids, application_id)
        if (results == null) {
            let error = new Error("data not found")
            error.status = 404
            throw error
        }
        res.status(200).json(results)
    } catch (error) {
        next(error)
    }
}

const removeProduct = async (req, res, next) => {
    try {
        if (req.params.id) {
            logger.info(`Received request remove product : ${req.params.id} `)
            let results = await product_service.deleteProduct(req.params.id)
            logger.info(`Product deleted successffully!`)
            res.status(200).json(results)
        } else {
            let error = new Error("id required")
            error.status = 401
            throw error
        }
    } catch (error) {
        logger.error("error while deleting product : ", {
            error: error.messsage,
            stack: error.stack
        })
        next(error)
    }
}


const fetchIndexProducts = async (req, res, next) => {
    try {
        if (req && req.params) {
            // console.log("req.params.name",req.params.name);

            let results = await product_service.productIndexSearch(req.params.name)
            res.json(results)
        }
    } catch (error) {
        console.log(error);

        next(error)
    }
}


const fetchProductById = async (req, res, next) => {
    try {
        if (req && req.params && req.params.id) {
            let results = await product_service.getProductById(req.params.id)
            if (results == null) {
                let error = new Error("data not found ")
                error.status = 404
                throw error/*  */
            }

            res.status(200).json(results)
        }/*  */
        else {
            let error = new Error("id missing in params ")
            throw error
        }
    } catch (error) {
        next(error)
    }
}
module.exports = { saveProduct, fetchProducts, removeProduct, fetchIndexProducts, fetchProductById }