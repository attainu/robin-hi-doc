const doctorPassThrough = require("../model/doctor");
const bcrypt = require("bcryptjs");

const Check = {
  isdoctor: async function (req, res, next) {
    try {
      const doctor = await doctorPassThrough.findOne({
        where: { email: req.body.email },
      });
      if (!doctor)
        return res.status(400).json({ error: "invalid credentials" });
      const isPasswordMatching = await bcrypt.compare(
        req.body.password,
        doctor.dataValues.password
      );
      if (!isPasswordMatching)
        return res.status(400).json({ error: "invalid credentials" });

      const Payload = {};
      Payload.usename = doctor.dataValues.usename;
      Payload.time = Date.now();
      req.payload = Payload;

      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = Check;
