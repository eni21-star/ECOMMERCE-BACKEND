const checkOutController = require("../../Controllers/Checkout/checkoutcontroller")
const sessionValidator = require("../../middleware/middlewares")
const { body,validationResult } = require("express-validator");
const express = require("express")
const router = express.Router()

const validateRequestBody = [

    body('houseAdrress').notEmpty().isString().withMessage("adrress is missing"),
    body('shipping').notEmpty().isString().withMessage("shipping method is missing"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
router.post('/',[validateRequestBody, sessionValidator], checkOutController)

module.exports = router