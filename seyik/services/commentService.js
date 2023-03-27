//service/commentService.js

const commentDao = require("../models/commentDao");

const product = async (content, userId, postId) => {
  const createcomment = await commentDao.createcomment(content, userId, postId);

  return createcomment;
};

module.exports = {
  product,
};
