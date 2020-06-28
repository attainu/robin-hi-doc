const JOI = require("@hapi/joi");

const schema = JOI.object({
  email: JOI.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: JOI.string().alphanum().min(5).max(25).required(),
});

const Validation = function (req, res, next) {
  const val = schema.validate(req.body);
  if (val.error) return res.status(400).send(val.error.details[0].message);
  next();
};

module.exports = Validation;
