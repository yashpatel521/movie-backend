require("dotenv").config();
const { DataSource } = require("typeorm");

const db = new DataSource({
  type: process.env.DB_TYPE || "sqlite",
  database: process.env.DB_PATH || "./movies.db",
  entities: ["src/database/tables/*.js"],
  logging: false,
  synchronize: Boolean(process.env.SYNCHRONIZE),
});

module.exports = db;
