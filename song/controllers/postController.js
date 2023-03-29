const postService = require("../services/postService");

const postingList = async (req, res) => {
  try {
    const post = await postService.postingList();
    return res.status(200).json({ post });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 404).json({ message: "Page Error" });
  }
};

const userPosting = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Key Error" });
    }
    const post = await postService.userPosting(userId);
    return res.status(200).json({ post });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 404).json({ message: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ message: "Key Error" });
    }

    await postService.createPost(title, content, userId);
    return res.status(201).json({ message: "Create Post!" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const modify = async (req, res) => {
  try {
    const { userId } = req.params;
    const { content } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Key Error" });
    }

    const postModify = await postService.modify(content, userId);
    return res.status(201).json({ postModify });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "Key Error" });
    }
    await postService.remove(postId);
    return res.status(200).json({ message: "Success Delete" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  postingList,
  userPosting,
  modify,
  remove,
};
