const userService = require('../service/userService');

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await userService.signUp(name, email, password);

    return res.status(201).json({ message: 'SIGNUP_SUCCESS' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = { signUp };
