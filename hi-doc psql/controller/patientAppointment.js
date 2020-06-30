const patientAppointment = require("../model/patientAppointment");
const { dp } = require("../model/doctorProfile");
const patientProfile = require("../model/patientProfile");
const doctorAptModel = require("../model/doctorAppointment");
const moment = require("moment");

// const  updateOne  = require("../model/patientProfile");

const patientAppLogix = {
  create: async function (req, res, next) {
    try {
      const newPatientAppointment = await patientAppointment.create({
        doctor: req.body.doctor,
        region: req.body.region,
        speciality: req.body.speciality,
        registrationId: req.body.registrationId,
        day: req.body.day,
        timings: req.body.timings,
        patientPhone: req.body.patientPhone,
        appointmentRequest: req.body.appointmentRequest,
        doctorResponse: req.docResponse,
      });
      res.status(200).json(newPatientAppointment.dataValues);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  update: async function (req, res, next) {
    // only status updation is permitted for the current appointment
    try {
      const updatedPatientAppointment = await patientAppointment.update(
        { appointmentRequest: req.body.appointmentRequest },
        { where: { pattientAppointmentId: req.params.id } }
      );
      req.updatedPatientApt = updatedPatientAppointment;
      next();
    } catch (err) {
      res.send(err.message);
    }
  },
  remove: async function (req, res) {
    try {
      const removedAppointment = await patientAppointment.destroy({
        where: {
          patientAppointmentId: req.params.id,
        },
      });
      res.json(removedAppointment);
    } catch (err) {
      res.send(err.message);
    }
  },
  viewAll: async function (req, res) {
    try {
      const allAppointments = await patientAppointment.findAll({
        where: { patientPhone: req.params.patientPhone },
      });
      res.json(allAppointments);
    } catch (err) {
      res.send(err.message);
    }
  },
  viewStatusWise: async function (req, res) {
    try {
      const allAppointments = await patientAppointment.findAll({
        where: { patientPhone: req.params.patientPhone },
      });
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
