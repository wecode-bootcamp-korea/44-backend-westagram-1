require("dotenv").config();

const express = require('express')
const cors = require('cors')
const logger = require('morgan');
const { DataSource } = require('typeorm');

const dataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

dataSource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
})

const app = express()
 
app.use(cors())
app.use(logger('dev'));
app.use(express.json())
 
app.get('/ping', function (req, res, next) {
  res.status(200).json({message: 'pong'})
})

app.post('/users/signup', async function (req, res, next) {
  //목적: users table에 데이터를 생성

  //1. client한테 data 받는다.
  const { email, password, name, age, phoneNumber } = req.body
  //2. 받은 데이터를 DB에 저장한다.
  await dataSource.query(`
    INSERT INTO users (
      email,
      password,
      name,
      age,
      phone_number
    ) VALUES (
      ?,
      ?,
      ?,
      ?,
      ?
    )
  `,[email, password, name, age, phoneNumber])
  //3. 적절한 응답을 준다.
  res.status(201).json({message: 'userCreated'})
})


const port = process.env.PORT

app.listen(port, function () {
  console.log(`server listening on port ${port}`)
})