//model/commentDao.js

const appDataSource = require("./appDataSource");

const createComments = async (content, userId, postId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO comments( 
        content,
        userId,
        postId
    ) VALUES (?, ?, ?);
    `,
      [content, userId, postId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createComments,
};
