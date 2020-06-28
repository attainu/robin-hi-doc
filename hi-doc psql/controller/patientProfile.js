const patientProfile = require("../model/patientProfile");
const Patient = require("../model/Patient");

const patientProfileLogix = {
  create: async function (req, res) {
    try {
      const newPatientProfile = await patientProfile.create({ ...req.body });

      // const Patient1 = await Patient.findById(req._id);
      // Patient1.profileID = savedPatientProfile._id;
      // await Patient1.save();
      res.status(201).json(newPatientProfile.dataValues);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
  view: async function (req, res) {
    try {
      const specificPatientProfile = await patientProfile.findOne({
        where: {
          phone: req.params.phone,
        },
      });
      res.json(specificPatientProfile.dataValues);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
  update: async function (req, res) {
    try {
      const updatedPatientProfile = await patientProfile.update(
        { $set: { ...req.body } },
        { where: { phone: req.params.phone } }
      );
      const nowPatientProfile = await patientProfile.findOne({
        where: { phone: req.params.phone },
      });
      res.json(updatedPatientProfile);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
  remove: async function (req, res) {
    try {
      const removedPatientProfile = await patientProfile.destroy({
        where: {
          phone: req.params.phone,
        },
      });
      res.json(removedPatientProfile);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
};

module.exports = patientProfileLogix;
