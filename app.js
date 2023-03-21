const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initalized!");
  })
  .catch((er) => {
    console.log("Error during Data source initialization", err);
    myDataSource.destroy();
  });

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

//health check
app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});
//회원가입한 사람 리스트확인
app.get("/users", async (req, res) => {
  await myDataSource.query(
    `SELECT
      *
    FROM users;`,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});
//회원가입
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  await myDataSource.query(
    `INSERT INTO users(
    name,
    email,
    password
  )VALUES(?, ?, ?);`,
    [name, email, password]
  );
  res.status(201).json({ message: "userCreated" });
});

//포스팅
app.post("/posts", async (req, res) => {
  const { title, content, user_id } = req.body;

  await myDataSource.query(
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
