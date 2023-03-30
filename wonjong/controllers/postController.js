const postService = require('../services/postService');

const postUp = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await postService.createPost(title, content, userId);
    return res.status(201).json({
      message: 'POSTUP_SUCCESS',
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
    const { postId } = req.params;
    const { userId, title, content } = req.body;

    if (!userId || !postId || !title || !content) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    const result = await postService.patchPost(userId, postId, title, content);
    return res.status(200).json({
      result,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { userId, postId } = req.params;

    if (!userId || !postId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    const result = await postService.deletePost(userId, postId);
    return res.status(200).json({
      result,
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
