//model/postDao.js

const { DaoSource, DataSource } = require("typeorm");

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
    appDataSource.destroy();
  });

const createPost = async (title, content, userId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO posts(
        title, 
        content,
        userId,
    ) VALUES (?, ?, ?);
    `,
      [title, content, userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const allPost = async (
  userId,
  userProfileImage,
  postingId,
  postingImageUrl,
  postingContent
) => {
  try {
    return await appDataSource.query(
      `SELECT
    users.id as userId,
    users.profile_image as userProfileImage,
    posts.id as postingId,
    posts.title as postingImageUrl,
    posts.content as postingContent
    FROM posts
    JOIN users ON posts.user_id = users.id
    `,
      [userId, userProfileImage, postingId, postingImageUrl, postingContent]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_SELECT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createPost,
  allPost,
};
