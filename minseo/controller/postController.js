const postService = require('../service/postService');

const posting = async (req, res) => {
  try {
    const { userId, title, content } = req.body;
    if (!userId || !title || !content) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    await postService.posting(userId, title, content);

    return res.status(201).json({ message: 'POSTING_SUCCESS' });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const post = await postService.getPosts();

    return res.status(200).json({ post });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const userPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    const posts = await postService.userPosts(userId);

    return res.status(200).json({ posts });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
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
    return res.status(err.statusCode || 500).json({ message: err.message });
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
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  posting,
  getPosts,
  userPosts,
  updatePost,
  deletePost,
};
