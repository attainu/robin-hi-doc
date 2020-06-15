const mongoose = require("mongoose")
const moment = require("moment")

const {mongoModel} = require("../model/doctorAppointment")

class Schedule{
    constructor([date,month,year,hours,minutes]){
        this.schedule = moment().set({'date':date,'month':month-1,'year':year,'hour':hours,'minute':minutes}).format('llll')
    }
}

const patientAppointmentSchema = mongoose.Schema({
    doctor:{
        type:String,
        required:true
    },
    region:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    registrationId:{
        type:String,
        required:true
    },
    schedule:{
        start:{
            type:String,
            required:true,
        },
        end:{
            type:String,
            required:true,
        }
    },
    doctorResponse:{
        type:mongoose.Schema.Types.ObjectId,
        ref:mongoModel.modelName,
    }

})

module.exports = {
    model: mongoose.model('PA',patientAppointmentSchema),
    appointment:Schedule
}

