//model/postDao.js

const appDataSource = require("./appDataSource");

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

const userPost = async (
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
  (SELECT
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "postingId", posts.id,
          "postingImageUrl", posts.title,
          "postingContent", posts.content
        )
      )
      )as postings
    FROM users
    JOIN posts 
    ON users.id = posts.user_id
    WHERE posts.user_id = ?
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
