const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Model = Sequelize.Model;
const sequelize = require("../config/dbConnection");

class patientPassThroughSchema extends Model {}

patientPassThroughSchema.init(
  {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "patientPassThrough" }
);

module.exports = patientPassThroughSchema;
