const { doctorProfile } = require("../model/doctorProfile");

const docProfile = {
  isDayexists: async (req, res, next) => {
    try {
      const specificDoctor = await doctorProfile.findOne({
        registrationId: req.params.registrationId,
      });
      const isDayExist = specificDoctor.availability.find(
        (i) => i.day == req.body.availability.day
      );
      if (isDayExist)
        return res
          .status(400)
          .json({ error: "Day already exists in the Doctor's profile" });
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = docProfile;
