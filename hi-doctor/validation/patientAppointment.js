const JOI = require("@hapi/joi");

const post_schema = JOI.object({
  doctor: JOI.string().min(3).required(),
  region: JOI.string().min(3).required(),
  speciality: JOI.string().min(3).required(),
  registrationId: JOI.string().min(4).required(),
  schedule: {
    day: JOI.string().min(10).max(10).required(),
    timings: JOI.string().required(),
  },
  patientPhone: JOI.string().min(10).max(10).required(),
  appointmentRequest: JOI.boolean().required(),
});

const patch_schema = JOI.object({
  doctor: JOI.string().min(3).not(),
  region: JOI.string().min(3).not(),
  speciality: JOI.string().min(3).not(),
  registrationId: JOI.string().min(4).not(),
  schedule: {
    day: JOI.string().min(10).max(10).not(),
    timings: JOI.string().not(),
  },
  patientPhone: JOI.string().min(10).max(10).not(),
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
