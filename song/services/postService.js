const postDao = require("../models/postDao");

const postingList = async () => {
  return postDao.postingLoad();
};

const userPosting = async (userId) => {
  return postDao.userPosting(userId);
};

const createPost = async (title, content, userId) => {
  return postDao.createPosting(title, content, userId);
};

const modify = async (content, userId) => {
  return postDao.modify(content, userId);
};

const remove = async (postId) => {
  return postDao.remove(postId);
};

module.exports = {
  createPost,
  postingList,
  userPosting,
  modify,
  remove,
};
