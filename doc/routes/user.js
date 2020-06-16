const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const detect = require("../middelware/verification");


// User SignUp
const User = require("../model/User");

// user validation 
router.post('/signup',
  [ check("username", "please enter valid username").not().isEmpty(),
    check("email", "please enter valid email").isEmail(),
    check("password", "please enter valid password").isLength({min: 6}) ],

// errors in validation
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg
      });
    }
  
    // detect same user by email
    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }

      // password hashing
      user = new User({ username, email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

     // save user in database
      await user.save();
      res.send("User Registerd Succesfully")

     // error in saving user
    } catch (err) {
      console.log(err.message);
      res.status(500).send("error in saving");
    }
  }
);


// user login

router.post('/login',
  [ check('email', 'plese enter valid email').isEmail(),
    check('password','Please Enter Valid Password').isLength({ min: 6}) ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg
      });
    }

  const { email, password } = req.body;
  try{
    let user = await User.findOne({
      email
    });
    if (!user)
    return res.status(400).json({
      message: 'user not exist'
    });
   
    // password hashing
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
    return res.status(400).json({
      message: 'wrong password'
    });
   
    // user authentication with jwt 
    const payload = {
      user: { id: user.id }
    };

    jwt.sign(
      payload,
      "something",
      {
        expiresIn: 3600
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  }catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'server error'
    });
  }
 }
);


// verification of User its loggedIN
router.get("/private", detect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.send({ message: "error during fetching user" });
  }
});



module.exports = router;
