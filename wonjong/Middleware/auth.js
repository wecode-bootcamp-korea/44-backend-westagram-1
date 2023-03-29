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
    res.status(403).json({
      message: 'TOKEN_KEY_NOT_CORRECT',
    });
  }
};

module.exports = validationToken;
