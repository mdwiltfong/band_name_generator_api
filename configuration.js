const Sequelize = require("sequelize");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});
const pg = require("pg");
require("colors");
console.log("----");
console.log("Environment variables: isEmpty?");
console.log(dotenv.parsed === undefined ? "Yes".red : "No".green);
console.log("----");

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

const pool = new pg.Pool({
  user: user,
  host: host,
  port: port,
  password: password,
  database: "bandnameapi",
});
module.exports = { sequelize, pool };
