const express = require("express")
const router = express.Router();
const signupavalidator = require('../validation/registervalidation')
const loginvalidator = require('../validation/loginvalidation')
const verify = require("../middlewares/verification.js");

const { PatientRegister, PatientLogin,  Patientinfo, UpdatePatient, DeletePatient } = require('../controller/patient');

//ALL CRUD ROUTES RELATED TO PATIENT ACCOUNT
router.post('/register', signupavalidator, PatientRegister);
router.post('/login', loginvalidator, PatientLogin);
router.get('/private', verify, Patientinfo);
router.patch('/update/:id', verify, UpdatePatient);
router.delete('/delete/:id', verify, DeletePatient)



module.exports = router;