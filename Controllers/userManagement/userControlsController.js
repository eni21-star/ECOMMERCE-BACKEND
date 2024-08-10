const session = require("express-session")
const userModel = require("../../models/users")

// admin only

//get all users 
const getAllUsers = async (req,res)=>{

    const user = req.session.user
    try {
        if(user.admin)
        {
         const getusers = await userModel.find()
         if(!getusers)
                {return res.status(404).json({message: "no users found"})}
         return res.status(200).json(getusers)
        }
        else
        {
            return res.status(401).json("you are not authorized")
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


// get one user
const getSingleUser = async (req,res)=>{
    const user = req.session.user
    try {
        const {id} = req.params
        if(user.admin)
        {
         const getuser = await userModel.findById(id)
         if(!getuser)
                {return res.status(404).json({message: "no users found"})}
         return res.status(200).json(getuser)
        }
        else
        {
            return res.status(401).json("you are not authorized")
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

// update user information
const updateUser = async (req, res)=>{
    const user = req.session.user
    try {
        const {id} = req.params
        const { email ,username, admin} = req.body
        if(user.admin)
        {
         const getuser = await userModel.findByIdAndUpdate(id, { email:email, username:username, admin: admin }, {new: true} )
         if(!getuser)
                {return res.status(404).json({message: "no users found"})}
         return res.status(200).json({message: "user updated"})
        }
        else
        {
            return res.status(401).json("you are not authorized")
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


//delete a user
const deleteUser = async (req, res)=>{
    const user = req.session.user
    try {
        const {id} = req.params
        const { email ,username, password, admin} = req.body
        if(user.admin)
        {
      const deleteuser = await userModel.findByIdAndDelete(id)
       
         if(!deleteuser)
                {return res.status(404).json({message: "no users found"})}
         return res.status(200).json({message: "user deleted"})
        }
        else
        {
            return res.status(401).json("you are not authorized")
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { deleteUser, updateUser, getSingleUser, getAllUsers}