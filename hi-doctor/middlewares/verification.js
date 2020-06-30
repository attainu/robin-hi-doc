const jwt = require("jsonwebtoken");

//Verify Token
module.exports = (req, res, next) => {
  try {
    //Get token from headers
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];

    //If token is present check if the token is valid
    if (token) {
      //Get the data
      const data = jwt.verify(token, "something");
      console.log(data);

      //Add _id to req
      req._id = data._doc._id;
      req._data = data._doc;

      next();
    } else {
      throw new Error("Invalid Token");
    }
  } catch (e) {
    console.log(e);
    next({
      message: e.message,
      stack: e.stack,
    });
  }
};


