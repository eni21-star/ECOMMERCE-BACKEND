const express = require('express')
const router = express.Router()
const userModel = require("../../models/users")
const registerController = require("../../Controllers/Authentication/registerController")
const { ExpressValidator } = require("express-validator");
const { body, validationResult } = require("express-validator");
const validateRequestBody = [

    body('email').notEmpty().isEmail().withMessage("Please enter a valid email address"),
    body('username').notEmpty().isString().withMessage("Please enter your username"),
    body('password').notEmpty().isLength({ min: 6 }).withMessage("Password must be at least 6 characters").matches(/\d/).withMessage("password must conttain a digit"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


router.post('/', validateRequestBody ,registerController);


module.exports = router