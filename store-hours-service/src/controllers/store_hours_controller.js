const { stack } = require("sequelize/lib/utils")
const store_hours_service = require("../services/store_hours_services")
const insertStoreHours = async (req, res) => {
    try {
        if (req && req.body && req.body.name && req.body.time_zone && req.body.store_hours_options) {

            let name = req.body.name
            let time_zone = req.body.time_zone
            let store_hours_options = req.body.store_hours_options
            let is_special_hour_enabled = req.body.is_special_hour_enabled
            let special_hour_data = req.body.special_hour_data
            const results = await store_hours_service.createStoreHours(name, time_zone, is_special_hour_enabled, special_hour_data, store_hours_options)
            return res.status(200).json(results)

        }
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}


const fetchStoreHours = async (req, res) => {
    try {
        if (req) {
            const results = await store_hours_service.getStoreHours()
            return res.status(200).json(results)
        }
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}


const editStoreHours = async (req, res, next) => {
    try {
        let name = req.body.name
        // console.log(name);
        let id = req.body.id
        let time_zone = req.body.time_zone
        let store_hours_options = req.body.store_hours_options
        let is_special_hour_enabled = req.body.is_special_hour_enabled
        let special_hour_data = req.body.special_hour_data
        let results = await store_hours_service.updateStoreHours(id, name, time_zone, is_special_hour_enabled, special_hour_data, store_hours_options)
        if (results == null) {
            let error = new Error("data not found")
            error.status = 404
            throw error
        }
        return res.status(200).json(results)
    } catch (error) {
        // return res.status(500).json({
        //     status: "error",
        //     message: error.message
        // })
        next(error)
    }
}


const fetchStoreHoursById = async (req, res) => {
    try {
        if (req && req.params.id) {
            let results = await store_hours_service.getStoreHoursById(req.params.id)
            if (results == null) {
                let error = new Error("data not found ")
                error.statusCode = 404
                throw error
            }
            res.status(200).json(results)
        } else {
            let error = new Error("Store ID must be included")
            error.statusCode = 400
            throw error
        }
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "error",
            message: error.message
        })
    }
}

const destroyStoreHours = async (req, res, next) => {
    try {
        if (req && req.params && req.params.id) {
            let results = await store_hours_service.deleteStoreHours(req.params.id)
            if(results == null){
                let error = new Error("data not found")
                error.status = 404
                throw error
            }
            return res.status(200).json(results)
        }
    } catch (error) {
        next(error)

    }
}

module.exports = { insertStoreHours, fetchStoreHours, editStoreHours, fetchStoreHoursById, destroyStoreHours }
