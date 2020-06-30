const patientProfile = require("../model/patientProfile");
const Patient = require("../model/Patient");

const patientProfileLogix = {
  create: async function (req, res) {
    try {
      const newPatientProfile = new patientProfile({ ...req.body });
      const savedPatientProfile = await newPatientProfile.save();
      const Patient1 = await Patient.findById(req._id);
      // Patient1.profileID = savedPatientProfile._id;
      // await Patient1.save();
      await Patient.updateOne(
        { _id: req._data._id },
        { $set: { profileID: savedPatientProfile._id } }
      );

      res.status(201).json({ status_code: 201, savedPatientProfile });
    } catch (e) {
      res.json({ message: e.message });
    }
  },
  view: async function (req, res) {
    try {
      const specificPatientProfile = await patientProfile.findOne({
        phone: req.params.phone,
      });
      res.json(specificPatientProfile);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
  update: async function (req, res) {
    try {
      const updatedPatientProfile = await patientProfile.updateOne(
        { phone: req.params.phone },
        { $set: { ...req.body } }
      );
      res.json(updatedPatientProfile);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
  remove: async function (req, res) {
    try {
      const removedPatientProfile = await patientProfile.deleteOne({
        phone: req.params.phone,
      });
      res.json(removedPatientProfile);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
};

module.exports = patientProfileLogix;
