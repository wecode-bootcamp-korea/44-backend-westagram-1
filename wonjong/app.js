//// 3rd-party package
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

//DB connection
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

//custom package
const app = express();
app.use(logger("combined"));
app.use(cors());
app.use(express.json());

//http 접속확인
app.get("/ping", function (req, res) {
  res.json({ message: "pong" });
});

app.listen(3000, function () {
  console.log("server listening on port 3000");
});
