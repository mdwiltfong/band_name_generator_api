// Database variables
const { Sequelize, Model, DataTypes } = require("sequelize");
const user = "mdwiltfong";
const host = "localhost";
const database = "bandnameapi";
const password = process.env.DATABASE_PW;
const port = "5432";

export const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: "postgres",
  logging: true,
});

export function connectdb() {
  try {
    await sequelize.authenticate();
    console.log(`server running in port 8000`);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = sequelize;
