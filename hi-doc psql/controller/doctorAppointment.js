const doctorAppointmentModel = require("../model/doctorAppointment");
const { dp } = require("../model/doctorProfile");

const docAptLogix = {
  update: async function (req, res) {
    try {
      await doctorAppointmentModel.update(
        {
          status: req.body.status,
          diagnosis: req.body.diagnosis,
          prescription: req.body.prescription,
          prognosis: req.body.prognosis,
        },
        { where: { doctorAppointmentId: req.params.id } }
      );
      const nowDocApt = await doctorAppointmentModel.findOne({
        where: { doctorAppointmentId: req.params.id },
      });
      res.json(nowDocApt.dataValues);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  remove: async function (req, res) {
    try {
      const removedDocApt = await doctorAppointmentModel.destroy({
        where: {
          doctorAppointmentId: req.params.id,
        },
      });
      res.json(removedDocApt);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  viewAll: async function (req, res) {
    try {
      // console.log(req._data);
      // const SpecificDocProfile = await dp.findOne({
      //   where: { registrationId: req.params.registrationId },
      // });
      // console.log(SpecificDocProfile.dataValues);
      // const SpecificDocProfile = await dp.findOne({
      //   where: { registrationId: req.params.registrationId },
      // });
      const allDocApts = await doctorAppointmentModel.findAll({
        where: {
          doctorInfo: { registrationId: req.params.registrationId },
        },
      });
      console.log(allDocApts);
      // const countDocs = await doctorAppointmentModel.count();
      // console.log(countDocs);
      res.json(allDocApts);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  viewStatuswise: async function (req, res) {
    try {
      const SpecificDocProfile = await dp.findOne({
        where: { registrationId: req.params.registrationId },
      });
      const statusWiseDocApts = await doctorAppointmentModel.findAll({
        where: {
          doctorInfo: SpecificDocProfile.dataValues,
          status: req.params.status,
        },
      });
      res.json(statusWiseDocApts);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
};

module.exports = docAptLogix;
