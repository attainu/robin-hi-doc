const mongoose = require("mongoose");

const doctorAvailabailitySchema = mongoose.Schema({
  day: {
    type: String,
    // unique: true,
    required: true,
  },
  timings: {
    type: Object,
    required: true,
  },
});

const doctorProfile = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  registrationId: {
    type: String,
    unique: true,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique:true,
    required: true,
    minLength: 10,
    maxLength: 10,
  },
  availability: {
    type: [doctorAvailabailitySchema],
    required: true,
  },
});

module.exports = {
  doctorProfile: mongoose.model("DP", doctorProfile),
  doctorAvailability: mongoose.model(
    "DocAvailability",
    doctorAvailabailitySchema
  ),
};
