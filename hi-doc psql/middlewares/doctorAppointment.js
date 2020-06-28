const doctorappointmnet = require("../model/doctorAppointment");
const patientProfile = require("../model/patientProfile");
const patientAppointment = require("../model/patientAppointment");

const updatePatientStatus = {
  newStatus: async function (req, res, next) {
    const specificDocApt = await doctorappointmnet.findOne({
      where: { doctorAppointmentId: req.params.id },
    });
    const Phone = specificDocApt.dataValues.patientInfo.phone;
    const Day = specificDocApt.dataValues.schedule.day;
    const Timings = specificDocApt.dataValues.schedule.timings;
    await patientAppointment.update(
      {
        doctorResponse: {
          status: req.body.status,
          diagnosis: req.body.diagnosis,
          prescription: req.body.prescription,
          prognosis: req.body.prognosis,
        },
      },
      { where: { patientPhone: Phone, day: Day, timings: Timings } }
    );
    next();
  },
};

module.exports = updatePatientStatus;
