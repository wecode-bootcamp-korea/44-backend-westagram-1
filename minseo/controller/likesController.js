const likesService = require('../service/likesService');

const createLikes = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await likesService.createLikes(userId, postId);

    return res.status(201).json({ message: 'CREATE_LIKES' });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};
module.exports = { createLikes };
