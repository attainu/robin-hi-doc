const jwt = require("jsonwebtoken");



module.exports = function(req, res, next) {
  const token = req.header('token');
  if (!token) return res.status(401).json({ message: 'token is required' });

  try {
    const decoded = jwt.verify(token, 'something');
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'invalid token' });
  }
};


