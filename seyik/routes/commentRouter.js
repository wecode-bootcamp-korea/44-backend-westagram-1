//routes/commentRouter.js

const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.post("/product", commentController.product);

module.exports = {
  router,
};
