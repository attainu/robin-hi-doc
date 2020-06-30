const mongoose = require("mongoose")

const patientProfileSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    },
    medicalConditions:{
        type:Object,
        required:true
    },
    medicineUsage:{
        type:Object,
        required:true
    },
    medicalHistory:{
        type:Object,
        required:true
    },
    phone:{
        type:String,
        unique: true,
        required:true,
    }
})

module.exports = mongoose.model('PP',patientProfileSchema)
