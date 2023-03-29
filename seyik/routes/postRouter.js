//routes/postRouter.js

const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/createPost", postController.createPost);
router.get("/getAllPost", postController.getAllPost);
router.get("/getUserPost/:userId", postController.getUserPost);
router.patch("/updatePost/", postController.updatePost);
router.delete("/deletePost/:id", postController.deletePost);

module.exports = {
  router,
};
