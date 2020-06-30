const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Model = Sequelize.Model;
const sequelize = require("../config/dbConnection");

class patientAppointmentSchema extends Model {}

patientAppointmentSchema.init(
  {
    patientAppointmentId: {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      defaultValue: Sequelize.UUIDV1,
    },
    doctor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    region: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    speciality: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    registrationId: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    day: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    timings: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    patientPhone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    appointmentRequest: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    doctorResponse: {
      type: Sequelize.JSONB,
    },
  },
  { sequelize, modelName: "patientAppointment" }
);

module.exports = patientAppointmentSchema;
