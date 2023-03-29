const express = require("express");

const router = express.Router();

const likeController = require("../controllers/likeController");

router.post("/like", likeController.like);

module.exports = {
  router,
};
