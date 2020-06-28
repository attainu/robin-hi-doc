const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Model = Sequelize.Model;
const sequelize = require("../config/dbConnection");

class patientProfileSchema extends Model {}
patientProfileSchema.init(
  {
    patientProfileId: {
      type: Sequelize.UUID,
      unique: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV1,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    medicalConditions: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    medicineUsage: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    medicalHistory: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      uniqie: true,
      allowNull: false,
    },
  },
  { sequelize, modelName: "patientProfile" }
);

module.exports = patientProfileSchema;
