const dotenv = require("dotenv").config({ path: ".env" });
require("colors");
console.log("----");
console.log("Sequelize Configuration: isEmpty?");
console.log(dotenv.parsed === undefined ? "Yes".red : "No".green);
if (dotenv.parsed === undefined) {
  console.log("----");
  console.log("No .env file found. Exiting.".red);
  console.log("----");
  process.exit(1);
}
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

module.exports = sequelize;
