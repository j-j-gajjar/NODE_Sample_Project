const mongoose = require('mongoose');
const express = require('express');
const auth = require('./Auth');
const app = express();
const router = express.Router()
const UserScema = require('../../instaSchema/UserSchema')

router.patch('/:mail',auth,(req,res)=>{
    var updateObject = req.body;
    var mail = req.params.mail;

    UserScema.findOne({mail}).then((resp)=>{
        console.log(resp);
        
        
        if(resp){
            UserScema.update({mail},{$set:updateObject}).then((resp)=>{
                console.log(resp);
                if(resp.n)
                 res.status(200).json({msj:"updated"})
                else
                res.status(401).json({msj:"Not updated"})
                }
            )
            .catch(()=>{
                res.status(401).json({msj:"Not updated"})
                }
            )
        }else res.status(401).json({msj:"User not found"})

    }).catch(()=>{
        res.status(200).json({msj:"User Not Found"})
        }
    )
    
})

module.exports = router