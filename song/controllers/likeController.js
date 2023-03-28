const likeService = require("../services/likeService");

const like = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    if (!userId || !postId) {
      return res.status(400).json({ message: "Key Error" });
    }

    await likeService.like(userId, postId);
    return res.status(201).json({ message: "Create Like" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
  like,
};
