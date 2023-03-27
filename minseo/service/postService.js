const postDao = require('../models/postDao');

const posting = async (userId, title, content) => {
  const createPost = await postDao.createPost(userId, title, content);
  return createPost;
};

const getPosts = async () => {
  const posts = await postDao.getPosts();
  return posts;
};

const userPosts = async (userId) => {
  const posts = await postDao.userPosts(userId);
  return posts;
};

const updatePost = async (userId, postId, content) => {
  const post = await postDao.updatePost(userId, postId, content);
  return post;
};

const deletePost = async (userId, postId) => {
  const post = await postDao.deletePost(userId, postId);
  return post;
};

module.exports = {
  posting,
  getPosts,
  userPosts,
  updatePost,
  deletePost,
};
