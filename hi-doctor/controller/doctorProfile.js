const moment = require("moment");

const { doctorProfile, doctorAvailability } = require("../model/doctorProfile");
const Doctor = require("../model/Doctor");

const doctorProfileLogix = {
  create: async function (req, res) {
    try {
      const newAvailability = new doctorAvailability({
        day: req.body.availability.day,
        timings: req.body.availability.timings,
      });
      const newDoctorProfile = new doctorProfile({
        name: req.body.name,
        age: req.body.age,
        qualification: req.body.qualification,
        registrationId: req.body.registrationId,
        speciality: req.body.speciality,
        region: req.body.region,
        phone: req.body.phone,
        availability: [newAvailability],
      });
      const savedDoctorProfile = await newDoctorProfile.save();
      const Doctor1 = await Doctor.findById(req._id);
      await Doctor.updateOne(
        { _id: req._data._id },
        { $set: { profileID: savedDoctorProfile._id } }
      );
      // Doctor1.profileID = savedDoctorProfile._id
      // await Doctor1.save()
      res.json(savedDoctorProfile);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
  view: async function (req, res) {
    try {
      const specificDoctorProfile = await doctorProfile.findOne({
        registrationId: req.params.registrationId,
      });
      res.json(specificDoctorProfile);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
  addAvailability: async function (req, res) {
    try {
      const newAvailability = new doctorAvailability({
        day: req.body.availability.day,
        timings: req.body.availability.timings,
      });
      const specificDoctorProfile = await doctorProfile.findOne({
        registrationId: req.params.registrationId,
      });
      specificDoctorProfile.availability.push(newAvailability);
      const updatedDoctorProfile = await specificDoctorProfile.save();
      res.json(updatedDoctorProfile);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
  remove: async function (req, res) {
    try {
      const removedDoctorProfile = await doctorProfile.deleteOne({
        registrationId: req.params.registrationId,
      });
      res.json(removedDoctorProfile);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
  removeAvailability: async function (req, res) {
    try {
      const specificDoctorProfile = await doctorProfile.findOne({
        registrationId: req.params.registrationId,
      });
      const specificAvailabilty = specificDoctorProfile.availability.find(
        ({ day }) => day == req.params.day
      );
      specificAvailabilty.remove();
      const updatedDoctorProfile = await specificDoctorProfile.save();
      res.json(updatedDoctorProfile);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
  updateDocProfile: async function (req, res) {
    try {
      const updatedDocProfile = await doctorProfile.updateOne(
        { registrationId: req.params.registrationId },
        { $set: { ...req.body } }
      );
      res.json(updatedDocProfile);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
};

module.exports = doctorProfileLogix;
