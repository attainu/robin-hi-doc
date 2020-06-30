const patientPassThrough = require("../model/patient");
const bcrypt = require("bcryptjs");

const Check = {
  isPatient: async function (req, res, next) {
    try {
      const patient = await patientPassThrough.findOne({
        where: { email: req.body.email },
      });
      if (!patient)
        return res.status(400).json({ error: "invalid credentials" });
      const isPasswordMatching = await bcrypt.compare(
        req.body.password,
        patient.dataValues.password
      );
      if (!isPasswordMatching)
        return res.status(400).json({ error: "invalid credentials" });
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = Check;
