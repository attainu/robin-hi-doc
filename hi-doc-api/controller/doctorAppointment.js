const doctorAppointmentModel = require("../model/doctorAppointment");

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
      console.log(req._data);
      const allDocApts = await doctorAppointmentModel
        .find({ doctorInfo: req._data.profileID })
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
      const statusWiseDocApts = await doctorAppointmentModel
        .find({ _id: req._id, status: req.params.status })
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
