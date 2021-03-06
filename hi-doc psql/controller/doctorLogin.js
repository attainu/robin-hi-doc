const jwt = require("jsonwebtoken");
require("dotenv/config");
const doctorPassThrough = require("../model/doctor");

const docLogLogix = {
  login: async function (req, res, next) {
    try {
      const token = await jwt.sign(req.payload, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res.status(200).json({ token: token });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = docLogLogix;
