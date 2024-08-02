const express = require("express")
const router = express.Router()
const logoutController = require("../../Controllers/Authentication/logoutController")

router.post('/',  logoutController )


module.exports = router