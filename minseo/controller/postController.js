const postService = require('../service/postService');

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    userId = req.user;

    if (!userId || !title || !content) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await postService.createPost(userId, title, content);

    return res.status(201).json({ message: 'createPost_SUCCESS' });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const post = await postService.getAllPosts();

    return res.status(200).json({ post });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const getPostByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    const posts = await postService.getPostByUserId(userId);

    return res.status(200).json({ posts });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { userId, postId } = req.params;

    const { content } = req.body;

    if (!userId || !postId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    const post = await postService.updatePost(userId, postId, content);

    return res.status(200).json({ post });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { userId, postId } = req.params;

    if (!userId || !postId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    const post = await postService.deletePost(userId, postId);

    return res.status(200).json({ post });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostByUserId,
  updatePost,
  deletePost,
};
