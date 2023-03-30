require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT;
const routers = require("./routers");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(routers);
app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});

const start = async () => {
  try {
    app.listen(PORT, function () {
      console.log(`server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
