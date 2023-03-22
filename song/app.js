require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});
myDataSource.initialize().then(() => {
  console.log("Data Source has been initialize");
});
const app = express();

app.use(express.json());
app.use(cors()); // 모든 통신이 cors 메소드를 통과해야지만 올바르게 동작되어 리스폰스를 쏴줄수 있다.
app.use(morgan("dev"));
app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});

app.listen(3000, function () {
  console.log("server listening on port 3000");
});
