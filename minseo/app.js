const express = require("express");

require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");

const app = express();
const PORT = process.env.PORT;

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initalized!");
  })
  .catch((err) => {
    console.log("Error during Data source initialization", err);
    appDataSource.destroy();
  });

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

//health check
app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});

app.patch("/posts", async (req, res) => {
  const { userId, postsId, content } = req.body;
  await appDataSource.query(
    `UPDATE posts
      SET content = ?
     WHERE user_id =? AND posts.id =?`,
    [content, userId, postsId]
  );
  res.status(200).json({ message: "ok" });
});

app.delete("/posts/:postsId", async (req, res) => {
  const { postsId } = req.params;

  await appDataSource.query(
    `DELETE FROM posts
  WHERE posts.id = ${postsId}`
  );
  res.status(204);
});
app.post("/likes", async (req, res) => {
  const { userId, postId } = req.body;
  await appDataSource.query(
    `INSERT INTO likes(
			user_id,
			post_id)VALUES (?, ?);`,
    [userId, postId]
  );
  res.status(201).json({ message: "likeCreated" });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
