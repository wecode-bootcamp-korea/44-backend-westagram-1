const express = require("express");

require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const makeModules = require("./makeModules.js");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

//health check
app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});

app.patch("/posts", makeModules.updatePost);

app.delete("/posts/:postsId", makeModules.deletePost);
app.post("/likes", makeModules.likePost);

app.post("/posts", makeModules.createPost);

app.get("/posts", makeModules.getPost);
app.get("/user/posts", makeModules.getUserPost);

app.post("/users", makeModules.createUser);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
