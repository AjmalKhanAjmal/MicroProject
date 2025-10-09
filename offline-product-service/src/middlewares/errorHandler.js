const errorHandler = (err,req,res,next)=>{
    let status = err.status || 500
    let message = err.message || "Internal Server Error"
    res.status(status).json({
        status : "error",
        message : message
    })
}

module.exports = {errorHandler}