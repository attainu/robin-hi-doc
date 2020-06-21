const express = require("express");

const doctorProfileLogix = require("../controller/doctorProfile");

const router = express.Router();

router.post("/", doctorProfileLogix.create);

router.get("/:registrationId", doctorProfileLogix.view);

router.patch("/update/:registrationId", doctorProfileLogix.addAvailability);

router.patch("/update/:registrationId", doctorProfileLogix.updateDocProfile);

router.delete(
  "/update/:registrationId/:day",
  doctorProfileLogix.removeAvailability
);

router.delete("/delete/:registrationId", doctorProfileLogix.remove);

module.exports = router;
