const express = require('express')
const router = express.Router()
const UserSchema = require('../../instaSchema/UserSchema')
const auth = require('./Auth')


router.get('/:mail',auth,(req,res)=>{
    const mail = req.params.mail
    
    UserSchema.find({mail}).then((user)=>{
        if(user[0].mail)
            return res.status(200).json({name:user[0].name,mail:user[0].mail,image:user[0].image}) 
        res.status(400).json({msj:"User Not Found"})
    }).catch((err)=>{
        res.status(400).json({msj:"User Not Found"})      
    })
    
})

module.exports = router