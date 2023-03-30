//service/postService.js

const postDao = require("../models/postDao");

const createPost = async (title, content, userId) => {
  return await postDao.createPost(title, content, userId);
};

const getAllPost = async () => {
  return await postDao.getAllPost();
};

const getUserPost = async (userId) => {
  const UserPost = await postDao.getUserPost(userId);

  return UserPost;
};

const updatePost = async (postingContent, id) => {
  const updatePost = await postDao.updatePost(postingContent, id);

  return updatePost;
};

const deletePost = async (id) => {
  const Deletion = await postDao.deletePost(id);

  return Deletion;
};

module.exports = {
  createPost,
  getAllPost,
  getUserPost,
  updatePost,
  deletePost,
};
