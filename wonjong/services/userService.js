const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (name, email, password, profileImage) => {
  // password validation using REGEX
  const pwValidation = new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})');
  const emailValidation = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!pwValidation.test(password) || !emailValidation.test(email)) {
    const err = new Error('PASSWORD_OR_EMAIL_NOT_VALID');
    console.log(err);
    err.statusCode = 409;
    throw err;
  }
  const saltRounds = 12;
  const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
  };
  password = await makeHash(password, saltRounds);
  return await userDao.createUser(name, email, password, profileImage);
};

const userAllPostView = async (useId) => {
  return await userDao.userAllPostView(useId);
};

const singIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);
  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    const err = new Error('PASSWORD_NOT_CORRECT');
    err.statusCode = 401;
    throw err;
  }
  const payLoad = { email: email, id: user.id };
  const secretKey = process.env.KEY;
  const accessToken = jwt.sign(payLoad, secretKey);
  return accessToken;
};
module.exports = {
  signUp,
  userAllPostView,
  singIn,
};
