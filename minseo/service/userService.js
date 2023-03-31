const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const signUp = async (name, email, password) => {
  const saltRounds = 8;
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

  if (!user) {
    const err = new Error('NOT_USER');
    err.statusCode = 401;
    throw err;
  }

  const ismatch = await bcrypt.compare(password, user.password);

  if (!ismatch) {
    const err = new Error('NOT_USER');
    err.statusCode = 401;
    throw err;
  }

  const id = user.id;
  const payLoad = { id: id };
  let jwtToken = jwt.sign({ payLoad }, process.env.SECRETKEY);

  return jwtToken;
};

module.exports = {
  signUp,
  signIn,
};
