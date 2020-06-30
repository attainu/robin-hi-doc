const express = require("express");

const { postValidate, patchValidate } = require("../validation/patientProfile");
const verify = require("../middlewares/verification");
const patientProfileLogix = require("../controller/patientProfile");

const router = express.Router();

router.post("/", verify, patientProfileLogix.create);

router.get("/:phone", verify, patientProfileLogix.view);

router.patch("/:phone", verify, patchValidate, patientProfileLogix.update);

router.delete("/:phone", verify, patientProfileLogix.remove);

module.exports = router;
