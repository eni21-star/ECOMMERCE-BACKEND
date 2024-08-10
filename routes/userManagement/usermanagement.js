const { deleteUser, updateUser, getSingleUser, getAllUsers } = require("../../Controllers/userManagement/userControlsController")
const express = require("express")
const router = express.Router()
const sessionValidator = require("../../middleware/middlewares")
const { check, body, validationResult } = require("express-validator");

const validateRequestParams = [


    check('id').isMongoId().withMessage('Invalid ID in Params'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


const validateRequestBody = [

    body('email').notEmpty().isString().withMessage("email is missing"),
    body('username').notEmpty().isString().withMessage("username is missing"),
    body('admin').notEmpty().isBoolean().withMessage("admin tag is missing"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

router.get("/", sessionValidator, getAllUsers)
router.get("/:id", [validateRequestParams,sessionValidator] ,getSingleUser)
router.put("/:id", [validateRequestParams,validateRequestBody,sessionValidator] ,updateUser)
router.delete("/:id", [validateRequestParams,sessionValidator] ,deleteUser)


module.exports = router