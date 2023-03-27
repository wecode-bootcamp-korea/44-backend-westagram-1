//service/postService.js

const postDao = require("../models/postDao");

const creatPosts = async (title, content, userId) => {
  const createPost = await postDao.createPost(title, content, userId);

  return createPost;
};

const allPost = async (
  userId,
  userProfileImage,
  postingId,
  postingImageUrl,
  postingContent
) => {
  const createPost = await postDao.createPost(
    userId,
    userProfileImage,
    postingId,
    postingImageUrl,
    postingContent
  );

  return createPost;
};

const userPost = async (
  userId,
  userProfileImage,
  postingId,
  postingImageUrl,
  postingContent
) => {
  const createPost = await postDao.createPost(
    userId,
    userProfileImage,
    postingId,
    postingImageUrl,
    postingContent
  );

  return createPost;
};

module.exports = {
  creatPosts,
  allPost,
  userPost,
};
