const session = require("express-session")
const logoutController = ( req, res )=>{

    req.session.destroy( err=>{
        if(err)
        {
            return res.status(500).json("failed to logout")
        }
        else{
            res.status(200).json({message: "logged out"})
        }
    })
}

module.exports = logoutController