const patientProfile = require("../model/patientProfile")

const patientProfileLogix = {
    create:async function(req,res){
        try{
            const newPatientProfile = new patientProfile({...req.body})
            const savedPatientProfile = await newPatientProfile.save()
            res.status(201).json({status_code:201,savedPatientProfile})
        }catch(e){
            res.json({message:e.message})
        }
    },
    view:async function(req,res){
        try{
            const specificPatientProfile = await patientProfile.findOne({name:req.body.name})
            res.json(specificPatientProfile)
        }catch(e){
            res.json({message:e.message})
        }
    },
    update:async function(req,res){
        try{
            const updatedPatientProfile = await patientProfile.updateOne({name:req.body.name},
                {$set:{...req.body}})
            res.json(updatedPatientProfile)
        }catch(e){
            res.json({message:e.message})
        }
    },
    remove:async function(req,res){
        try{
            const removedPatientProfile = await patientProfile.deleteOne({name:req.body.name})
            res.json(removedPatientProfile)
        }catch(e){
            res.json({message:e.message})
        }
    }
}

module.exports = patientProfileLogix