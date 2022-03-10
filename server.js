const express = require("express");
require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const PORT = 8000;
const { next } = require("cheerio/lib/api/traversing");
const sequelize = require("./database");
const app = express();
app.use(cors());
app.use(express.json());
const { BandName, User } = require("./bandname");
const { user } = require("pg/lib/defaults");

BandName.sync();
User.sync();
const bands = [];
app.get("/", (req, res, next) => {
  res.json("Welcome to the band generator app!");
});

const adjectives = [
  "Lilac",
  "Scary",
  "Enormous",
  "Blind",
  "Hopeful",
  "Warped",
  "Vintage",
  "Great",
  "Terrible",
  "Dental",
];
const nouns = [
  "Octopi",
  "Happiness",
  "Shrubbery",
  "Bracelets",
  "Code",
  "Soap",
  "Cans",
  "Messages",
  "Lighter",
  "Bass",
];
function GenerateBandName() {
  function randomAjective() {
    return adjectives[Math.floor(Math.random() * adjectives.length)];
  }

  function randomNoun() {
    return nouns[Math.floor(Math.random() * nouns.length)];
  }
  return `${randomAjective() + " " + randomNoun()}`;
}

app.get("/bandname/random", (req, res, next) => {
  res.json({
    bandName: GenerateBandName(),
  });
});

app.get("/bandname/:id", async (req, res, next) => {
  const id = req.params.id;
  const bandname = await BandName.findAll({
    where: {
      id: id,
    },
  });
  res.send(bandname[0]);
});

app.get("/bandnames/all", async (req, res, next) => {
  const bandnames = await BandName.findAll();
  res.send(bandnames);
});
app.post("/bandname/add", async (req, res, next) => {
  if (req.body) {
    const name = req.body.name;
    const likes = req.body.likes;
    await BandName.create({ name, likes });
    res.status(200).send(req.body);
  } else {
    res.status(400).send(req.body);
  }
});

app.post("/bandname/like/:id", async (req, res, next) => {
  if (req) {
    try {
      const id = req.params.id;
      const incomingLikes = req.body.likes;
      const bandname = await BandName.findAll({
        where: {
          id: id,
        },
      });
      const likes = incomingLikes;
      BandName.update(
        {
          likes: likes,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.send(bandname);
    } catch (e) {
      res.send(e);
    }
  }
});

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

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`server running in port ${PORT}`);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
