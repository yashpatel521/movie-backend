require("dotenv").config();
const { DataSource } = require("typeorm");

let config = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/database/tables/*.js"],
  logging: process.env.DB_LOGGING === "true",
  synchronize: process.env.SYNCHRONIZE === "true",
};

if (process.env.DATABASE == "production") {
  config.host = process.env.DB_HOST_REMOTE;
  config.port = parseInt(process.env.DB_PORT_REMOTE);
  config.username = process.env.DB_USERNAME_REMOTE;
  config.password = process.env.DB_PASSWORD_REMOTE;
  config.database = process.env.DB_NAME_REMOTE;
  config.synchronize = process.env.SYNCHRONIZE === "true";
  config.logging = process.env.DB_LOGGING_REMOTE === "true";
  config.ssl = {
    rejectUnauthorized: false,
  };
}

const db = new DataSource(config);

module.exports = db;
