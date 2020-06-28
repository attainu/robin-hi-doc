const patientAppointment = require("../model/patientAppointment");
const { doctorProfile } = require("../model/doctorProfile");
const patientProfile = require("../model/patientProfile");
const doctorAptModel = require("../model/doctorAppointment");
const moment = require("moment");
// const  updateOne  = require("../model/patientProfile");

const patientAppLogix = {
  create: async function (req, res, next) {
    try {
      const newPatientAppointment = new patientAppointment({
        doctor: req.body.doctor,
        region: req.body.region,
        speciality: req.body.speciality,
        registrationId: req.body.registrationId,
        schedule: {
          day: req.body.schedule.day,
          timings: req.body.schedule.timings,
        },
        patientPhone: req.body.patientPhone,
        appointmentRequest: req.body.appointmentRequest,
      });

      const savedPatientAppointment = await newPatientAppointment.save();
      req.patientApt = savedPatientAppointment;
      next();
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  update: async function (req, res, next) {
    // only status updation is permitted for the current appointment
    try {
      const updatedPatientAppointment = await patientAppointment.updateOne(
        { _id: req.params.id },
        { $set: { appointmentRequest: req.body.appointmentRequest } }
      );
      req.updatedPatientApt = updatedPatientAppointment;
      next();
    } catch (err) {
      res.send(err.message);
    }
  },
  remove: async function (req, res) {
    try {
      const removedAppointment = await patientAppointment.deleteOne({
        _id: req.params.id,
      });
      res.json(removedAppointment);
    } catch (err) {
      res.send(err.message);
    }
  },
  viewAll: async function (req, res) {
    try {
      const allAppointments = await patientAppointment
        .find({ patientPhone: req.params.patientPhone })
        .populate("doctorResponse");
      res.json(allAppointments);
    } catch (err) {
      res.send(err.message);
    }
  },
  viewStatusWise: async function (req, res) {
    try {
      const allAppointments = await patientAppointment
        .find({ patientPhone: req.params.patientPhone })
        .populate("doctorResponse");
      const appointmentsStatusWise = [];
      allAppointments.forEach((appointment) => {
        if (appointment.doctorResponse.status == req.params.status) {
          appointmentsStatusWise.push(appointment);
        }
      });
      return res.json(appointmentsStatusWise);
    } catch (err) {
      res.send(err.message);
    }
  },
};
module.exports = patientAppLogix;
