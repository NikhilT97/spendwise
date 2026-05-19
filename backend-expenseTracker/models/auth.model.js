const mongoose = require('mongoose')


const authSchema = mongoose.Schema({
            name:{type:String, require:true, trim:true},
            email:{type:String, require:true, lowercase: true},
            password:{type:String, require:true},

}, {timestamp:true})



const authModel = mongoose.model('usersAuth',authSchema)

module.exports = authModel;