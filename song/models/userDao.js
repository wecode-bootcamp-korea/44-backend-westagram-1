const appDataSource = require("./appDataSource");

const createUser = async (name, email, profileImage, password) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
        name,
        email,
        profile_image,
        password
      ) VALUES (?, ?, ?, ?) `,
      [name, email, profileImage, password]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createUser,
};
