const { check, validationResult} = require("express-validator");
const express = require("express")
const router = express.Router();


const loginvalidator =
router.post("/login",
[ check('email', 'Plese Enter Valid Email').isEmail(),
  check('password','Password Lenght Must be 6 Char Long').isLength({ min: 6}) ],


// errors in validation
async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg
      });
    }
    next()
})

module.exports = loginvalidator