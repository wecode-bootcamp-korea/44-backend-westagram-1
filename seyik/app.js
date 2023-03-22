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

app.use(express.json());
app.use(cors()); // 모든 통신이 cors 메소드를 통과해야지만 올바르게 동작되어 리스폰스를 쏴줄수 있다.
app.use(morgan("dev"));

app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});

app.post("/users/signup", async (req, res, next) => {
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

app.listen(3000, function () {
  console.log("server listening on port 3000");
});
