const uploadProductController = require("../../Controllers/Products/uploadProductController")
const express = require("express")
const router = express.Router()
const sessionValidator = require("../../middleware/middlewares")

const { body, validationResult } = require("express-validator");



const validateRequestBody = [

    body('name').notEmpty().isString().withMessage("name is missing"),
    body('description').notEmpty().isString().withMessage("description is missing"),
    body('price').notEmpty().matches(/\d/).withMessage("quantity is not a digit or is missing"),
    body('category').notEmpty().isString().withMessage("category is missing"),
    body('stock').notEmpty().matches(/\d/).withMessage("stock is not a digit or is missing"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
router.post("/", [validateRequestBody,sessionValidator],uploadProductController)

module.exports = router