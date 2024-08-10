const express = require('express')
const router = express.Router()
const viewcart = require("../../Controllers/cart/viewcart")
const  sessionValidator = require("../../middleware/middlewares")

router.get('/', sessionValidator, viewcart)


module.exports = router