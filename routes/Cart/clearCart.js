const clearCartController = require("../../Controllers/cart/clearCart")
const sessionValidator = require("../../middleware/middlewares")
const express = require('express')
const router = express.Router()
const { ExpressValidator } = require("express-validator");
const { body, validationResult } = require("express-validator");



router.delete("/", sessionValidator, clearCartController)

module.exports = router