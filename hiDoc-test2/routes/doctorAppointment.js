const express = require("express")

const docAptLogix = require("../controller/doctorAppointment")
const router = express.Router()

router.get('/all',docAptLogix.viewAll)

router.get('/status/:status',docAptLogix.viewStatuswise)

router.patch('/update/:id',docAptLogix.update)

router.delete('/delete/:id',docAptLogix.remove)

module.exports = router