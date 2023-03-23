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

app.post("/user", async (req, res) => {
  const { name, email, profileImage, password } = req.body;
  await appDataSource.query(
    `INSERT INTO users(
      name,
      email,
      profile_image,
      password) VALUES (?,?,?,?)`,
    [name, email, profileImage, password]
  );
  res.status(201).json({ message: "userCreated" });
});

app.listen(PORT, function () {
  console.log(`server listening on port ${PORT}`);
});
