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
  const createUser = await userDao.createUser(name, email, password, profileImage);
  return createUser;
};

const userAllPostView = async (useId) => {
  const userViewService = await userDao.userAllPostView(useId);
  return userViewService;
};


const checkPassword = async (email, password) => {
  const user = await userDao.loginCheckPassword(email);
  const passwordCheck = await bcrypt.compare(password, user.password);
  if (passwordCheck) {
    const payLoad = { email: email, id: user.id };
    const secretKey = process.env.KEY;
    const accessToken = jwt.sign(payLoad, secretKey);
    return accessToken;
  }
  const err = new Error('NOT_CORRECT');
  err.statusCode = 401;
  throw err;
};
module.exports = {
  signUp,
  userAllPostView,
  checkPassword,
};
