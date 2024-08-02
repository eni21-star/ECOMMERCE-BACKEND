const bcrypt = require("bcrypt")
const userModel = require("../../models/users")
const jwt = require('jsonwebtoken')
const env = require("dotenv").config()
const session = require("express-session")

const loginController = async (req, res) => {

    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json({ message: "email or password not provided" })
        }
        else {

            const user = await userModel.findOne({ email })
            if (!user) { return res.status(404).json({ message: "User not found" }) }
            else {
                const comparepass = await bcrypt.compare(password, user.password)
                if (!comparepass) {
                    res.status(401).json({ "message": "password is incorrect" })
                }
                else {

                    const userObject = user.toObject();
                    delete userObject.password
                    delete userObject.createdAt
                    delete userObject.updatedAt
                    delete userObject.__v
                    delete userObject.email
                   
                   
                    if (req.session) {
                        req.session.user = userObject
                        
                        res.status(200).json({message : "user logged in"})
                    } else {
                        // Handle the case where req.session is undefined (should not happen if session is set up correctly)
                        return res.status(500).json({ message: "Session middleware not initialized" });
                    }
                    // const token =  jwt.sign(userObject, process.env.SECRETKEY, { expiresIn: "15m"})
                    // const refreshtoken = jwt.sign(userObject, process.env.REFRESHSECRETKEY, { expiresIn: "7d"})
                    // res.status(201).json({
                    //      token, 
                    //      refreshtoken
                    // })

                }
            }

        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = loginController