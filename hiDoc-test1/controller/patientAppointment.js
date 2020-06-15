const {model,appointment} = require("../model/patientAppointment")

const doctorProfile = require("../model/doctorProfile")

function matching(){

}

const patientAppLogix = {
    create:async function(req,res){
        try{
            let start = req.body.schedule.start.slice(3)
            let Start = String(start[0])+':'+String(start[1])
            // req.body.schedule.start.splice(3,2,parseInt(start[0]),parseInt(start[1]))
            let end = req.body.schedule.end.slice(3)
            let End = String(end[0])+':'+String(end[1])
            console.log([Start,End])
            // req.body.schedule.end.splice(3,2,parseInt(end[0]),parseInt(end[1]))
            const scheduleStart = new appointment(req.body.schedule.start)
            const scheduleEnd = new appointment(req.body.schedule.end)
            console.log(scheduleStart)
            console.log(scheduleEnd)
            const newPatientAppointment = new model({
                doctor:req.body.doctor,
                region:req.body.region,
                speciality:req.body.speciality,
                registrationId:req.body.registrationId,
                schedule:{
                    start:scheduleStart.schedule,
                    end:scheduleEnd.schedule
                }
            })
            const savedPatientAppointment = await newPatientAppointment.save()
            res.json(savedPatientAppointment)
            // res.send('i am working')
        }catch(err){
            res.json({message:err.message})
        }

        // get all appointments

        // get all appointments -pending
        //                      -approved
        //                      -rejected
        //                      -session-completed

        // update any specific appointment

        // delete any specific appointment
    }
}
module.exports = patientAppLogix