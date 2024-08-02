const session = require("express-session")
const cartModel = require("../../models/cart")
const userModel  = require("../../models/users")

const clearCart = async (req, res) => {

    try {
        
        const user = req.session.user
    // if (!user) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }
        const {userid} = req.body
        if(!userid)
            return res.status(400).json({message: "Please provide user id"})
         else{
            if(userid == user._id)
            {
                const findcart = await cartModel.find({user: userid})
                if(findcart.length!=0)
                {
                    const clearcartitems = await cartModel.deleteMany({user: userid})
                    if(clearcartitems)
                    {
                        return res.status(200).json({message: "Cart is cleared"})
                    }
                    else{
                        return res.status(500).json({message: "Internal server error"})
                    }
                    
                }
                else{
                    return res.status(404).json({message: "Cart is already empty"})
                }
            }
         }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = clearCart