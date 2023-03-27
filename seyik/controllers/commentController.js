//controller/commentController.js

const commentService = require("../services/commentService");

const product = async (req, res) => {
  try {
    const { content, userId, postId } = req.body;

    if (!content || !userId || !postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await commentService.product(content, userId, postId);
    return res.status(201).json({
      message: "PRODUCT_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  product,
};
