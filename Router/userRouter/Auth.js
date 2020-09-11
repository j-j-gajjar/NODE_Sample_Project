const jwt = require('jsonwebtoken')
const UserSchema = require('../../instaSchema/UserSchema')


function  auth(req,res,next){
    const token = req.header('x-auth-token')
try {
    if(!token)  res.status(401).json({msj:"token not valid"})
    
    const decode = jwt.verify(token,'insta')
    UserSchema.find({mail:decode.mail}).then((user)=>{
        if(user[0]._id){
          
            req.user = decode;
                     
            next();
        }
    }).catch((error)=>{
        res.status(401).json({msj:"token not valid"})
    })
    
} catch (error) {
    res.status(401).json({msj:"token not valid"})
}
   
}

module.exports = auth;