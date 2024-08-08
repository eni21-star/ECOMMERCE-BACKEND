const { deleteUser, updateUser, getSingleUser, getAllUsers } = require("../../Controllers/userManagement/userControlsController")
const express = require("express")
const router = express.Router()
const sessionValidator = require("../../middleware/middlewares")



router.get("/", sessionValidator, getAllUsers)
router.get("/:id", sessionValidator ,getSingleUser)
router.put("/:id", sessionValidator ,updateUser)
router.delete("/:id", sessionValidator ,deleteUser)


module.exports = router