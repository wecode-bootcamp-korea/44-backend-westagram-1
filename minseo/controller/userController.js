const userService = require('../service/userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await userService.signUp(name, email, password, profileImage);

    return res.status(201).json({ message: 'SIGNUP_SUCCESS' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.signIn(email);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'NO_YOUR_PROFILE' });
    }
    const payLoad = { email: email };
    const secretKey = process.env.SECRETKEY;
    let jwtToken = jwt.sign(payLoad, secretKey);

    return res.status(200).json({ accessToken: jwtToken });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = { signUp, signIn };
