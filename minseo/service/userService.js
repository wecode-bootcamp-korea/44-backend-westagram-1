const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');
const saltRounds = 8;
const jwt = require('jsonwebtoken');

const signUp = async (name, email, password) => {
  const pwValidation = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  );

  const emailValidation = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!pwValidation.test(password) || !emailValidation.test(email)) {
    const err = new Error('PASSWORD_OR_EMAIL_IS_NOT_VALID');
    err.statusCode = 409;
    throw err;
  }

  const hashPassword = bcrypt.hashSync(password, saltRounds);

  const createUser = await userDao.createUser(name, email, hashPassword);
  return createUser;
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const payLoad = { email: email };
    const secretKey = process.env.SECRETKEY;
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
