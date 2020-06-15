const JOI = require("@hapi/joi")

const schema = JOI.object({
    name:JOI.string().min(6).required(),
    age:JOI.number().required(),
    medicalConditions:JOI.object().required(),
    medicineUsage:JOI.object().required(),
    medicalHistory:JOI.object().required(),
    phone:JOI.string().min(10).max(10).required()
})

const validate = function(req,res,next){
    const validation = schema.validate(req.body)
    if(validation.error){
        return res.send(validation.error.details[0].message)
    }
    next()
}

module.exports = validate