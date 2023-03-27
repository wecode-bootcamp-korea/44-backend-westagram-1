const appDataSource = require('./appDataSource');

const createPost = async (title, content, userId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO posts (
                title,
                content,
                user_id
            ) VALUES (?, ?, ?);`,
      [title, content, userId]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const allPostViews = async () => {
  try {
    return await appDataSource.query(
      `SELECT 
            u.id as userID,
            u.profile_image as userProfileImage,
            p.id as postingId,
            p.title as postingTitle,
            p.content as postingContent 
            FROM users u
            JOIN posts p ON u.id = p.user_id`
    );
  } catch (err) {
    const error = new Error('DO_NOT_GET_DATA');
    error.statusCode = 500;
    throw error;
  }
};

const patchPost = async (postId, title, content) => {
  try {
    return await appDataSource.query(
      `UPDATE posts
      SET title = ?,
      content = ?
      WHERE  posts.id = ?;`,
      [title, content, postId]
    );
  } catch (err) {
    const error = new Error('DO_NOT_UPDATE_DATA');
    error.statusCode = 500;
    throw error;
  }
};

const deletePost = async (postId) => {
  try {
    return await appDataSource.query(
      `DELETE FROM posts
      WHERE posts.id = ?;`,
      [postId]
    );
  } catch (err) {
    const error = new Error('DO_NOT_UPDATE_DATA');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createPost,
  allPostViews,
  patchPost,
  deletePost,
};
