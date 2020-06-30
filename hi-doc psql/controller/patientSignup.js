const patientPassThrough = require("../model/patient");

const patientPTLogix = {
  create: async function (req, res, next) {
    try {
      const newPatient = await patientPassThrough.create({
        username: req.body.username,
        email: req.body.email,
        password: req.hashedpwd,
      });

      res.status(200).send("Patient registered successfully");
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  view: async function (req, res, next) {
    try {
      const specificPatient = await patientPassThrough.findOne({
        where: { username: req.params.username },
      });
      res.status(200).json(specificPatient.dataValues);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  update: async function (req, res, next) {
    try {
      const updatedPatient = await patientPassThrough.update(
        {
          username: req.body.username,
          email: req.body.email,
          password: req.hashedpwd,
        },
        { where: { username: req.params.username } }
      );
      res.status(200).json(updatedPatient);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  remove: async function (req, res, next) {
    try {
      const removedPatient = await patientPassThrough.remove({
        where: { username: req.params.username },
      });
      res.status(200).json(removedPatient);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = patientPTLogix;
