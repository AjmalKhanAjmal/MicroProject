const menu_organizer_service = require("../services/offline_menu_organizer_services")

const saveMenuOrganizer = async (req, res) => {
    try {
        if (req && req.body && req.body.name) {
            let results = await menu_organizer_service.create_menu_organizer(req.body.name, req.body.description, req.body.category_ids, req.body.store_id, req.user.application_id)
            res.status(200).json({
                results
            })
        }
        else {
            let error = new Error("Missing body or name")
            error.status = 400
            throw error
        }
    } catch (error) {
        res.status(error.status || 500).json({
            status: "error",
            message: error.message
        })
    }
}


const edit_menu_organizer = async (req, res) => {
    try {
        if (req && req.body && req.body.id) {
            let results = await menu_organizer_service.update_menu_organizer(req.body.id, req.body.name, req.body.description, req.body.category_ids, req.body.store_id)
            res.status(200).json({
                status: "success",
                data: results
            })
        }
        else {

            let error = new Error("missing id")
            error.status = 400
            throw error

        }
    } catch (error) {
        res.status(error.status || 500).json({
            status: "success",
            message: error.message
        })
    }
}


const fetchMenuOrganizer = async (req, res) => {
    console.log("executed controller-- 1 ");
    try {

        if (req && req.query && req.query.store_id) {
            let store_id = req.query.store_id
            let offset = req.query.offset
            let limit = req.query.limit
            let sort = req.query.sort
            let sort_type = req.query.sort_type
            let application_id = req.user.application_id
            let results = await menu_organizer_service.getMenuCategory(store_id, offset, limit, sort, sort_type, application_id)

            if (results == null) {
                let error = new Error("data not found ")
                error.status = 404
                throw error
            }
            res.status(200).json({
                results
            })
        }
        else {
            let error = new Error(" store id required")
            error.status = 500
            throw error
        }
    } catch (error) {
        console.log("executed controller-- 1 ");
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

const removeMenuOrganizer = async (req, res) => {
    try {
        if (req && req.params && req.params.id) {
            const results = await menu_organizer_service.deleteMenu(req.params.id)
            res.status(200).json(results)

        } else {
            let error = new Error("missing id in params")
            error.status = 401
            throw error
        }
    } catch (error) {
        return res.status(error.status || 500).json({
            status: "error",
            message: error.message,
        })
    }
}

// const getMenuById = async (req, res) => {
//     let results = menu_organizer_service.
// }
module.exports = { saveMenuOrganizer, edit_menu_organizer, fetchMenuOrganizer, removeMenuOrganizer }