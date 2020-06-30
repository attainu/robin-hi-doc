const express = require("express");

const router = express.Router();

const docSignup = require("../routes/doctorSignup");
const docLogin = require("../routes/doctorLogin");
const patientSignup = require("../routes/patientSignup");
const patientLogin = require("../routes/patientLogin");
const patientAppointment = require("../routes/patientAppointment");
const doctorAppointment = require("./doctorAppointment");
const patientProfile = require("./patientProfile");
const doctorProfile = require("./doctorProfile");
const viewDoctor = require("../routes/viewDoc");

router.use("/doctor/signup", docSignup);
router.use("/doctor/login", docLogin);
router.use("/patient/signup", patientSignup);
router.use("/patient/login", patientLogin);
router.use("/patient/appointment", patientAppointment);
router.use("/doctor/appointment", doctorAppointment);
router.use("/patient/profile", patientProfile);
router.use("/doctor/profile", doctorProfile);
router.use("/view/doctor", viewDoctor);

module.exports = router;
