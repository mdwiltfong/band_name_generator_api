const Sequelize = require("sequelize");
const user = "postgres";
const host = "localhost";
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
