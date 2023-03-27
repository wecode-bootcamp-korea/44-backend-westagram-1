//service/postService.js

const postDao = require("../models/postDao");

const register1234 = async (title, content, userId) => {
  const createPost = await postDao.createPost(title, content, userId);

  return createPost;
};

const register123 = async (title, content, userId) => {
  const createPost = await postDao.createPost(title, content, userId);

  return createPost;
};

const register12 = async (title, content, userId) => {
  const createPost = await postDao.createPost(title, content, userId);

  return createPost;
};

module.exports = {
  register,
};
