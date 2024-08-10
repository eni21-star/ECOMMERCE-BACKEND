const cart = require("../../models/cart")

const removeItem = async (req, res) => {



    const user = req.session.user
    if(!user)
    {
        return res.status(401).json({message: "unauthorized"})
    }
    
    const { itemid } = req.body

    try {

        const removeitem = await cart.deleteOne({ user: user._id, product: itemid })
        if (removeitem) {
            return res.status(200).json("item removed from cart")
        }
        else {
            return res.status(404).json("item not found in cart")
        }
    }
    catch (err) {
        return res.status(500).json(err.message)
    }

}

module.exports = removeItem