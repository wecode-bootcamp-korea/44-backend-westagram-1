const likeService = require('../services/likeService');

const createLike = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    if (!userId || !postId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    await likeService.createLike(userId, postId);
    return res.status(201).json({
      message: 'Likes!',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createLike,
};
