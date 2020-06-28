const express = require("express");
const verify = require("../middlewares/verification");
const docAptValidate = require("../validation/doctorAppointment");
const docAptLogix = require("../controller/doctorAppointment");
const updateStatus = require("../middlewares/doctorAppointment");
const router = express.Router();

router.get("/all/:registrationId", verify, docAptLogix.viewAll);

router.get(
  "/status/:reistrationId/:status",
  verify,
  docAptLogix.viewStatuswise
);

router.patch(
  "/update/:id",
  verify,
  docAptValidate,
  updateStatus.newStatus,
  docAptLogix.update
);

router.delete("/delete/:id", verify, docAptLogix.remove);

module.exports = router;
