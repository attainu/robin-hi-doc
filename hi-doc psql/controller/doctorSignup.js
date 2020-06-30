const doctorPassThrough = require("../model/doctor");

const doctorPTLogix = {
  create: async function (req, res, next) {
    try {
      const newDoctor = await doctorPassThrough.create({
        username: req.body.username,
        email: req.body.email,
        password: req.hashedpwd,
      });

      res.status(200).send("doctor registered successfully");
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  view: async function (req, res, next) {
    try {
      const specificDoctor = await doctorPassThrough.findOne({
        where: { username: req.params.username },
      });
      res.status(200).json(specificDoctor.dataValues);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  update: async function (req, res, next) {
    try {
      const updatedDoctor = await doctorPassThrough.update(
        {
          username: req.body.username,
          email: req.body.email,
          password: req.hashedpwd,
        },
        { where: { username: req.params.username } }
      );
      res.status(200).json(updatedDoctor);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  remove: async function (req, res, next) {
    try {
      const removedDoctor = await doctorPassThrough.remove({
        where: { username: req.params.username },
      });
      res.status(200).json(removedDoctor);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = doctorPTLogix;
