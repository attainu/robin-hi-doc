const express = require("express");

const patientAppValidate = require("../validation/patientAppointment");
const patientAptMid = require("../middlewares/patientAppointment");
const patientAppLogix = require("../controller/patientAppointment");

const router = express.Router();

router.post(
  "/",
  patientAppValidate,
  patientAptMid.scheduleCheck,
  patientAptMid.isPatientBusy,
  patientAptMid.isDocAvailable,
  patientAppLogix.create,
  patientAptMid.createDocNewApt
);

router.get("/all", patientAppLogix.viewAll);

router.patch(
  "/update/:id",
  patientAptMid.isCancellingBeforeApt,
  patientAppLogix.update,
  patientAptMid.freeUpDoc
);

router.delete("/delete/:id", patientAppLogix.remove);

router.get("/status/:status", patientAppLogix.viewStatusWise);

module.exports = router;
