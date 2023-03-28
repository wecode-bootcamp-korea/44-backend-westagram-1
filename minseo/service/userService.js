const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');
const saltRounds = 8;

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
  const makeHash = async (pass, saltRounds) => {
    return await bcrypt.hash(pass, saltRounds);
  };
  const hashPassword = await makeHash(password, saltRounds);

  const createUser = await userDao.createUser(name, email, hashPassword);
  return createUser;
};

module.exports = {
  signUp,
};
