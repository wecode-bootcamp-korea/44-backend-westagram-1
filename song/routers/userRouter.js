const express = require("express");

const userController = require("../controllers/userController");
const router = express.Router();
//app 대신 router
router.post("/signup", userController.signUp);

module.exports = {
  router,
};
