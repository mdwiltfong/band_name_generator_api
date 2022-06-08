const Sequelize = require("sequelize");

const user = process.env.DATABASE_USER;
const host = process.env.DATABASE_HOST;
const database = "bandnameapi";
const password = process.env.DATABASE_PW;
const port = "5432";

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
