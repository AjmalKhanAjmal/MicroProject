const express = require("express")
const routes = express.Router()
const resgiterUser =  require("../services/identity_service")
routes.post("/api/auth/user/register",resgiterUser.resgiterUser)
routes.get("/api/auth/users",resgiterUser.fetchUser)
routes.post("/api/auth/user/login",resgiterUser.loginUser)
routes.post("/api/auth/user/refreshtoken",resgiterUser.refreshToken)
routes.post("/api/auth/user/logout",resgiterUser.loginUser)
module.exports = routes 