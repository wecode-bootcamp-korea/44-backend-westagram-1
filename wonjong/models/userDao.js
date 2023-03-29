const appDataSource = require('./appDataSource');

const createUser = async (name, email, password, profileImage) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
                name,
                email, 
                password,
                profile_image
                ) VALUES (?, ?, ?, ?);
            `,
      [name, email, password, profileImage]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    console.log(err);
    error.statusCode = 400;
    throw error;
  }
};

const userAllPostView = async (userId) => {
  try {
    const user = await appDataSource.query(
      `SELECT
      u.id as userId,
      u.profile_image as userProfileImage,
      (SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "postingID", p.id,
            "postingTitle", p.title,
            "postingContent", p.content
          )
        ) 
        ) as postings 
        FROM posts p
        JOIN users u ON p.user_id = u.id
        WHERE p.user_id = ?
        GROUP BY p.user_id;`,
      [userId]
    );
    return user;
  } catch (err) {
    const error = new Error('DO_NOT_GET_DATA');
    console.log(err);
    error.statusCode = 400;
    throw error;
  }
};

const loginCheckPassword = async (email) => {
  try {
    const [user] = await appDataSource.query(
      `SELECT 
      id,
      email,
      password
      FROM users 
      WHERE email = ?;`,
      [email]
    );
    console.log(user);
    return user;
  } catch (err) {
    const error = new Error('DO_NOT_GET_DATA');
    console.log(err);
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createUser,
  userAllPostView,
  loginCheckPassword,
};
