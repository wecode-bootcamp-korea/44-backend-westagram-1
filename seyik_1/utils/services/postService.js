const postDao = require('../models/postDao');
const { post } = require('../routes');

const createPost = async (title, content, userId) => {
  const createPost = await postDao.createPost(title, content, userId);
  return createPost;
};

const allPostViews = async () => {
  return await postDao.allPostViews();
};
const patchPost = async (postId, title, content) => {
  const createPost = await postDao.patchPost(postId, title, content);
  return createPost;
};

const deletePost = async (postId) => {
  const deletePostIdAll = await postDao.deletePost(postId);
  return deletePostIdAll;
};
module.exports = {
  createPost,
  allPostViews,
  patchPost,
  deletePost,
};
