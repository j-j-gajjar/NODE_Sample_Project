const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title:String,
    subTitle:String,
    date:Date,
    imageName:String,
    userName:String,
    userImage:String,
    mail:String,
    like:Array,
    comment:[Object]
})

module.exports = mongoose.model('posts',PostSchema)