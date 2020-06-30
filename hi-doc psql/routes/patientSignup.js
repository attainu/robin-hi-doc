const router = require("express").Router();

const patientSupMid = require("../middlewares/patientSignup");
const patientSupVal = require("../validation/patientSignup");
const patientSupLogix = require("../controller/patientSignup");

router.post(
  "/",
  patientSupVal.postVal,
  patientSupMid.accountExists,
  patientSupLogix.create
);

router.get("/:username", patientSupLogix.view);

router.patch(
  "/update/:username",
  patientSupVal.patchVal,
  patientSupMid.hashing,
  patientSupLogix.update
);

router.delete("/remove/:username", patientSupLogix.remove);

module.exports = router;
