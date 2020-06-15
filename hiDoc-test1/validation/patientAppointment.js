const JOI = require("@hapi/joi")

const schema = JOI.object({
    doctor:JOI.string().min(3).required(),
    region:JOI.string().min(3).required(),
    speciality:JOI.string().min(3).required(),
    registrationId:JOI.string().min(4).required(),
    schedule:{
        start:JOI.array().min(5).max(5).required(),//last two elements i.e hours and 
        //minutes should be in the form of string and the first three elements 
        //i.e date,month,year should be in the form of numbers
        end:JOI.array().min(5).max(5).required()//last two elements i.e hours and 
        //minutes should be in the form of string and the first three elements 
        //i.e date,month,year should be in the form of numbers
    }
}) 

const validate = function(req,res,next){
    const validation = schema.validate(req.body)
    if(validation.error){
        return res.send(validation.error.details[0].message)
    }
    next()
}

module.exports = validate