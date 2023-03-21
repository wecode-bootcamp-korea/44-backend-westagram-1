const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("morgan");
const dotenv = require("dotenv");
const { DataSource } = require("typeorm");
const { json } = require("express");
dotenv.config();
app.use(logger("combined"));
require("dotenv").config();
app.use(cors());
app.use(express.json());
const myDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});

myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

app.listen(3000, function () {
  console.log("server listening on port 3000");
});
