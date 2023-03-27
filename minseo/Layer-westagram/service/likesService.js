const likesDao = require("../models/likesDao");

const likes = async (userId, postId) => {
  const likes = await likesDao.createlikes(userId, postId);
  return likes;
};
module.exports = {
  likes,
};
