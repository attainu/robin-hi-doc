const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Model = Sequelize.Model;
const sequelize = require("../config/dbConnection");

class doctorAppointmentSchema extends Model {}

doctorAppointmentSchema.init(
  {
    doctorAppointmentId: {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      defaultValue: Sequelize.UUIDV1,
    },
    patientInfo: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    doctorInfo: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    schedule: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM,
      values: ["pending", "approved", "session-completed"],
      allowNull: false,
      defaultValue: "pending",
    },
    diagnosis: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    prescription: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    prognosis: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "doctorAppointment" }
);

module.exports = doctorAppointmentSchema;
