const postDao = require('../models/postDao');

const createPost = async (userId, title, content) => {
  return postDao.createPost(userId, title, content);
};

const getAllPosts = async () => {
  return postDao.getAllPosts();
};

const getPostByUserId = async (userId) => {
  return postDao.getPostByUserId(userId);
};

const updatePost = async (userId, postId, content) => {
  const post = await postDao.updatePost(userId, postId, content);

  if (post.length == 0) {
    const err = new Error('NOT_YOUR_POST_CAN_NOT_UPDATE');
    err.statusCode = 401;
    throw err;
  }
  return post;
};

const deletePost = async (userId, postId) => {
  const post = await postDao.deletePost(userId, postId);

  if (post.affectedRows == 0) {
    const err = new Error('NOT_YOUR_POST_CAN_NOT_DELETE');
    err.statusCode = 401;
    throw err;
  }
  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostByUserId,
  updatePost,
  deletePost,
};
