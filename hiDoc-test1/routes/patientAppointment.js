const express = require("express")

const patientAppValidate = require("../validation/patientAppointment")
const patientAppLogix = require("../controller/patientAppointment")

const router = express.Router()

// router.post('/',patientAppLogix.create)
router.post('/',patientAppValidate,patientAppLogix.create)
// router.get('/',)

module.exports = router