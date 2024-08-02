const express = require('express')
const router = express.Router()
const removeitem = require("../../Controllers/cart/removeitem")
const sessionValidator = require("../../middleware/middlewares")
const { ExpressValidator } = require("express-validator");
const { body, validationResult } = require("express-validator");


const validateRequestBody = [

    body('userid').notEmpty().isString().withMessage(" user id is not valid or missing"),
    body('itemid').notEmpty().isString().withMessage("itemid is not valid or missing"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

router.delete("/", [validateRequestBody, sessionValidator], removeitem)
module.exports = router