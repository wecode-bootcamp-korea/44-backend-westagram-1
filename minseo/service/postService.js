const postDao = require('../models/postDao');

const createPost = async (userId, title, content) => {
  const createPost = await postDao.createPost(userId, title, content);
  return createPost;
};

const getAllPosts = async () => {
  const posts = await postDao.getAllPosts();
  return posts;
};

const getPostByUserId = async (userId) => {
  const posts = await postDao.getPostByUserId(userId);
  return posts;
};

const updatePost = async (userId, postId, content) => {
  const post = await postDao.updatePost(userId, postId, content);

  if (post.length == 0) {
    const err = new Error('니 게시물 아니야~~~');
    err.statusCode = 401;
    throw err;
  }
  return post;
};

const deletePost = async (userId, postId) => {
  const post = await postDao.deletePost(userId, postId);

  if (post.affectedRows == 0) {
    const err = new Error('니 게시물아니야 ~ 권한 없음');
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
