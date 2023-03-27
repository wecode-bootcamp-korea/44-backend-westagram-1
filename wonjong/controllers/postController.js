const postService = require('../services/postService');

const postUp = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    if (!title || !content || !userId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    await postService.createPost(title, content, userId);
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const allPostViews = async (req, res) => {
  try {
    const view = await postService.allPostViews();
    return res.status(200).json({
      DATA: view,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const patchPost = async (req, res) => {
  try {
    const { postId, title, content } = req.body;
    if (!postId || !title || !content) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    await postService.patchPost(postId, title, content);
    return res.status(200).json({
      message: 'PATCH_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    await postService.deletePost(postId);
    return res.status(200).json({
      message: 'DELETE_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  postUp,
  allPostViews,
  patchPost,
  deletePost,
};
