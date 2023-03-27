require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
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
    console.log("Data Source has been initialize");
  })
  .catch((err) => {
    console.error("Error during Data Source initialize", err);
    appDataSource.destroy();
  });

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/ping", function (req, res) {
  res.status(200).json({ message: "pong" });
});

app.get("/allposts", async (req, res) => {
  const rows = await appDataSource.query(
    `SELECT 
  users.id as userId,
  users.profile_image as userProfileImage,
  posts.id as postingId,
  posts.title as postingImageUrl,
  posts.content as postingContent
  FROM posts
  JOIN users ON posts.user_id = users.id
`
  );

  res.status(200).json({ data: rows });
});

app.get("/userposts", async (req, res) => {
  const { oneUserId } = req.body;
  const rows = await appDataSource.query(
    `SELECT 
  users.id as userId,
  users.profile_image as userProfileImage,
  (SELECT
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "postingId", posts.id,
          "postingImageUrl", posts.title,
          "postingContent", posts.content
        )
      )
      )as postings
    FROM users
    JOIN posts 
    ON users.id = posts.user_id
    WHERE posts.user_id = ?
    
`,
    [oneUserId]
  );
  res.status(200).json({ data: rows });
});

app.post("/users/signup", async (req, res) => {
  const { name, email, profileImage, password } = req.body;
  await appDataSource.query(
    `INSERT INTO users(
          name, 
          email,
          profile_image,
          password
      ) VALUES (?, ?, ?, ?);
      `,
    [name, email, profileImage, password]
  );

  res.status(201).json({ message: "userCreated" });
});

app.post("/posts/register", async (req, res) => {
  const { title, content, userId } = req.body;

  await appDataSource.query(
    `INSERT INTO posts(
          title,
          content,
          user_id
      ) VALUES (?, ?, ?);
      `,
    [title, content, userId]
  );

  res.status(201).json({ message: "postCreated" });
});

app.patch("/modify", async (req, res) => {
  const { postingContent, user_id } = req.body;

  await appDataSource.query(
    `UPDATE posts
    SET
    content = ?
    WHERE posts.user_id = ? 
    `,
    [postingContent, user_id]
  );
  const rows = await appDataSource.query(
    `SELECT 
      users.id as userId,
      users.name as userName,
      posts.id as postingId,
      posts.title as postingTitle,
      posts.content as postingContent
      FROM users LEFT JOIN posts
      ON posts.user_id = users.id
  `
  );
  res.status(200).json({ data: rows });
});

app.delete("/postsdelete", async (req, res) => {
  const { postId } = req.body;
  await appDataSource.query(
    `DELETE
    FROM posts
    WHERE posts.id = ${postId}
    `
  );
  res.status(200).json({ message: "postingDeleted" });
});

app.post("/like", async (req, res) => {
  const { userId, postId } = req.body;

  await appDataSource.query(
    `INSERT INTO likes(
          user_id,
          post_id
      ) VALUES (?, ?);
      `,
    [userId, postId]
  );

  res.status(200).json({ message: "likeCreated" });
});

app.listen(PORT, function () {
  console.log(`server listening on port ${PORT}`);
});
