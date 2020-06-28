const { dp } = require("../model/doctorProfile");

const docProfile = {
  isDayexists: async (req, res, next) => {
    try {
      console.log("entered is day exists");
      const specificDoctor = await dp.findOne({
        where: {
          registrationId: req.params.registrationId,
        },
      });
      console.log(specificDoctor);
      console.log(specificDoctor.dataValues.availability);
      const isDayExist = specificDoctor.dataValues.availability.find(
        (i) => i.day == req.body.availability.day
      );
      if (isDayExist)
        return res
          .status(400)
          .json({ error: "Day already exists in the Doctor's profile" });
      console.log("leaving is day exists");
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = docProfile;
