const express = require("express")
const router = express.Router();
const signupavalidator = require('../validation/registervalidation')
const loginvalidator = require('../validation/loginvalidation')
const verify = require("../middlewares/verification.js");

const { DoctorRegister, DoctorLogin, Doctorinfo, UpdateDoctor, DeleteDoctor } = require('../controller/doctor');

//ALL CRUD ROUTES RELATED TO DOCTOR ACCOUNT
router.post('/register', signupavalidator, DoctorRegister);
router.post('/login', loginvalidator, DoctorLogin);
router.get('/private', verify, Doctorinfo);
router.patch('/update/:id', verify, UpdateDoctor);
router.delete('/delete/:id', verify, DeleteDoctor)



module.exports = router;