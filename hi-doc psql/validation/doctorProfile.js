const JOI = require("@hapi/joi");
const moment = require("moment");

const schema = JOI.object({
  profileId: JOI.string(),
  name: JOI.string().min(3).required(),
  age: JOI.number().min(22).max(70).required(),
  qualification: JOI.string().min(4).required(),
  registrationId: JOI.string().required(),
  speciality: JOI.string().min(3).required(),
  region: JOI.string().min(3).required(),
  phone: JOI.string().min(10).max(10).required(),
  availability: JOI.object(),
});

const addAvailabilitySchema = JOI.object({
  availability: {
    availabilityId: JOI.string(),
    day: JOI.string().min(10).max(10).required(),
    timings: JOI.object().required(),
  },
});

const UpdateSchema = JOI.object({
  profileId: JOI.string(),
  name: JOI.string().min(3),
  age: JOI.number().min(22).max(70),
  qualification: JOI.string().min(4),
  registrationId: JOI.string(),
  speciality: JOI.string().min(3),
  region: JOI.string().min(3),
  phone: JOI.string().min(10).max(10),
  availability: JOI.object().not(),
});

const validate = function (req, res, next) {
  // console.log(req.body);
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }
  if (!moment(req.body.availability.day).isValid())
    return res.status(400).send("enter day in the YYYY-MM-DD format");
  const timings = Object.keys(req.body.availability.timings);
  const regex = /^[1]?\d:[0 3]0-[1]?\d:[0 3]0$/;
  timings.forEach((timing) => {
    if (!regex.test(timing)) {
      return res
        .status(400)
        .send("invalid time format entered in the timings property");
    }
  });
  console.log("exiting validation");
  next();
};

const addAvailabilityValidate = function (req, res, next) {
  const validation = addAvailabilitySchema.validate(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }
  if (!moment(req.body.availability.day).isValid())
    return res.status(400).send("enter day in the YYYY-MM-DD format");

  const timings = Object.keys(req.body.availability.timings);
  const regex = /^[1]?\d:[0 3]0-[1]?\d:[0 3]0$/;
  timings.forEach((timing) => {
    if (!regex.test(timing)) {
      return res
        .status(400)
        .send("invalid time format entered in the timings property");
    }
  });
  next();
};

const UpdateValidate = function (req, res, next) {
  const validation = UpdateSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }
  next();
};
module.exports = {
  postValidate: validate,
  addAvailabilityVal: addAvailabilityValidate,
  updateValidate: UpdateValidate,
};
