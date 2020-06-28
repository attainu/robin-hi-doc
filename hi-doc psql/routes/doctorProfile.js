const express = require("express");
const verify = require("../middlewares/verification");
const {
  postValidate,
  addAvailabilityVal,
  updateValidate,
} = require("../validation/doctorProfile");
const docProfile = require("../middlewares/doctorProfile");
const doctorProfileLogix = require("../controller/doctorProfile");

const router = express.Router();

router.post("/", verify, postValidate, doctorProfileLogix.create);

router.get("/:registrationId", verify, doctorProfileLogix.view);

router.patch(
  "/addAvailability/:registrationId",
  verify,
  addAvailabilityVal,
  docProfile.isDayexists,
  doctorProfileLogix.addAvailability
);

router.patch(
  "/update/:registrationId",
  verify,
  updateValidate,
  doctorProfileLogix.updateDocProfile
);

router.delete(
  "/removeAvailability/:registrationId/:day",
  verify,
  doctorProfileLogix.removeAvailability
);

router.delete("/delete/:registrationId", verify, doctorProfileLogix.remove);

module.exports = router;
