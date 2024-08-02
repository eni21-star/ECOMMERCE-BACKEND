const cart = require("../../models/cart")

const removeItem = async (req,res)=>{



    const user = req.session.user
    const {userid, itemid} = req.body

    try{
        if(userid === user._id)
            {
                const removeitem = await cart.deleteOne({ user: userid, product:itemid})
                if(removeitem){
                    return res.status(200).json("item removed from cart")
                }
                else{
                    return res.status(404).json("item not found in cart")
                }
            }
            else{
              return res.status(401).json("you are not authorized to remove this cart item")
            }
    }
    catch(err){
        return res.status(500).json(err.message)
    }
    
}

module.exports = removeItem