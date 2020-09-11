const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router()
const UserScema = require('../../instaSchema/UserSchema')

const bcrypt = require('bcrypt')

router.post('/',(req,res)=>{
    
    const {name,mail,password} = req.body;


    try {
            if(!name || !mail || !password)              
                return res.status(401).json({
                    msj : "all field required"
                })   
                console.log("01");
                

            UserScema.findOne({mail}).then((user)=>{
              
                if(user){
                    console.log("03");
                    return res.status(401).json({
                    msj : "user exist"
                })}
                
                bcrypt.genSalt(10,(err,salt)=>{
                    if(err)  {throw (err)}
                    console.log("in gen");
                    bcrypt.hash(password,salt,(err,newPassword)=>{
                        if(err) {throw (err)}
                        console.log("in hash");

                        const NewUser = UserScema({
                            name,
                            mail,
                            password : newPassword
                        })
                    
                        NewUser.save().then(()=>{
                            res.status(200).json({sucess:"ok"})
                        })                           
                    })
                })
            })
        
    } catch (err) {
      return res.status(401).json({
           "msj" : err
       })
    }

})

module.exports = router