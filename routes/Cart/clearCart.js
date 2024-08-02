const clearCartController = require("../../Controllers/cart/clearCart")
const sessionValidator = require("../../middleware/middlewares")
const express = require('express')
const router = express.Router()
const { ExpressValidator } = require("express-validator");
const { body, validationResult } = require("express-validator");


const validateRequestBody = [

    body('userid').notEmpty().isString().withMessage(" user id is not valid or missing"),
   
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

router.delete("/", [validateRequestBody, sessionValidator], clearCartController)

module.exports = router