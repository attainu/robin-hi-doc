const express = require("express");

const { postValidate, patchValidate } = require("../validation/patientProfile");
const verify = require("../middlewares/verification");
const patientProfileLogix = require("../controller/patientProfile");

const router = express.Router();

router.post("/", verify, patientProfileLogix.create);

router.get("/", verify, patientProfileLogix.view);

router.patch("/", verify, patchValidate, patientProfileLogix.update);

router.delete("/", verify, patientProfileLogix.remove);

module.exports = router;
