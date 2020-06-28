const patientPassThrough = require("../model/patient");
const bcrypt = require("bcryptjs");

const patientPTMiddleware = {
  accountExists: async function (req, res, next) {
    try {
      const isExist = await patientPassThrough.findOne({
        where: { email: req.body.email },
      });
      if (isExist)
        return res.status(400).json({ error: "user with given email exists" });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.hashedpwd = hashedPassword;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  hashing: async function (req, res, next) {
    try {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.hashedpwd = hashedPassword;
      }
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = patientPTMiddleware;
