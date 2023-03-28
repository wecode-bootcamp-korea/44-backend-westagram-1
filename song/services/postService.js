const postDao = require("../models/postDao");

const postingList = async () => {
  const postingLoad = await postDao.postingLoad();
  return postingLoad;
};

const userPosting = async (userId) => {
  const userPosting = await postDao.userPosting(userId);
  return userPosting;
};

const createPost = async (title, content, userId) => {
  const createPosting = await postDao.createPosting(title, content, userId);
  return createPosting;
};

const modify = async (content, userId) => {
  const modify = await postDao.modify(content, userId);
  return modify;
};

const remove = async (postId) => {
  const remove = postDao.remove(postId);
  return remove;
};

module.exports = {
  createPost,
  postingList,
  userPosting,
  modify,
  remove,
};
