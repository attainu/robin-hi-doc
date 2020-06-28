const moment = require("moment");

const { dp, dav } = require("../model/doctorProfile");
const Doctor = require("../model/Doctor");
const doctorProfileLogix = {
  create: async function (req, res) {
    try {
      console.log("entered dav and dp");
      const newAvail = await dav.create({
        day: req.body.availability.day,
        timings: req.body.availability.timings,
      });
      console.log(newAvail.dataValues);
      console.log("exited dav");
      const NewDocProfile = await dp.create({
        name: req.body.name,
        age: req.body.age,
        qualification: req.body.qualification,
        registrationId: req.body.registrationId,
        speciality: req.body.speciality,
        region: req.body.region,
        phone: req.body.phone,
        availability: [newAvail.dataValues],
      });
      console.log("exited dp");
      console.log(newAvail.dataValues);

      // if (NewDocProfile.dataValues.availability == null)
      //   NewDocProfile.dataValues.availability = [];
      // NewDocProfile.dataValues.availability.push(newAvail.dataValues);
      // await NewDocProfile.save();
      console.log(NewDocProfile.dataValues);
      return res.json(NewDocProfile.dataValues);
    } catch (e) {
      console.log(e);
      res.json({ message: e.message });
    }
  },
  view: async function (req, res) {
    try {
      const specificDoctorProfile = await dp.findOne({
        where: {
          registrationId: req.params.registrationId,
        },
      });
      res.json(specificDoctorProfile);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
  addAvailability: async function (req, res) {
    try {
      const newAvailability = await dav.create({
        day: req.body.availability.day,
        timings: req.body.availability.timings,
      });

      const specificDoctorProfile = await dp.findOne({
        where: {
          registrationId: req.params.registrationId,
        },
      });
      specificDoctorProfile.dataValues.availability.push(
        newAvailability.dataValues
      );
      const updatedDoctorProfile = await dp.update(
        { availability: specificDoctorProfile.dataValues.availability },
        { where: { registrationId: req.params.registrationId } }
      );
      const nowDocProfile = await dp.findOne({
        where: { registrationId: req.params.registrationId },
      });
      res.json(nowDocProfile.dataValues);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
  remove: async function (req, res) {
    try {
      const removedDoctorProfile = await dp.destroy({
        where: {
          registrationId: req.params.registrationId,
        },
      });
      res.json(removedDoctorProfile.dataValues);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
  removeAvailability: async function (req, res) {
    try {
      const specificDoctorProfile = await dp.findOne({
        where: {
          registrationId: req.params.registrationId,
        },
      });
      const Index = specificDoctorProfile.dataValues.availability.findIndex(
        ({ day }) => day == req.params.day
      );

      specificDoctorProfile.dataValues.availability.splice(Index, 1);
      await dp.update(
        { availability: specificDoctorProfile.dataValues.availability },
        { where: { registrationId: req.params.registrationId } }
      );
      const updatedDoctorProfile = await dp.findOne({
        where: {
          registrationId: req.params.registrationId,
        },
      });
      res.json(updatedDoctorProfile.dataValues);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
  updateDocProfile: async function (req, res) {
    try {
      const updatedDocProfile = await dp.update(
        { where: { registrationId: req.params.registrationId } },
        { $set: { ...req.body } }
      );
      res.json(updatedDocProfile);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
};

module.exports = doctorProfileLogix;
