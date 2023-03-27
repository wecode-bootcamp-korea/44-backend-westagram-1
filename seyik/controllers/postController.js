//controller/postController.js

const postService = require("../services/postService");

const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.createPost(title, content, userId);
    return res.status(201).json({
      message: "Createpost_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const getAllPost = async (req, res) => {
  try {
    const post = await postService.getAllPost();

    return res.status(200).json({ post });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const getUserPost = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const data = await postService.getUserPost(userId);

    return res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getAllPost,
  getUserPost,
};
