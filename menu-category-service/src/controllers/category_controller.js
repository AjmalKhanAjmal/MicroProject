const service_crud = require("../services/category_crud")

const saveCategory = async (req, res) => {
    try {
        if (!req || !req.body) {
            return res.status(401).json({
                status: "error",
                message: "bad request"
            })
        }
        let results = await service_crud.createCategory(req.body)
        return res.status(200).json({
            status: "success",
            data: results
        })
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}


const editCategory = async (req, res) => {
    try {
        if (!req || !req.body) {
            return res.status(401).json({
                status: "error",
                message: "bad request"
            })
        }

        //console.log("req params : ", req.params);


        let results = await service_crud.updateCategory(req.body)
        if(!results){
            return res.status(404).json({
                status : "error",
                message : "category not found"
            })
        }
        return res.status(200).json(results)

    } catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message
        })
    }
}

const getCategories = async (req, res) => {
    try {
        // if (!req || !req.body) {
        //     return res.status(401).json({
        //         status: "error",
        //         message: "bad request"
        //     })
        // }
        let results = await service_crud.getAllCategories()
        return res.status(200).json({
            status: "success",
            data: results
        })
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

const getCategoryById = async (req, res) => {
    try {
        if (!req || !req.params || !req.params.id) {
            return res.status(401).json({
                status: "error",
                message: "bad request"
            })
        }
        const results = await service_crud.getCategoryById(req.params.id)
        if (!results) {
            return res.status(404).json({
                status: "error",
                message: "category not found"
            })
        }
        return res.status(200).json({
            status: "success",
            data: results
        })
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

const removeCategory = async (req, res) => {
    try {
        if (req && req.params) {
            const results = await service_crud.deleteCategories(req.params)
            return res.json(results)
        }
    } catch (error) {
        return res.json({
            status: "error",
            message: error.message
        })
    }
}

module.exports = { saveCategory, getCategories, editCategory, getCategoryById, removeCategory }