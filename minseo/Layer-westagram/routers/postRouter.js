const express = require("express");
const postController = require("../controller/postController");

const router = express.Router();

router.post("/post", postController.posting);
router.get("/posts", postController.getPosts);
router.get("/user/posts/:userId", postController.userPosts);
router.patch("/:userId/:postId", postController.updatePost);
router.delete("/:userId/:postId", postController.deletePost);
module.exports = {
  router,
};
