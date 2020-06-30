const JOI = require("@hapi/joi");
const patientProfile = require("../model/patientProfile");

const post_schema = JOI.object({
  name: JOI.string().min(6).required(),
  age: JOI.number().required(),
  medicalConditions: JOI.object().required(),
  medicineUsage: JOI.object().required(),
  medicalHistory: JOI.object().required(),
  phone: JOI.string().min(10).max(10).required(),
});

const patch_schema = JOI.object({
  name: JOI.string().min(6),
  age: JOI.number(),
  medicalConditions: JOI.object(),
  medicineUsage: JOI.object(),
  medicalHistory: JOI.object(),
  phone: JOI.string().min(10).max(10),
});

const post_validate = async function (req, res, next) {
  const validation = post_schema.validate(req.body);
  if (validation.error) {
    return res.send(validation.error.details[0].message);
  }
  const isExist = await patientProfile.findOne({ phone: req.body.phone });
  if (isExist)
    return res
      .status(400)
      .json({ error: "this phone number already exists in database" });
  next();
};

const patch_validate = async function (req, res, next) {
  const validation = patch_schema.validate(req.body);
  if (validation.error) {
    return res.send(validation.error.details[0].message);
  }
  if (req.body.phone) {
    const isExist = await patientProfile.findOne({ phone: req.body.phone });
    if (isExist)
      return res
        .status(400)
        .json({ error: "this phone number already exists in database" });
  }
  next();
};

module.exports = {
  postValidate: post_validate,
  patchValidate: patch_validate,
};
