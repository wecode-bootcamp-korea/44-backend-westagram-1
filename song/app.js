require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");
const PORT = process.env.PORT;

const routers = require("./routers");

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialize");
  })
  .catch((err) => {
    console.error("에러", err);
    appDataSource.destroy();
  });
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(routers);
app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});
// 게시물 목록 조회
app.get("/postingList", async (req, res, next) => {
  const rows = await appDataSource.query(
    `SELECT
            users.id as userId,
            users.profile_image as userProfileImage,
            posts.user_id as postingId,
            posts.content as postingContent
            FROM posts LEFT JOIN users ON users.id = posts.user_id`
  );
  res.status(200).json({ data: rows });
});

app.get("/userPost", async (req, res, next) => {
  const { userId } = req.body;
  const rows = await appDataSource.query(
    `SELECT
          users.id as userId,
          users.profile_image as userProfileImage,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "postingId", posts.user_id,
              "postingContent", posts.content
            )
          ) as postings
          FROM posts
          INNER JOIN users
          ON posts.user_id = users.id WHERE users.id = ?
          GROUP BY users.id;
          `,
    [userId]
  );
  res.status(200).json({ data: rows });
});
// 회원가입
app.post("/signUp", async (req, res, next) => {
  const { name, email, profileImage, password } = req.body;

  await appDataSource.query(
    `INSERT INTO users(
      name,
      email,
      profile_image,
      password
    ) VALUES (?, ?, ?, ?) `,
    [name, email, profileImage, password]
  );
  res.status(201).json({ message: "userCreated" });
});
// 게시물 등록
app.post("/CreatePost", async (req, res, next) => {
  const { title, content, userId } = req.body;

  await appDataSource.query(
    `INSERT INTO posts(
      title,
      content,
      user_id
    ) VALUES (?, ?, ?)`,
    [title, content, userId]
  );
  res.status(201).json({ message: "postCreated" });
});
// 좋아요 기능
app.post("/like", async (req, res, next) => {
  const { userId, postId } = req.body;
  await appDataSource.query(
    `
    INSERT INTO likes(
      user_id,
      post_id
    ) VALUES (?, ?)
    `,
    [userId, postId]
  );

  res.status(201).json({ message: "likeCreated" });
});

app.patch("/posts", async (req, res) => {
  const { content, userId } = req.body;
  await appDataSource.query(
    `UPDATE posts
          SET 
          content = ?
          WHERE posts.user_id = ?
          `,
    [content, userId]
  );
  const update = await appDataSource.query(
    `SELECT
           users.id as userId,
           users.name as userName,
           posts.user_id as postingId,
           posts.title as postingTitle,
           posts.content as postingContent
           FROM users LEFT JOIN posts ON users.id = posts.user_id     
    `
  );

  res.status(201).json({ data: update });
});

app.delete("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  await appDataSource.query(
    `DELETE FROM posts
    WHERE posts.user_id = ?`,
    [postId]
  );
  res.status(204).send();
});

app.listen(PORT, function () {
  console.log(`server listening on port ${PORT}`);
});
