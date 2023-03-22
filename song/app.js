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

app.post("/join", async (req, res, next) => {
  const { id, name, email, profile_image, password } = req.body;

  await appDataSource.query(
    `INSERT INTO users(
      id,
      name,
      email,
      profile_image,
      password
    ) VALUES (?, ?, ?, ?, ?) `,
    [id, name, email, profile_image, password]
  );
  res.status(200).json({ message: "userCreated" });
});

app.listen(3000, function () {
  console.log("server listening on port 3000");
});
