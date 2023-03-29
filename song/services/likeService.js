const likeDao = require("../models/likeDao");

const like = async (userId, postId) => {
  return likeDao.like(userId, postId);
};

module.exports = {
  like,
};
