const session = require("express-session")
const jwt = require("jsonwebtoken")
const env = require("dotenv").config()

const sessionValidator = (req, res, next)=>{
  if(req.session.user)
  {
    return next()
  }
  else{
    return res.status(401).json({message:"you are not authenticated"})
  }
}


// const jwtverify = ( req, res, next)=>{

// try {
//     const token = req.headers.token.split(" ")[1];
//     if(!token)
//     {
//         res.status(401).json({message : "you are not authorized"})
//     }
//     else
//     {
//         jwt.verify(token, process.env.SECRETKEY, ( err, user)=>{
//             if(err)
//             {
//                 res.status(401).json({message : "unauthorized"})
//             }
//             else
//             {
//                 req.user = user
//                 next()

//             }
//         })
//     }
// } catch (error) {
//     res.status(500).json(error.message)
// }
// }


module.exports =  sessionValidator