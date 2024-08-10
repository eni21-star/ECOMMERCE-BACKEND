const { getReview, postReview, updateReview, deleteReview } = require("../../Controllers/Productreviews/productReviewController");
const express = require("express");
const router = express.Router();

const sessionValidator = require("../../middleware/middlewares");

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

    body('review').notEmpty().isString().withMessage("review is missing"),
    body('rating').notEmpty().isNumeric().withMessage("rating is missing"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

router.get("/:id",[validateRequestParams], getReview)
router.post("/:id", [validateRequestBody,validateRequestParams,sessionValidator], postReview)
router.put("/:id",  [validateRequestBody,validateRequestParams,sessionValidator], updateReview)
router.delete("/:id", [validateRequestParams,sessionValidator], deleteReview)

module.exports = router