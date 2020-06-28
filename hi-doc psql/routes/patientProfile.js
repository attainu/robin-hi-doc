const express = require("express");

const { postValidate, patchValidate } = require("../validation/patientProfile");
const verify = require("../middlewares/verification");
const patientProfileLogix = require("../controller/patientProfile");

const router = express.Router();

router.post("/", verify, postValidate, patientProfileLogix.create);

router.get("/view/:phone", verify, patientProfileLogix.view);

router.patch(
  "/update/:phone",
  verify,
  patchValidate,
  patientProfileLogix.update
);

router.delete("/remove/:phone", verify, patientProfileLogix.remove);

module.exports = router;
