const { model } = require("mongoose")
const bcrypt = require("bcrypt")
const userModel = require("../../models/users")



const registerController = async (req, res) => {
    try {
        const { email, username, password } = req.body
        if (!email || !username || !password) {
            res.status(400).json({ message: "incomplete credentials" })
        }
        else {


            const finduser = await userModel.findOne({ email: email });
            if (finduser) {
                res.status(401).json({
                    message: "User already exists"
                })
            }
            else {
                const hashedpassword = await bcrypt.hash(password, 10)
                const createUser = await userModel.create({ email: email, username: username, password: hashedpassword });
                if (createUser) {
                    res.status(201).json({
                        message: "User created successfully"
                    })
                }
                else {
                    res.status(500).json({
                        message: "Failed to create user"
                    })

                }
            }
        }

    } catch (error) {
        res.status(500).send(error.message)
    }

}


module.exports = registerController