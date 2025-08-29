const menu_service = require("../services/menu_service")

const saveMenu = async (req, res) => {
    try {
        if (!req || !req.body) {
            return res.status(400).json({
                status: "error",
                message: " bad request"
            })
        }
        let results = await menu_service.createMenu(req.body)
        return res.status(200).json({
            status: "success",
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: `Error in creating menu ${error.message}`
        })
    }
}




const getMenu = async (req, res) => {
    try {
        let queries = req.query
        let limit = queries.limit
        let offset = queries.offset
        let sort = queries.sort
        let sort_type = queries.sort_type


        console.log( " query : ", queries);
        
        let results = await menu_service.getAllMenu(limit,offset,sort,sort_type)
        return res.status(200).json({
            status: "success",
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: `Error while fetching menu ${error.message}`
        })
    }
}

const editMenu = async (req, res) => {
    try {
        if (!req || !req.body) {
            return res.status(400).json({
                status: "error",
                message: "bad request"
            })
        }
        let results = await menu_service.updateMenu(req.body)
        if (!results) {
            return res.status(404).json({
                status: "error",
                message: "menu not found"
            })
        }
        return res.status(200).json({
            status: "success",
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: `Error in Updating menu ${error.message}`
        })
    }
}

const menuById = async (req, res) => {
    try {
        if (req && req.params && req.params.id) {
            let results = await menu_service.getMenuById(req.params.id)
            if (!results) {
                return res.status(404).json({
                    status: "error",
                    message: "menu not found"
                })

            }
            return res.status(200).json({
                status: "success",
                data: results
            })
        }
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: `error in fetching menu by id : ${error.message}`
        })
    }
}


const destroyMenu = async (req, res) => {
    try {
        if (req && req.params && req.params.id) {
            let results = await menu_service.deleteMenu(req.params.id)
            if (!results) {
                return res.status(404).json({
                    status: "error",
                    message: "menu not found"
                })

            }
            return res.status(200).json({
                status: "success",
                data: results
            })
        }
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: `error in deleting menu : ${error.message}`
        })
    }
}

module.exports = { saveMenu, getMenu, editMenu, menuById, destroyMenu}
