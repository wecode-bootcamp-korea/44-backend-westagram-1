const jwt = require('jsonwebtoken');

const validationToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const secretKey = process.env.KEY;
    const decoded = jwt.verify(token, secretKey);
    req.params.userId = decoded.id;
    req.body.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({
      message: 'INVALID_TOKEN',
    });
  }
};

module.exports = validationToken;
