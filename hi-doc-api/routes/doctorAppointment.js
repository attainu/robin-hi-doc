const express = require("express");
const verify = require("../middlewares/verification");
const docAptValidate = require("../validation/doctorAppointment");
const docAptLogix = require("../controller/doctorAppointment");
const router = express.Router();

router.get("/all", verify, docAptLogix.viewAll);

router.get("/status/:status", verify, docAptLogix.viewStatuswise);

router.patch("/update/:id", verify, docAptValidate, docAptLogix.update);

router.delete("/delete/:id", verify, docAptLogix.remove);

module.exports = router;
