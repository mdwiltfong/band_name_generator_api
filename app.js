const express = require("express");
require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const PORT = 8000;
const { next } = require("cheerio/lib/api/traversing");
const app = express();
app.use(cors());
app.use(express.json());
//Database variables and initialization
const { Sequelize, Model, DataTypes } = require("sequelize");
const res = require("express/lib/response");
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
class BandName extends Model {}

BandName.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "bandnames",
    timestamps: false,
  }
);

BandName.sync();

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
  console.log("/bandname/random");
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

      const bandname = await BandName.findAll({
        where: {
          id: id,
        },
      });
      const likes = bandname[0].likes + 1;
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
