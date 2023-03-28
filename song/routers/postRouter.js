const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/postinglist", postController.postingList);
router.get("/userposting/:userId", postController.userPosting);

router.post("/createpost", postController.createPost);
router.patch("/modify/:userId", postController.modify);
router.delete("/remove/:postId", postController.remove);

module.exports = {
  router,
};
