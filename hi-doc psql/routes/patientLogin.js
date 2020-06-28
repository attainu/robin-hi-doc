const router = require("express").Router();

const patientLogMid = require("../middlewares/patientLogin");
const patientLogLogix = require("../controller/patientLogin");
const validate = require("../validation/patientLogin");

router.post("/", validate, patientLogMid.isPatient, patientLogLogix.login);

module.exports = router;
