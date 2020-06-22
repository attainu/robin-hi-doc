const mongoose = require("mongoose");

// const patientProfile = require("../model/patientProfile")
// const {model} = require("../model/patientAppointment")

const doctorAppointmentSchema = mongoose.Schema({
  doctorInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DP",
    required: true,
  },
  patientInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PP",
    required: true,
  },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PA",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "session-completed"],
    default: "pending",
  },
  diagnosis: {
    type: String,
    required: function () {
      if (this.status == "session-completed") {
        return true;
      } else {
        return false;
      }
    },
  },
  prescription: {
    type: String,
    required: function () {
      if (this.diagnosis) {
        return true;
      } else {
        return false;
      }
    },
  },
  prognosis: {
    type: String,
  },
});

module.exports = mongoose.model("DA", doctorAppointmentSchema);
