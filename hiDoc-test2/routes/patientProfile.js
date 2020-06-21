const express = require("express")

const validate = require("../validation/patientProfile")
const patientProfileLogix = require("../controller/patientProfile")

const router = express.Router()

router.post('/',validate,patientProfileLogix.create)

router.get('/',patientProfileLogix.view)

router.patch('/',patientProfileLogix.update)

router.delete('/',patientProfileLogix.remove)


module.exports = router