const userDao = require('../models/userDao');

const validateToken = async (req, res, next) => {
  try {
    const secretKey = process.env.SECRETKEY;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secretKey);
    const getEmail = userDao.getUserByEmail(decoded.email);

    if (!getEmail) {
      return res.status(400).json({ message: 'NOT' });
    }
    req.user = user.id;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateToken;
