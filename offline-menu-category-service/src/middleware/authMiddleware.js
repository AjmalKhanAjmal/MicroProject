const authenticateRequest = (req, res, next) => {
    try {
        let user_id = req.headers["x-user-id"]
        let application_id = req.headers["subscribed_application_id"]
        if (!user_id) {
            let error = new Error("Authencation required! Please login to continue")
            error.status = 401
            throw error
        }
        if (!application_id) {
            let error = new Error("missing application_id")
            error.status = 401
            throw error
        }
        req.user = { user_id,application_id }
        console.log("req.user", req.user);
        
        next();

    } catch (error) {
        res.status(error.status || 500).json({
            status: "error",
            message: error.message
        })
    }
}


module.exports = { authenticateRequest }