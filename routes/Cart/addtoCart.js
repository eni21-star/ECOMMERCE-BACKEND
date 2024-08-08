const express = require('express')
const router = express.Router()
const addtocart = require("../../Controllers/cart/addtocart")
const sessionValidator = require("../../middleware/middlewares")
const { ExpressValidator } = require("express-validator");
const { body, validationResult } = require("express-validator");



const validateRequestBody = [

    body('userid').notEmpty().isString().withMessage(" user id is missing"),
    body('itemID').notEmpty().isString().withMessage("Please enter your username"),
    body('quantity').notEmpty().matches(/\d/).withMessage("quantity is not a digit"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


router.post('/', [validateRequestBody,sessionValidator], addtocart);


module.exports = router