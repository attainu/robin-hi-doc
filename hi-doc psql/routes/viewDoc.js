const express = require("express");

const view = require("../controller/viewDoc");

const router = express.Router();

router.get("/all", view.all);

router.get("/region/:region", view.byRegion);

router.get("/speciality/:speciality", view.bySpeciality);

router.get(
  "/region/speciality/:region/:speciality",
  view.byRegionAndSpeciality
);

module.exports = router;
