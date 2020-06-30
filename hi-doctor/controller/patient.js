const Patient = require('../model/Patient')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports = {

// Patient signup
async PatientRegister(req, res){
    try {
       // detect same Patient by email
    const { username, email, password } = req.body;
   

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
      console.log(err)
      res.status(500).send("error in saving");
    }
  },

// Patient login 
async PatientLogin(req, res) {
  const { email, password } = req.body;
  try{

    let patient = await Patient.findOne({email});
    // console.log(patient)     // shows  data on console
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

   
    // Patient authentication with jwt 
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
          res.status(200).json({ msg:'login sucessfull', token });
        }
      );
   }catch (err) {
   console.error(err);
    res.status(500).json({
     message: 'server error'
   });
  }
  },


// get Patient info logged in or not
async Patientinfo (req, res) {
    try {
    const patient = await Patient.findOne({_id: req._id}).populate('profileID');
      res.json(patient);
    } catch (err) {
      res.send({ message: err.message });
    }
  },



  // update Patient information

async UpdatePatient(req, res)  {
  try{
  const salt = await bcrypt.genSalt(10);
  hashedpassword = await bcrypt.hash(req.body.password, salt);
  await Patient.findByIdAndUpdate(req.params.id, {$set: {username: req.body.username, email:req.body.email, password:hashedpassword}})
    res.json('Patient information updated Succesfully');
  }catch(err){
    res.json({ message: err })
    // res.json("error")
  }    
},




// delete Patient data
async DeletePatient(req, res) {
  try{
    await Patient.findByIdAndRemove(req.params.id);
    res.json('Account Removed Suceesfully')
  }catch (err) {
    // res.json({ message: err })
    res.json('Error in Removing Data')
  }
}



}




