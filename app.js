const express = require("express");
require('dotenv').config()
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const user = "mdwiltfong";
const host = "localhost";
const database = "bandnameapi";
const password = process.env.DATABASE_PW;
const port = "5432";

const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: "postgres",
  logging: false,
});

const { next } = require("cheerio/lib/api/traversing");

class Dog extends Model {}

Dog.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "dog",
    timestamps: false,
  }
);

const makeDog = async () => {
  await Dog.sync();
  const name = "Caleb";
  const age = 8;
  try {
    await Dog.create({ name, age });
    Dog.sync();
  } catch (e) {
    return e;
  }
};


makeDog();
console.log(Dog);
const app = express();
app.use(cors());
const bands = [];
app.get("/", (req, res, next) => {
  res.json("Welcome to the band generator app!");
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
  return `Hey, we should call the band The ${
    randomAjective() + " " + randomNoun()
  }.`;
}

app.get("/random", (req, res, next) => {
  res.json({
    bandName: GenerateBandName(),
  });
});

app.listen(8000, async () => {
  try {
    await sequelize.authenticate();
    console.log(`server running in port 8000`);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
