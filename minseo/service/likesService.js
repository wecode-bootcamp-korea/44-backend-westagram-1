const likesDao = require('../models/likesDao');

const createLikes = async (userId, postId) => {
  return likesDao.createLikes(userId, postId);
};

module.exports = {
  createLikes,
};
