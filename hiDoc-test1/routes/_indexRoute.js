const express = require("express")

const router = express.Router()
const patientAppointment = require("../routes/patientAppointment")
//const patientAppointment = require("./patientAppointment")
const doctorAppointment = require('./doctorAppointment')
const patientProfile = require('./patientProfile')
const doctorProfile = require("./doctorProfile")


router.use('/patient/appointment',patientAppointment)
// router.use('/doctor/appointment',doctorAppointment)
// router.use('/patient/profile',patientProfile)
// router.use('/doctor/profile',doctorProfile)


module.exports = router