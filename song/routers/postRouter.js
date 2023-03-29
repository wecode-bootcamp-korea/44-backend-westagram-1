const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.get("", postController.postingList);
router.get("/userposting/:userId", postController.userPosting);

router.post("", postController.createPost);
router.patch("/:userId", postController.modify);
router.delete("/:postId", postController.remove);

module.exports = {
  router,
};
