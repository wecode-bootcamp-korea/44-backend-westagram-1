//service/postService.js

const postDao = require("../models/postDao");

const createPost = async (title, content, userId) => {
  const createPost = await postDao.createPost(title, content, userId);

  return createPost;
};

const getAllPost = async () => {
  const getAllPost = await postDao.getAllPost();

  return getAllPost;
};

const getUserPost = async (userId) => {
  const UserPost = await postDao.getUserPost(userId);

  return UserPost;
};

module.exports = {
  createPost,
  getAllPost,
  getUserPost,
};
