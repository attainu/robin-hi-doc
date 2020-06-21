const JOI = require("@hapi/joi");

const schema = JOI.object({
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

const validate = function (req, res, next) {
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.send(validation.error.details[0].message);
  }
  next();
};
/*
have to create separate schema for update method in patientApointment.js in controller
since only req.body.appointmentRequest is the only property required and remaining all are
unnecessary (Note: follow the same schema as above but drop the usage of required for all
    except appointmentRequest property)
*/

module.exports = validate;
