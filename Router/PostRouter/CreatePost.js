var expess = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
const router = expess.Router()
const auth = require('./../userRouter/Auth');
const PostSchema = require('../../instaSchema/PostSchema')
const UserScema = require('../../instaSchema/UserSchema')


router.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

router.post("/", auth,function(req, res){
    console.log("api call");
    
  const {title,subTitle,image,imageName,userName,userImage,mail} = req.body;
  //console.log(req.body);  
  
  UserScema.find({mail})
  .then((user)=>{
    if(user[0].mail){
      var realFile = Buffer.from(image,"base64");  
      let nameWithDir = "./uploads/pots/" + imageName;
      fs.writeFile(nameWithDir, realFile, (err) =>{
          if(err)
              return res.status(400).json({msj:"not upload"})     
          const NewPost = new  PostSchema({
            title,
            subTitle,
            imageName,
            userName,
            userImage,
            mail,
            date:Date()
          });
          NewPost.save().then(()=>{
              console.log("success");              
            return res.status(200).json({sucess:"ok"})
        }).catch((err)=>{console.log(err)
        ,res.status(400).json({msj:"Not upload"})}) 
      });
    }
   
           
  })
  .catch((err)=>{res.status(400).json({msj:"Not upload"})})
  
    
    
 });

module.exports = router