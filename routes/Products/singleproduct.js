const singleProductController = require("../../Controllers/Products/ViewsingleProductController")
const express = require("express")
const router = express.Router()
const { ExpressValidator } = require("express-validator");
const { check, validationResult } = require("express-validator");

const validateRequestParams = [


    check('id').isMongoId().withMessage('Invalid product ID'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

router.get("/:id", validateRequestParams ,singleProductController)

module.exports = router