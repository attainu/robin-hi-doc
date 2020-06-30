const Sequelize = require("sequelize");
//"postgres://jmmgbijr:a5PM4BnriY8_BU5QqsJ1To2Mi0ktnPJo@arjuna.db.elephantsql.com:5432/jmmgbijr"

const db = new Sequelize(
  "postgres://jmmgbijr:a5PM4BnriY8_BU5QqsJ1To2Mi0ktnPJo@arjuna.db.elephantsql.com:5432/jmmgbijr",
  // host: "localhost",
  {
    dialect: "postgres",
    // ...
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

db.authenticate()
  .then(() => {
    console.log("DB connected ...");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = db;
