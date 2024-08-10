const session = require("express-session")
const cartModel = require("../../models/cart")
const userModel = require("../../models/users")

const clearCart = async (req, res) => {

    try {

        const user = req.session.user
        if(!user)
            {
                return res.status(401).json({message: "unauthorized"})
            }
            
        const findcart = await cartModel.find({ user: user._id })
        if (findcart.length != 0) {
            const clearcartitems = await cartModel.deleteMany({ user: user._id })
            if (clearcartitems) {
                return res.status(200).json({ message: "Cart is cleared" })
            }
            else {
                return res.status(500).json({ message: "Internal server error" })
            }

        }
        else {
            return res.status(404).json({ message: "Cart is already empty" })
        }


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = clearCart