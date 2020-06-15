const mongoose = require("mongoose")

const doctorProfile = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    registrationId:{
        type:String,
        unique:true,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    region:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        minLength:10,
        maxLength:10
    },
    availability:{
       day:{
           type:String,
           required:true
       },
       timings:{
           type:[Array],
           required:true
       }
     }
})

module.exports = mongoose.model('DP',doctorProfile)
