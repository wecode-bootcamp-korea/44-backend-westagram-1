//routes/likeRouter.js

const express = require("express");
const likeController = require("../controllers/likeController");

const router = express.Router();

router.post("/liker", likeController.liker);

module.exports = {
  router,
};
