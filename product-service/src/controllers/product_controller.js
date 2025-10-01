const createProduct = require("../services/product_service")


const saveProduct = async (req, res) => {

    try {
        if (!req || !req.body) {
            return res.status(400).json({
                status: "error",
                message: "bad requst"
            })
        }
        
        let results = await createProduct.createProduct(req.body)

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


            let results = await createProduct.getProductById(req.params.id)
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

                let results = await createProduct.getAllProducts(limit, offset, sort, sort_type, store_id, category_id, status)

                return res.status(200).json(results)
            }else{
                return res.json({
                    status : "error",
                    message : "store id is required"
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
            let results = await createProduct.deleteProductById(id)
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

module.exports = { saveProduct, productById, getProductS, removeProduct }