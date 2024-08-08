const viewProductsController = require("../../Controllers/Products/viewProductsController")
const express = require("express")
const router = express.Router()

router.get("/", viewProductsController)

module.exports = router