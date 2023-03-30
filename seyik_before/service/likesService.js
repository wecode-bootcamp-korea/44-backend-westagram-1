const likesDao = require('../models/likesDao');

const createLikes = async (userId, postId) => {
  const likes = await likesDao.createlikes(userId, postId);
  return likes;
};
module.exports = {
  createLikes,
};
