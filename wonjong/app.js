require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const { DataSource } = require("typeorm");
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
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.err("Initialize Error", err);
  });

const app = express();
app.use(logger("combined"));
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

app.get("/ping", function (req, res) {
  return res.status(200).json({ message: "pong" });
});

app.post("/user", async (req, res) => {
  const { name, email, profileImage, password } = req.body;
  await appDataSource.query(
    `INSERT INTO users(
      name,
      email,
      profile_image,
      password) VALUES (?,?,?,?)`,
    [name, email, profileImage, password]
  );
  res.status(201).json({ message: "userCreated" });
});

app.post("/post", async (req, res) => {
  const { title, content, userID } = req.body;
  await appDataSource.query(
    `INSERT INTO posts(
      title,
      content,
      user_id) VALUES (?,?,?)
      `,
    [title, content, userID]
  );
  res.status(201).json({ message: "postCreated" });
});

app.get("/post", async (req, res) => {
  await appDataSource.query(
    `SELECT 
    u.id as userID,
    u.profile_image as userProfileImage,
    p.id as postingId,
    p.title as postingTitle,
    p.content as postingContent 
    FROM users u
    JOIN posts p ON u.id = p.user_id`,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});

app.get("/user", async (req, res) => {
  const { userId } = req.body;
  await appDataSource.query(
    `SELECT
      u.id as userId,
      u.profile_image as userProfileImage,
      (SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "postingID", p.id,
            "postingTitle", p.title,
            "postingContent", p.content
          )
        ) 
        ) as postings 
        FROM posts p
        JOIN users u ON p.user_id = u.id
        where p.user_id = ${userId}
        GROUP BY p.user_id;`,
    (err, rows) => {
      res.status(200).json({ data: rows });
    }
  );
});

app.listen(PORT, function () {
  console.log(`server listening on port ${PORT}`);
});
