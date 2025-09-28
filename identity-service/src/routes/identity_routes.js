const express = require("express")
const routes = express.Router()
const {resgiterUser} =  require("../services/identity_service")
routes.post("/api/auth/register",resgiterUser)



module.exports = routes