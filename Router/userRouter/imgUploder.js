var expess = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
const router = expess.Router()
const auth = require('./Auth');
const UserScema = require('../../instaSchema/UserSchema')

var app = expess();



router.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

router.patch("/", auth,function(req, res){
    
    
  var name = req.body.name;
  var img = req.body.image;
  var mail = req.body.mail;
  
  UserScema.find({mail})
  .then((user)=>{
    if(user[0].mail){
      var realFile = Buffer.from(img,"base64");  
      let nameWithDir = "./uploads/" + name;
      fs.writeFile(nameWithDir, realFile, (err) =>{
          if(err)
              return res.status(400).json({msj:"not upload"})
              console.log(mail);
              
          UserScema.updateOne({mail},{$set:{image:name}}).then((resp)=>{
              console.log(resp);
              if(resp.n)
               return res.status(200).json({msj:"Uploded"})
              else
                res.status(401).json({msj:"Not upload"})
            })
          
         
      });
    }
   
           
  })
  .catch((err)=>{res.status(400).json({msj:"Not upload"})})
  
    
    
 });

module.exports = router