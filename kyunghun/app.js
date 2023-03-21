require("dotenv").config();

const express = require('express')
const cors = require('cors')
const logger = require('morgan');

const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
})

const app = express()
 
app.use(cors())
app.use(logger('dev'));
app.use(express.json())


app.get('/ping', function (req, res, next) {
  res.json({message: 'pong'})
})

app.listen(3000, function () {
  console.log('server listening on port 3000')
})