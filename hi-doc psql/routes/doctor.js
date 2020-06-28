const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const verify = require("../middlewares/verification");

// Patient SignUp
const Doctor = require("../model/Doctor");

// doctor signup validation
router.post(
  "/signup",
  [
    check("username", "please enter valid username").not().isEmpty(),
    check("email", "please enter valid email").isEmail(),
    check("password", "Password Lenght Must be 6 Char Long").isLength({
      min: 6,
    }),
  ],

  // errors in validation
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }

    // detect same doctor info by email
    const { username, email, password } = req.body;
    try {
      let doctor = await Doctor.findOne({ email });
      if (doctor) {
        return res.status(400).json({
          msg: "doctor Data Already Exists",
        });
      }

      // password hashing
      doctor = new Doctor({ username, email, password });

      const salt = await bcrypt.genSalt(10);
      doctor.password = await bcrypt.hash(password, salt);

      // save doctor data in database
      await doctor.save();
      res.send("Doctor Registerd Succesfully");

      // error in saving user
    } catch (err) {
      console.log(err.message);
      res.status(500).send("error in saving");
    }
  }
);

// doctor login

router.post(
  "/login",
  [
    check("email", "plese enter valid email").isEmail(),
    check("password", "Password Lenght Must be 6 Char Long").isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }

    const { email, password } = req.body;
    try {
      let doctor = await Doctor.findOne({
        email,
      });
      if (!doctor)
        return res.status(400).json({
          message: "Doctor Not Exist",
        });

      // password hashing
      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Wrong Password",
        });

      // authentication with jwt
      const payload = {
        doctor: { id: doctor.id },
      };
      console.log(doctor);
      jwt.sign(
        { ...doctor },
        "something",
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) console.log(err);
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "server error",
      });
    }
  }
);

// verification of doctor it's loggedIN
router.get("/private", verify, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req._id }).populate("profileID");
    res.json(doctor);
  } catch (err) {
    res.send({ message: err.message });
  }
});

// updating information
router.patch("/update/:id", verify, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    hashedpassword = await bcrypt.hash(req.body.password, salt);
    await Doctor.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: hashedpassword,
      },
    });
    // res.send('doctor information updated Succesfully');
    res.json("Doctor Information Updated Succesfully");
  } catch (err) {
    res.json({ message: err });
    // res.json("error")
  }
});

// delete account information
router.delete("/delete/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndRemove(req.params.id);
    res.json("Account Data Removed Suceesfully");
  } catch (err) {
    // res.json({ message: err })
    res.json("Error in Removing Data");
  }
});

module.exports = router;
