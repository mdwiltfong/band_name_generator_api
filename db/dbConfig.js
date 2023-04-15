const Sequelize = require("sequelize");
const dotenv = require("dotenv").config({ path: "../.env" });
const user = process.env.POSTGRES_USER;
const host = process.env.POSTGRES_HOST;
const database = "bandnameapi";
const password = process.env.POSTGRES_PASSWORD;
const port = process.env.POSTGRES_PORT;

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
