const appDataSource = require("./appDataSource");

const createPost = async (userId, title, content) => {
  try {
    return await appDataSource.query(
      `INSERT INTO posts(
        user_Id,
        title,
        content
      )VALUES(?,?,?);`,
      [userId, title, content]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getPosts = async () => {
  try {
    const posts = await appDataSource.query(
      `SELECT
      users.id AS userId,
      posts.id AS postingId,
      posts.content AS postingContent
      FROM posts
      JOIN users ON users.id = posts.user_id;
      `
    );
    return posts;
  } catch (err) {
    const error = new Error("INVALID_DATA_OUTPUT");
    error.statusCode = 500;
    throw error;
  }
};

const userPosts = async (userId) => {
  try {
    const posts = await appDataSource.query(
      `SELECT 
    users.id AS userId,
    users.profile_image AS userProfileImage,
    JSON_ARRAYAGG(JSON_OBJECT("postingId",posts.id,
    "postingContent",posts.content)) AS postings
    FROM users INNER JOIN posts ON users.id = posts.user_id 
    WHERE users.id = ? GROUP BY users.id;
    `,
      [userId]
    );
    return posts;
  } catch (err) {
    const error = new Error("INVALID_DATA_USERPOSTS");
    error.statusCode = 500;
    throw error;
  }
};

const updatePost = async (userId, postId, content) => {
  try {
    await appDataSource.query(
      `UPDATE posts
      SET content = ?
     WHERE user_id =? AND posts.id =?;`,
      [content, userId, postId]
    );
    const post = await appDataSource.query(
      `SELECT 
    users.id AS userId,
    users.profile_image AS userProfileImage,
    JSON_ARRAYAGG(JSON_OBJECT(
    "postingId",posts.id,
    "postingContent",posts.content
    )) AS postings
    FROM users INNER JOIN posts ON users.id = posts.user_id
    WHERE users.id = ? AND posts.id= ? GROUP BY users.id;
    `,
      [userId, postId]
    );
    return post;
  } catch (err) {
    const error = new Error("INVALID_DATA_UPDATAPOST");
    error.statusCode = 500;
    throw error;
  }
};
const deletePost = async (userId, postId) => {
  try {
    return await appDataSource.query(
      `DELETE FROM posts
      WHERE posts.user_id = ?
      AND posts.id = ?`,
      [userId, postId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_DELETEPOST");
    error.statusCode = 500;
    throw error;
  }
};
module.exports = {
  createPost,
  getPosts,
  userPosts,
  updatePost,
  deletePost,
};
