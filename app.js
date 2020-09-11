const mongoose = require('mongoose');
const express = require('express');
const  register  = require('./Router/userRouter/Register');
const login = require('./Router/userRouter/Login')
const update = require('./Router/userRouter/Update')
const imgUpload = require('./Router/userRouter/imgUploder')
const getuser  =require('./Router/userRouter/GetUser')
const createPost  =require('./Router/PostRouter/CreatePost')
const getAllPost  =require('./Router/PostRouter/getAllPost')
const cors = require('cors')
app = express();

app.use(express.json());
app.use('/images',express.static('uploads'))



app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/insta",
{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>console.log("Connected"))
.catch((err)=>console.log(err));

app.use('/api/register',register)

app.use('/api/login',login)

app.use("/api/update",update)

app.use("/api/getuser",getuser)

app.use("/api/imgUpload",imgUpload)

app.use("/api/createPost",createPost)

app.use("/api/getAllPost",getAllPost)

//app.use('/',(req,res)=>{res.send("hello dev")})

app.listen(3001)