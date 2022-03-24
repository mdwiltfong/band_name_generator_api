const express = require("express");
require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const PORT = 8000;
const sequelize = require("./database");
const app = express();
const bandnameRoutes = require("./bandnameRoutes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.json("Welcome to the band generator app!");
});

app.use("/bandname", bandnameRoutes);

app.get("/rockhall", (req, res, next) => {
  axios
    .get("https://spinditty.com/learning/cool-band-name-ideas")
    .then((resp) => {
      const html = resp.data;
      const $ = cheerio.load(html);

      $("td:first-child", html).each(function () {
        const bandName = $(this).text().trim();
        bands.push({
          bandName,
        });
      });
      const lg = bands.length;
      res.json(bands[Math.floor(Math.random() * lg)]);
    })
    .catch((err) => console.log(err));
});

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
