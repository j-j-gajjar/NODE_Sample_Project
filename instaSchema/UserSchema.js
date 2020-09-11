const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        'name':{
            type : String,
            require
        },
        'mail':{
            type : String,
            require
        },
        'password':{
            type : String,
            require
        },
        'image' :{
            type:String
        }        
    }
)

module.exports = mongoose.model('users',UserSchema)