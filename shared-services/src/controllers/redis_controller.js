const redisServices = require("../services/redis_service")
const postDataInRedis = async (req, res) => {
    try {
        if (req && req.params && req.params.key_name && req.body) {
            let results = await redisServices.storeDataInRedis(req.params.key_name, req.body)
            res.status(200).json(results)

        } else {
            let error = new Error("missing key name in params")
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




const fetchDataFromRedis = async (req, res) => {
    try {
        if (req.params && req.params.keyName) {
            let results = await redisServices.getDataFromRedis(req.params.keyName)
            res.status(200).json(results)

        } else {
            let error = new Error("missing key name in params")
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




const deleteDataFromRedis = async (req, res) => {
    try {
        if (req.params && req.params.keyName) {
            let results = await redisServices.deleteKey(req.params.keyName)
            res.status(200).json(results)

        } else {
            let error = new Error("missing key name in params")
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

module.exports = { postDataInRedis, fetchDataFromRedis,deleteDataFromRedis }