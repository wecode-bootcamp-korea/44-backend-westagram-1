//service/likeService.js

const likeDao = require("../models/likeDao");

const like = async (userId, postId) => {
  const newLike = await likeDao.like(userId, postId);

  return newLike;
};

module.exports = {
  like,
};
