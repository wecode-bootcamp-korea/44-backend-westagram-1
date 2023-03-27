const userDao = require('../models/userDao');

const signUp = async (name, email, password, profileImage) => {
  const pwValidation = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  );
  const emailValidation = new RegExp(
    '/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i'
  );
  if (!pwValidation.test(password) && !emailValidation.test(email)) {
    const err = new Error('PASSWORD_OR_EMAIL_IS_NOT_VALID');
    err.statusCode = 409;
    throw err;
  }
  const createUser = await userDao.createUser(
    name,
    email,
    password,
    profileImage
  );
  return createUser;
};

module.exports = {
  signUp,
};
