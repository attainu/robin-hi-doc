const doctorAppointmentModel = require("../model/doctorAppointment");
const { doctorProfile } = require("../model/doctorProfile");
const docAptLogix = {
  update: async function (req, res) {
    try {
      const updatedDocApt = await doctorAppointmentModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            status: req.body.status,
            diagnosis: req.body.diagnosis,
            prescription: req.body.prescription,
            prognosis: req.body.prognosis,
          },
        }
      );
      res.json(updatedDocApt);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  remove: async function (req, res) {
    try {
      const removedDocApt = await doctorAppointmentModel.deleteOne({
        _id: req.params.id,
      });
      res.json(removedDocApt);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  viewAll: async function (req, res) {
    try {
      console.log("data req: ", req._data);
      const specificDocInfo = await doctorProfile.findOne({
        registrationId: req.params.registrationId,
      });
      const allDocApts = await doctorAppointmentModel
        .find({ doctorInfo: specificDocInfo._id })
        .populate(
          "patientInfo",
          "name age medicalConditions medicineUsage medicalHistory phone -_id"
        )
        .populate("schedule", "schedule appointmentRequest -_id");
      res.json(allDocApts);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  viewStatuswise: async function (req, res) {
    try {
      const specificDocInfo = await doctorProfile.findOne({
        registrationId: req.params.registrationId,
      });
      const statusWiseDocApts = await doctorAppointmentModel
        .find({ doctorInfo: specificDocInfo._id, status: req.params.status })
        .populate(
          "patientInfo",
          "name age medicalConditions medicineUsage medicalHistory phone -_id"
        )
        .populate("schedule", "schedule appointmentRequest -_id");
      res.json(statusWiseDocApts);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
};

module.exports = docAptLogix;
