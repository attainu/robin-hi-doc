const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Model = Sequelize.Model;
const sequelize = require("../config/dbConnection");
// const sequelize = new Sequelize({ dialect: "postgres" });
class doctorAvailabilitySchema extends Model {}

doctorAvailabilitySchema.init(
  {
    availabilityId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: Sequelize.UUIDV1,
    },
    day: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    timings: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
  },
  { sequelize: sequelize, modelName: "doctorAvailability" }
);

class doctorProfileSchema extends Model {}

doctorProfileSchema.init(
  {
    profileId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
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
    qualification: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    registrationId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    speciality: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    region: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    availability: {
      type: Sequelize.ARRAY(Sequelize.JSONB),
    },
  },
  { sequelize: sequelize, modelName: "doctorProfile" }
);

// doctorProfileSchema.hasMany(doctorAvailabilitySchema);
// doctorAvailabilitySchema.belongsTo(doctorProfileSchema);

module.exports = {
  dp: doctorProfileSchema,
  dav: doctorAvailabilitySchema,
};
