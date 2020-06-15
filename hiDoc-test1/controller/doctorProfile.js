const moment = require("moment")

const doctorProfile = require("../model/doctorProfile")

class Day{
    constructor([date,month,year]){
        this.day = moment().set({'date':date,'month':month-1,'year':year}).format('ll')
    }
}

function convert(arr){
    var newDay = new Day(arr)
    modNewDay = newDay.day
    return modNewDay
}

const doctorProfileLogix = {
    create:async function(req,res){
        try{
            
            const newDoctorProfile = new doctorProfile({
                name:req.body.name,
                age:req.body.age,
                qualification:req.body.qualification,
                registrationId:req.body.registrationId,
                region:req.body.region,
                phone:req.body.phone,
                availability:{
                    day:convert(req.body.availability.day),
                    timings:req.body.availability.timings
                }
            })
            const savedDoctorProfile = await newDoctorProfile.save()
            res.json(savedDoctorProfile)
        }catch(e){
            res.json({message:e.message})
        }
    },
    view:async function(req,res){
        try{
            const specificDoctorProfile = await doctorProfile.findOne({registrationId:req.params.registrationId})
            res.json(specificDoctorProfile)
        }catch(e){
            res.json({message:e.message})
        }
    },
    update:async function(req,res){
        try{
            let date = parseInt(req.params.dd)
            let month = parseInt(req.params.mm)
            let year = parseInt(req.params.yyyy)
            let Day = convert([date,month,year])
            const updatedDoctorProfile = await doctorProfile.updateOne({registrationId:req.params.registrationId,
            availability:{day:Day}},
                {$set:{
                    name:req.body.name,
                    age:req.body.age,
                    qualification:req.body.qualification,
                    registrationId:req.body.registrationId,
                    region:req.body.region,
                    phone:req.body.phone,
                    availability:{
                        day:convert(req.body.availability.day),
                        timings:req.body.availability.timings
                }}})
            res.json(updatedDoctorProfile)
        }catch(e){
            res.json({message:e.message})
        }
    },
    remove:async function(req,res){
        try{
            const removedDoctorProfile = await doctorProfile.deleteOne({registrationId:req.params.registrationId})
            res.json(removedDoctorProfile)
        }catch(e){
            res.json({message:e.message})
        }
    }
}

module.exports = doctorProfileLogix