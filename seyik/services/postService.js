//service/postService.js

const postDao = require("../models/postDao");

const register = async (title, content, userId) => {
  const createPost = await postDao.createPost(title, content, userId);

  return createPost;
};

module.exports = {
  register,
};
