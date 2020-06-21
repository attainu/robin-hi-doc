const JOI = require("@hapi/joi")

const schema = JOI.object({
    status:JOI.string().min(7).max(20).required(),
    diagnosis:JOI.string(),
    prescription:JOI.string(),
    prognosis:JOI.string()
})

const validate = function(req,res,next){
    const validation = schema.validate(req.body)
    if(validation.error){
        return res.send(validation.error.details[0].message)
    }
    next()
}

module.exports = validate