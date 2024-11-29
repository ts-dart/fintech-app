require('dotenv').config()

const config = {
  username: process.env.DB_USENAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  dialect: 'postgres',
  port: process.env.DB_PORT,
}

module.exports = config;
