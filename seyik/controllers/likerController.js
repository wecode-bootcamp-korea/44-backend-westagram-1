//controller/likeController.js

const likeService = require("../services/likeService");

const liker = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    if (!userId || !postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await likeService.liker(userId, postId);
    return res.status(201).json({
      message: "LIKER_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  liker,
};
