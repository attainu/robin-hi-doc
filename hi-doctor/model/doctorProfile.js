const mongoose = require("mongoose");

/* https://github.com/Automattic/mongoose/issues/2226 ~stgogm on 17 Jun 2016 */
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
