const likesService = require("../service/likesService");

const likes = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await likesService.likes(userId, postId);

    return res.status(201).json({ message: "CREATE_LIKES" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};
module.exports = { likes };
