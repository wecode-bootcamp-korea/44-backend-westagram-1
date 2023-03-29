const http = require('http');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bcrypt = require('bcrypt');

const routes = require('./routes');
const app = express();

app.use(cors());
app.use(logger('combined'));
app.use(express.json());
app.use(routes);
// app.use의미 : 미들웨어로 등록한다
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
    appDataSource.destroy();
  }
};

start();
