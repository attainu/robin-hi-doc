const express = require("express");

const {
  postValidate,
  patchValidate,
} = require("../validation/patientAppointment");
const verify = require("../middlewares/verification");
const patientAptMid = require("../middlewares/patientAppointment");
const patientAppLogix = require("../controller/patientAppointment");

const router = express.Router();

router.post(
  "/",
  verify,
  postValidate,
  patientAptMid.scheduleCheck,
  patientAptMid.isPatientBusy,
  patientAptMid.isDocAvailable,
  patientAptMid.createDocNewApt,
  patientAppLogix.create
);

router.get("/all/:patientPhone", verify, patientAppLogix.viewAll);

router.patch(
  "/update/:id",
  verify,
  patchValidate,
  patientAptMid.isCancellingBeforeApt,
  patientAppLogix.update,
  patientAptMid.freeUpDoc
);

router.delete("/delete/:id", verify, patientAppLogix.remove);

router.get(
  "/status/:patientPhone/:status",
  verify,
  patientAppLogix.viewStatusWise
);

module.exports = router;
