const appDataSource = require("./appDataSource");

const postingLoad = async () => {
  try {
    return await appDataSource.query(
      `SELECT
              users.id as userId,
              users.profile_image as userProfileImage,
              posts.id as postingId,
              posts.content as postingContent
              FROM posts 
              JOIN users ON users.id = posts.user_id`
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const userPosting = async (userId) => {
  try {
    return await appDataSource.query(
      `SELECT
            users.id as userId,
            users.profile_image as userProfileImage,
            JSON_ARRAYAGG(
              JSON_OBJECT(
                "postingId", posts.user_id,
                "postingContent", posts.content
              )
            ) as postings
            FROM posts
            INNER JOIN users
            ON posts.user_id = users.id WHERE users.id = ?
            GROUP BY users.id;
            `,
      [userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error = statusCode(400);
    throw error;
  }
};

const createPosting = async (title, content, userId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO posts(
        title,
        content,
        user_id
      ) VALUES (?, ?, ?)`,
      [title, content, userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const modify = async (content, userId) => {
  try {
    return (
      `UPDATE posts
            SET
            content = ?
            WHERE posts.user_id = ?
    `,
      [content, userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const remove = async (postId) => {
  try {
    return await appDataSource.query(
      `DELETE FROM posts
      WHERE posts.id = ?`,
      [postId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createPosting,
  postingLoad,
  userPosting,
  modify,
  remove,
};
