const express = require("express");

require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");

const app = express();
const PORT = process.env.PORT;

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initalized!");
  })
  .catch((err) => {
    console.log("Error during Data source initialization", err);
    appDataSource.destroy();
  });

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

//health check
app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});
//회원가입
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  await appDataSource.query(
    `INSERT INTO users(
    name,
    email,
    password
  )VALUES(?, ?, ?);`,
    [name, email, password]
  );
  res.status(201).json({ message: "userCreated" });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
