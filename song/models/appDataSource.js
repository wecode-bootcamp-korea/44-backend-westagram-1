const { DataSource } = require("typeorm");

const userDao = require("./userDao");

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
    console.error("에러", err);
    appDataSource.destroy();
  });

module.exports = appDataSource;
