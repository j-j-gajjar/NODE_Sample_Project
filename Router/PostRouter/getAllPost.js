var expess = require("express");
const router = expess.Router()
const auth = require('./../userRouter/Auth');
const PostSchema = require('../../instaSchema/PostSchema')

router.get("/",auth,(req,res)=>{
    PostSchema.find({}).sort('-date').then((data)=>{
        if(data[0]){
            console.log("data send");
            
            res.status(200).send(data)
        }else{
            console.log("data not send");
            res.status(400).json({msj:"Not Post Found"})
        }
    }
    ).catch((err)=>{
        res.status(400).json({msj:"Not Post Found"})
    }
    )}

    )

module.exports= router;