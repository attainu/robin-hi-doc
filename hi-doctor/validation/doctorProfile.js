const JOI = require("@hapi/joi");
const moment = require("moment");

const schema = JOI.object({
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
    day: JOI.string().min(10).max(10).required(),
    timings: JOI.object().required(),
  },
});

const validate = function (req, res, next) {
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }
  if (!moment(req.body.availability.day).isValid())
    return res.status(400).send("enter day in the YYYY-MM-DD format");
  if (moment(req.body.availability.day).isBefore(moment())) return res.status(400).send('cannot add the day before the current day')  
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

const addAvailabilityValidate = function (req, res, next) {
  const validation = addAvailabilitySchema.validate(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }
  if (!moment(req.body.availability.day).isValid())
    return res.status(400).send("enter day in the YYYY-MM-DD format");
  if (moment(req.body.availability.day).isBefore(moment())) return res.status(400).send('cannot add the day before the current day')
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

module.exports = {
  postValidate: validate,
  addAvailabilityVal: addAvailabilityValidate,
};
