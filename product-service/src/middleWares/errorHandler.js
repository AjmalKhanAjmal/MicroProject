const errorHandler = (err,req,res,next  )=>{
    let status = err.status || 500
    let message = err.message || "Internal server error"
    
    console.log("errror hadler ");
    
    res.status(status).json({
        status : "error",
        message : message
    })  
}


module.exports = errorHandler