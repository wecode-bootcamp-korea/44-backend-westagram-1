//controller/postController.js

const postService = require("../services/postService");

const register = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.register(title, content, userId);
    return res.status(201).json({
      message: "REGISTER_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postService = require("../services/postService");

const allRegister = async (req, res) => {
  try {
    const {
      userId,
      userProfileImage,
      postingId,
      postingImageUrl,
      postingContent,
    } = req.body;

    if (
      !userId ||
      !userProfileImage ||
      !postingId ||
      !postingImageUrl ||
      !postingContent
    ) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.allregister(
      userId,
      userProfileImage,
      postingId,
      postingImageUrl,
      postingContent
    );
    return res.status(201).json({
      message: "ALL_REGISTER_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  register,
  allRegister,
};
