const likeDao = require("../models/likeDao");

const like = async (userId, postId) => {
  const like = await likeDao.like(userId, postId);
  return like;
};

module.exports = {
  like,
};
