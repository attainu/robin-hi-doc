const mongoose = require("mongoose");

const docAptModel = require("../model/doctorAppointment");

const patientAppointmentSchema = mongoose.Schema({
  doctor: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  registrationId: {
    type: String,
    required: true,
  },
  schedule: {
    day: {
      type: String,
      required: true,
    },
    timings: {
      type: String,
      required: true,
    },
  },
  patientPhone: {
    type: String,
    required: true,
  },
  appointmentRequest: {
    type: Boolean,
    required: true,
    default: true,
  },
  doctorResponse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DA",
  },
});

module.exports = mongoose.model("PA", patientAppointmentSchema);
