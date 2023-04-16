const { Client } = require("pg");
require("colors");
const pgclient = new Client({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: "postgres",
  password: "postgres",
  database: "postgres",
});

pgclient.connect();

const database = "CREATE DATABASE bandnameapi;";

pgclient.query(database, (err, res) => {
  if (err) console.log(err.red);
  else console.log("Database created successfully");
  pgclient.end();
});
