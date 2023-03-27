//service/likeService.js

const likeDao = require("../models/likeDao");

const liker = async (userId, postId) => {
  const createlike = await likeDao.createLike(userId, postId);

  return createlike;
};

module.exports = {
  liker,
};
