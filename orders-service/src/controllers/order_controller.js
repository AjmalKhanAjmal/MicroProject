const { or } = require("sequelize")
const { orderService } = require("../services/order_service")
const { getIO } = require('../socket/index')

// orderService()

const orderController = async (req, res) => {
    try {
        let results = await orderService(req.body)
        setTimeout(() => {
            getIO().emit("orderCreated", results);
        }, 10000)
        res.status(200).json(results)
    } catch (error) {
        res.json({
            "status": "error",
            "message": error.message
        })
    }
}


module.exports = { orderController }
// orderController()