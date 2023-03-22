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
//모든 게시물보기
app.get("/user_posts", async (req, res) => {
  await appDataSource.query(
    `SELECT
      users.id AS userId,
      posts.id AS postingId,
      posts.content AS postingContent
      FROM users
      JOIN posts ON users.id = posts.user_id
      `,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});
//한 회원이 올린 게시물 보기
app.get("/posts", async (req, res) => {
  const { userId } = req.body;
  await appDataSource.query(
    `SELECT 
      users.id AS userId,
      users.profileImage AS userProfileImage,
      JSON_ARRAYAGG(JSON_OBJECT("postingId",posts.id,"postingImage",posts.postingImage,"postingContent",posts.content)) AS postings
      FROM users INNER JOIN posts ON users.id = posts.user_id WHERE users.id = ${userId} GROUP BY users.id
      `,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});
//회원가입
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
//게시물 등록
app.post("/posts", async (req, res) => {
  const { title, content, user_id } = req.body;

  await appDataSource.query(
    `INSERT INTO posts(
    title,
    content,
    user_id
  )VALUES(?, ?, ?);`,
    [title, content, user_id]
  );
  res.status(201).json({ message: "postCreated" });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
