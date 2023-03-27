const express = require("express");
const likesController = require("../controller/likesController");

const router = express.Router();
router.post("/likes", likesController.likes);

module.exports = {
  router,
};
