const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');
const saltRounds = 8;
const jwt = require('jsonwebtoken');

const signUp = async (name, email, password, profileImage) => {
  const pwValidation = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  );

  const emailValidation = new RegExp(
    '/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i'
  );

  if (!pwValidation.test(password) || !emailValidation.test(email)) {
    const err = new Error('PASSWORD_OR_EMAIL_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  const hashPassword = bcrypt.hashSync(password, saltRounds);

  const createUser = await userDao.createUser(
    name,
    email,
    hashPassword,
    profileImage
  );
  return createUser;
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const payLoad = { email: email };
    const secretKey = 'mySercetKey';
    const jwtToken = jwt.sign(payLoad, secretKey);

    return jwtToken;
  } else {
    const err = new Error('Invalid User');
    err.statusCode = 409;
    throw err;
  }
};

module.exports = {
  signUp,
  signIn,
};
