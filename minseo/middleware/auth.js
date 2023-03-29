const userDao = require('../models/userDao');
const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ message: 'NOT_CHECKIN' });
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);

    req.user = decoded.payLoad.id;
    console.log(req.user);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateToken;
