const userDao = require('../models/userDao');
const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const user = await userDao.getUserByEmail(decoded.email);

    if (!user) {
      return res.status(400).json({ message: 'NOT_CHECKIN' });
    }
    req.user = user.id;
    console.log(user);

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateToken;
