const createProduct = require("../services/product-crud")


const saveProduct = async (req, res) => {

    try {
        if (!req || !req.body) {
            return res.status(400).json({
                status: "error",
                message: "bad requst"
            })
        }
        let results = await createProduct(req.body)
        
        return res.status(200).json(results)


    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error : " + error.message
        })
    }
}


module.exports = { saveProduct }