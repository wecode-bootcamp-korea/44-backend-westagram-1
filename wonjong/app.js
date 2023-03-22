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

<<<<<<< Updated upstream
app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});

myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

=======
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

>>>>>>> Stashed changes
app.listen(3000, function () {
  console.log("server listening on port 3000");
});

