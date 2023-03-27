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
// 게시물 목록 조회
app.get("/list", async (req, res, next) => {
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
// 특정 유저가 작성한 게시물만 불러오는 api
// query 파라미터로 오는 데이터는 모두 string es) const {aa} = req.query
app.get("/post", async (req, res, next) => {
  const { userId } = req.body;
  const rows = await appDataSource.query(
    // const [rows] 를 한다면 출력값이 배열이 제거된 상태에서 출력된다.
    //하나를 호출할 경우
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
    // ? 는 mysql2에서 지원 ,? 를 권장한다.
  );
  res.status(200).json({ data: rows });
});
// 회원가입
app.post("/join", async (req, res, next) => {
  const { name, email, profileImage, password } = req.body;
  // 정보가 하나라도 없다면 true를 반환해 에러
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
app.post("/content", async (req, res, next) => {
  const { title, content, userId } = req.body;
  //회원가입과 마찬가지로 if문을 사용하여 에러 핸들링
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

  res.status(200).json({ message: "likeCreated" });
});

app.patch("/update", async (req, res, next) => {
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

  res.status(200).json({ data: update });
});

app.delete("/delete", async (req, res, next) => {
  const { userId } = req.body;
  await appDataSource.query(
    `DELETE FROM posts
    WHERE posts.user_id = ${userId}`
  );
  res.status(200).json({ message: "postingDelete" });
});

app.listen(PORT, function () {
  console.log(`server listening on port ${PORT}`);
});
