const JOI = require("@hapi/joi");

const post_schema = JOI.object({
  doctor: JOI.string().min(3).required(),
  region: JOI.string().min(3).required(),
  speciality: JOI.string().min(3).required(),
  registrationId: JOI.string().min(4).required(),
  day: JOI.string().min(10).max(10).required(),
  timings: JOI.string().required(),
  patientPhone: JOI.string().min(10).max(10).required(),
  appointmentRequest: JOI.boolean().required(),
});

const patch_schema = JOI.object({
  doctor: JOI.string().min(3),
  region: JOI.string().min(3),
  speciality: JOI.string().min(3),
  registrationId: JOI.string().min(4),
  day: JOI.string().min(10).max(10),
  timings: JOI.string(),
  patientPhone: JOI.string().min(10).max(10),
  appointmentRequest: JOI.boolean().required(),
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
