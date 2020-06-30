const Doctor = require("../model/Doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports = {

// Doctor signup
async DoctorRegister(req, res){
        try {
           // detect same doctor by email
        const { username, email, password } = req.body;
       

        let doctor = await Doctor.findOne({ email });
           if (doctor) {
           return res.status(400).json({
             msg: "Doctor Data Already Exists",
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
},


// Doctor login 
async DoctorLogin(req, res) {
    const { email, password } = req.body;
    try {

    let doctor = await Doctor.findOne({email,});

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
          if (err) throw err;
          res.status(200).json({ msg:'login sucessfull', token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "server error",
      });
    }
},



// get Doctor info logged in or not
async Doctorinfo (req, res) {
    try {
    const doctor = await Doctor.findOne({ _id: req._id }).populate("profileID");
      res.json(doctor);
    } catch (err) {
      res.send({ message: err.message });
    }
},



// update Doctor information

async UpdateDoctor(req, res)  {
    try{
    const salt = await bcrypt.genSalt(10);
    hashedpassword = await bcrypt.hash(req.body.password, salt);
    await Doctor.findByIdAndUpdate(req.params.id, {$set: { username: req.body.username, email: req.body.email, password: hashedpassword, }});
      res.json('Doctor information updated Succesfully');
    }catch(err){
      res.json({ message: err })
      // res.json("error")
    }    
},




// delete Doctor data
async DeleteDoctor(req, res) {
    try{
    await Doctor.findByIdAndRemove(req.params.id);
      res.json('Account Removed Suceesfully')
    }catch (err) {
      // res.json({ message: err })
      res.json('Error in Removing Data')
    }
  }
  

  
}