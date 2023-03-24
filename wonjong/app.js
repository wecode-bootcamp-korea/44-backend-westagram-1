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

app.post('/user', async (req, res) => {
  const { name, email, profileImage, password } = req.body;
  await appDataSource.query(
    `INSERT INTO users(
      name,
      email,
      profile_image,
      password) VALUES (?,?,?,?)`,
    [name, email, profileImage, password]
  );
  res.status(201).json({ message: 'userCreated' });
});

app.post('/post', async (req, res) => {
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

app.get('/posts', async (req, res) => {
  await appDataSource.query(
    `SELECT 
    u.id as userID,
    u.profile_image as userProfileImage,
    p.id as postingId,
    p.title as postingTitle,
    p.content as postingContent 
    FROM users u
    JOIN posts p ON u.id = p.user_id`
  );
  res.status(200).json({ data: allPostsViews });
});

app.get('/user/post', async (req, res) => {
  const { userId } = req.body;
  const allUsersPostsViews = await appDataSource.query(
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
        WHERE p.user_id = ?
        GROUP BY p.user_id`,
    [userId]
  );
  res.status(200).json({ data: allUsersPostsViews });
});

app.patch('/post/patch', async (req, res) => {
  const { postId, title, content } = req.body;
  await appDataSource.query(
    `UPDATE posts
    SET title = ?,
    content = ?
    WHERE  posts.id = ?`,
    [title, content, postId]
  );
  res.status(201).json({ message: 'postPatch' });
});

app.delete('/post/delete', async (req, res) => {
  const { postId } = req.body;
  await appDataSource.query(
    `DELETE FROM posts 
    WHERE  posts.id = ${postId}`
  );
  res.status(200).json({ message: 'postingDeleted' });
});

app.post('/like', async (req, res) => {
  const { userId, postId } = req.body;
  await appDataSource.query(
    `INSERT INTO likes(
      user_id,
      post_id)  
      VALUES (?,?)`,
    [userId, postId]
  );
  res.status(201).json({ message: 'likeCreated' });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
