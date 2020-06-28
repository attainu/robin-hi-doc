const router = require("express").Router();

const docLogMid = require("../middlewares/doctorLogin");
const docLogLogix = require("../controller/doctorLogin");
const validate = require("../validation/doctorLogin");

router.post("/", validate, docLogMid.isdoctor, docLogLogix.login);

module.exports = router;
