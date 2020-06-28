const { doctorProfile } = require("../model/doctorProfile");

const view = {
  all: async (req, res, next) => {
    try {
      const allDocs = await doctorProfile.find();
      res.status(200).json(allDocs);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  byRegion: async (req, res, next) => {
    try {
      const docsInRegion = await doctorProfile.find({
        region: req.params.region,
      });
      res.status(200).json(docsInRegion);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  bySpeciality: async (req, res, next) => {
    try {
      const docsOfSpeciality = await doctorProfile.find({
        speciality: req.params.speciality,
      });
      res.status(200).json(docsOfSpeciality);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  byRegionAndSpeciality: async (req, res, next) => {
    try {
      const docsInRegionOfSpeciality = await doctorProfile.find({
        region: req.params.region,
        speciality: req.params.speciality,
      });
      res.status(200).json(docsInRegionOfSpeciality);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = view;
