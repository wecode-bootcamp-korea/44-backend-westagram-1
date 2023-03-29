const postDao = require('../models/postDao');

const createPost = async (title, content, userId) => {
  const createPost = await postDao.createPost(title, content, userId);
  return createPost;
};

const allPostViews = async () => {
  return await postDao.allPostViews();
};
const patchPost = async (userId, postId, title, content) => {
  const createPost = await postDao.patchPost(userId, postId, title, content);
  if (createPost.affectedRows === 0) {
    const error = new Error('YOU_NOT_RIGHT_USER');
    error.statusCode = 401;
    throw error;
  }
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
