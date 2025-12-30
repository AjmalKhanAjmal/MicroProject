const {orderService} = require("../services/order_service")

// orderService()

const orderController = async (req,res)=>{
    try{
        let results =await orderService()
        res.status(200).json(results)
    }catch(error){
        res.json({
            "status":"error",
            "message":error.message
        })
    }
}

orderController()