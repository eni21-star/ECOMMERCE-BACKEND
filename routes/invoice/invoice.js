const invoiceController = require("../../Controllers/invoice/invoiceController")
const sessionValidator = require("../../middleware/middlewares");
const express = require("express")
const router = express.Router()



router.get("/", sessionValidator ,invoiceController)

module.exports = router