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
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/ping", function (req, res) {
  res.json({ message: "pong" });
});

app.post("/users/signup", async (req, res) => {
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

app.post("/posts/register", async (req, res) => {
  const { title, content, userId } = req.body;

  await appDataSource.query(
    `INSERT INTO posts(
          title,
          content,
          user_id
      ) VALUES (?, ?, ?);
      `,
    [title, content, userId]
  );

  res.status(201).json({ message: "postCreated" });
});

app.listen(PORT, function () {
  console.log(`server listening on port ${PORT}`);
});
