const JOI = require("@hapi/joi");

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

const post_validate = function (req, res, next) {
  const validation = post_schema.validate(req.body);
  if (validation.error) {
    return res.send(validation.error.details[0].message);
  }
  next();
};

const patch_validate = function (req, res, next) {
  const validation = patch_schema.validate(req.body);
  if (validation.error) {
    return res.send(validation.error.details[0].message);
  }
  next();
};

module.exports = {
  postValidate: post_validate,
  patchValidate: patch_validate,
};
