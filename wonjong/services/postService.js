const postDao = require('../models/postDao');

const createPost = async (title, content, userId) => {
  return await postDao.createPost(title, content, userId);
};

const allPostViews = async () => {
  return await postDao.allPostViews();
};

const patchPost = async (userId, postId, title, content) => {
  return await postDao.patchPost(userId, postId, title, content);
};

const deletePost = async (userId, postId) => {
  const deletePostIdAll = await postDao.deletePost(userId, postId);
  if (deletePostIdAll.affectedRows === 0) {
    const error = new Error('YOU_NOT_RIGHT_USER');
    error.statusCode = 401;
    throw error;
  }
};
module.exports = {
  createPost,
  allPostViews,
  patchPost,
  deletePost,
};
