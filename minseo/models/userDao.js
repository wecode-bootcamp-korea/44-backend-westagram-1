const appDataSource = require('./appDataSource');

const createUser = async (name, email, hashPassword) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
        name,
        email,
        password
      )VALUES(?, ?, ?);`,
      [name, email, hashPassword]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const [user] = await appDataSource.query(
      `SELECT 
      id,
      email,
      password
      FROM users
      WHERE users.email = ?`,
      [email]
    );
    return user;
  } catch (err) {
    const error = new Error('INVALID_DATA_OUTPUT');
    error.statusCode = 409;
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
};
