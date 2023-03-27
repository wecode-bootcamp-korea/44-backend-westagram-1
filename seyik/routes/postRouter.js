//routes/postRouter.js

const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/register", postController.register);
router.get("/posts/:");

module.exports = {
  router,
};
