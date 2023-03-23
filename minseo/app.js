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
  WHERE posts.id = ?`,
    [postsId]
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

app.post("/posts", async (req, res) => {
  const { title, content, userId } = req.body;

  await appDataSource.query(
    `INSERT INTO posts(
    title,
    content,
    user_id
  )VALUES(?, ?, ?);`,
    [title, content, userId]
  );
  res.status(201).json({ message: "postCreated" });
});

app.get("/posts", async (req, res) => {
  const posts = await appDataSource.query(
    `SELECT
      users.id AS userId,
      posts.id AS postingId,
      posts.content AS postingContent
      FROM users
      JOIN posts ON users.id = posts.user_id
      `
  );

  res.status(200).json({ data: posts });
});
app.get("/user/posts", async (req, res) => {
  const { userId } = req.body;
  const userPosts = await appDataSource.query(
    `SELECT 
      users.id AS userId,
      users.profileImage AS userProfileImage,
      JSON_ARRAYAGG(JSON_OBJECT(
        "postingId",posts.id,
        "postingImage",posts.postingImage,
        "postingContent",posts.content))
         AS postings
      FROM users INNER JOIN posts ON users.id = posts.user_id WHERE users.id = ? GROUP BY users.id
      `,
    [userId]
  );
  res.status(200).json({ data: userPosts });
});

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  await appDataSource.query(
    `INSERT INTO users(
    name,
    email,
    password
  )VALUES(?, ?, ?);`,
    [name, email, password]
  );
  res.status(201).json({ message: "userCreated" });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
