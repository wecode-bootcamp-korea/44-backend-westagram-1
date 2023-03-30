const appDataSource = require('./appDataSource');

const createUser = async (name, email, password) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
        name,
        email,
        password
      )VALUES(?, ?, ?);`,
      [name, email, password]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    console.log(err);
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createUser,
};
