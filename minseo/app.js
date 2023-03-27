const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

const routers = require('./routers');

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(routers);

const PORT = process.env.PORT;

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server islistening on ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
