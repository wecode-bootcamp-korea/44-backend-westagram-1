//routes/userRouter.js

const express = require("express");
const userController = require("../controllers/userController");

const routes = express.Router();

router.post("/signup", userController.signUp);

module.exports = {
  router,
};
