const express = require("express");
require("dotenv").config();
const cors = require("cors");
const PORT = 8000;
const sequelize = require("./db/dbConfig");
const app = express();
const bandRoute = require("./routes/bandRoute");
const { rockhall } = require("./controllers/rockhall");

app.use(cors());
app.use(express.json());

app.use("/band", bandRoute);

app.get("/", (req, res) => {
  res.json("Welcome to the band generator app!");
});

app.get("/rockhall", rockhall);

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  /* return res.status(err.status || 500); */
  return res.status(400).send({ error: err.message });
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`server running in port ${PORT}`);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
