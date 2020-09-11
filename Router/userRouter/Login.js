const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router()
const UserScema = require('../../instaSchema/UserSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.post('/',(req,res)=>{

    const {mail,password} = req.body;




    try {
            if( !mail || !password)              
                return res.status(401).json({
                    "msj" : "all field required"
                })   

            UserScema.findOne({mail}).then((user)=>{
                if(!user){
                    return res.status(401).json({
                    "msj" : "user does not exist"
                })}
                bcrypt.compare(password,user.password)
                .then(  (isTrue)=>{
                    if(!isTrue){
                        return res.status(401).json({
                        "msj" : "Password Not Mathch"
                        })
                    }
                jwt.sign(
                    {
                        _id:user.id,
                        mail
                    },
                    "insta",
                    {expiresIn:3600},
                    (err,token)=>{
                        if(err){return res.status(401).json({
                        "msj" : "Try Again"
                        })}
                    res.status(200).json({token,user:{mail,name:user.name}})
                    }
                )
                })
            })
        
    } catch (err) {
      return res.status(401).json({
           "msj" : err
       })
    }

})

module.exports = router