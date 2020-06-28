const JOI = require("@hapi/joi");

const post_schema = JOI.object({
  username: JOI.string().alphanum().min(5).max(25).required(),
  email: JOI.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: JOI.string().alphanum().min(5).max(25).required(),
});

const patch_schema = JOI.object({
  username: JOI.string().alphanum().min(5).max(25),
  email: JOI.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: JOI.string().alphanum().min(5).max(25),
});

const Validation = {
  postVal: function (req, res, next) {
    const val = patch_schema.validate(req.body);
    if (val.error) return res.status(400).send(val.error.details[0].message);
    next();
  },
  patchVal: function (req, res, next) {
    const val = post_schema.validate(req.body);
    if (val.error) return res.status(400).send(val.error.details[0].message);
    next();
  },
};

module.exports = Validation;
