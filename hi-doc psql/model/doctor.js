const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Model = Sequelize.Model;
const sequelize = require("../config/dbConnection");

class doctorPassThroughSchema extends Model {}

doctorPassThroughSchema.init(
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
  { sequelize, modelName: "doctorPassThrough" }
);

module.exports = doctorPassThroughSchema;
