const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const verify = require("../middlewares/verification");



// Patient SignUp
const Patient = require("../model/Patient");

// Patient Validation 
router.post('/signup',
  [ check("username", "please enter valid username").not().isEmpty(),
    check("email", "please enter valid email").isEmail(), 
    check("password", "Password Lenght Must be 6 Char Long").isLength({min: 6}) ],

// errors in validation
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg
      });
    }
  
    // detect same Patient by email
    const { username, email, password } = req.body;
    try {
      let patient= await Patient.findOne({ email });
      if (patient) {
        return res.status(400).json({
          msg: "Patient Already Exists"
        });
      }

      // password hashing
      patient = new Patient({ username, email, password });

      const salt = await bcrypt.genSalt(10);
      patient.password = await bcrypt.hash(password, salt);

     // save Patient data in database
      await patient.save();
      res.send("Patient Registerd Succesfully")

     // error in saving user
    } catch (err) {
      console.log(err.message);
      res.status(500).send("error in saving");
    }
  }
);


// Patient login

router.post('/login',
  [ check('email', 'Plese Enter Valid Email').isEmail(),
    check('password','Password Lenght Must be 6 Char Long').isLength({ min: 6}) ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg
      });
    }

  const { email, password } = req.body;
  try{
    let patient = await Patient.findOne({
      email
    });
    if (!patient)
    return res.status(400).json({
      message: 'Patient Not Exist'
    });
   
    // password hashing
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch)
    return res.status(400).json({
      message: 'Wrong Password'
    });
   
    // user authentication with jwt 
    const payload = {
      patient: { id: patient.id }
    };

    jwt.sign(
      {...patient},
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


// verification of Patient its loggedIN 
router.get("/private", verify, async (req, res) => {
  try {
    const patient = await Patient.findOne({_id: req._id}).populate('profileID');
    res.json(patient);
  } catch (err) {
    res.send({ message: err.message });
  }
});


// Patient information
router.patch('/update/:id', verify, async (req, res) => {
  try{
  const salt = await bcrypt.genSalt(10);
  hashedpassword = await bcrypt.hash(req.body.password, salt);
  await Patient.findByIdAndUpdate(req.params.id, {$set: {username: req.body.username, email:req.body.email, password:hashedpassword}})
    // res.send('Patient information updated Succesfully');
    res.json('Patient information updated Succesfully');
  }catch(err){
    res.json({ message: err })
    // res.json("error")
  }    
})


// delete Patient data
router.delete('/delete/:id', verify, async (req, res) => {
  try{
    await Patient.findByIdAndRemove(req.params.id);
    res.json('Account Removed Suceesfully')
  }catch (err) {
    // res.json({ message: err })
    res.json('Error in Removing Data')
  }
})



module.exports = router;
