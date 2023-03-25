//routes/index.js

const express = require("express");
const routes = express.Router();

const userRouter = require("./userRouter");
router.use("/users", userRouter.router);

module.exports = router;
