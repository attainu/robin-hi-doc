const router = require("express").Router();

const docSupMid = require("../middlewares/doctorSignup");
const docSupVal = require("../validation/doctorSignup");
const docSupLogix = require("../controller/doctorSignup");

router.post(
  "/",
  docSupVal.postVal,
  docSupMid.accountExists,
  docSupLogix.create
);

router.get("/:username", docSupLogix.view);

router.patch(
  "/update/:username",
  docSupVal.patchVal,
  docSupMid.hashing,
  docSupLogix.update
);

router.delete("/remove/:username", docSupLogix.remove);

module.exports = router;
