const express = require("express")

const doctorProfileLogix = require("../controller/doctorProfile")

const router = express.Router()

router.post('/',doctorProfileLogix.create)

router.get('/:registrationId',doctorProfileLogix.view)

router.patch('/:registrationId',doctorProfileLogix.update)

router.delete('/:registrationId',doctorProfileLogix.remove)

module.exports = router