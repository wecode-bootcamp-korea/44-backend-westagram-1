require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");
const PORT = process.env.PORT;

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
app.use(cors()); // 모든 통신이 cors 메소드를 통과해야지만 올바르게 동작되어 리스폰스를 쏴줄수 있다.
app.use(morgan("dev"));
app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});

app.get("/list", async (req, res, next) => {
  const rows = await appDataSource.query(
    `SELECT
            users.id as userId,
            users.profile_image as userProfileImage,
            posts.user_id as postingId,
            posts.content as postingContent
            FROM users LEFT JOIN posts ON users.id = posts.user_id`
  );
  res.status(200).json({ data: rows });
});

app.get("/post", async (req, res, next) => {
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

app.post("/join", async (req, res, next) => {
  const { name, email, profileImage, password } = req.body;

  await appDataSource.query(
    `INSERT INTO users(
      name,
      email,posts
      profile_image,
      password
    ) VALUES (?, ?, ?, ?) `,
    [name, email, profileImage, password]
  );
  res.status(201).json({ message: "userCreated" });
});

app.post("/content", async (req, res, next) => {
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

app.listen(PORT, function () {
  console.log(`server listening on port ${PORT}`);
});
