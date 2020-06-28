const { dp } = require("../model/doctorProfile");

const view = {
  all: async (req, res, next) => {
    try {
      const allDocs = await dp.findAll();
      res.status(200).json(allDocs);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  byRegion: async (req, res, next) => {
    try {
      const docsInRegion = await dp.findAll({
        region: req.params.region,
      });
      res.status(200).json(docsInRegion);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  bySpeciality: async (req, res, next) => {
    try {
      const docsOfSpeciality = await dp.findAll({
        speciality: req.params.speciality,
      });
      res.status(200).json(docsOfSpeciality);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  byRegionAndSpeciality: async (req, res, next) => {
    try {
      const docsInRegionOfSpeciality = await dp.findAll({
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
