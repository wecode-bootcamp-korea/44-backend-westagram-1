const appDataSource = require("./appDataSource");

const like = async (userId, postId) => {
  try {
    return await appDataSource.query(
      `
      INSERT INTO likes(
        user_id,
        post_id
      ) VALUES (?, ?)
      `,
      [userId, postId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  like,
};
