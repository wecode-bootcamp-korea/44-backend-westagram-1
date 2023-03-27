//model/likeDao.js

const appDataSource = require("./appDataSource");

const createLikes = async (userId, postId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO likes( 
        userId,
        postId
    ) VALUES (?, ?);
    `,
      [userId, postId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createLikes,
};
