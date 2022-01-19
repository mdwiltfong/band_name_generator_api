const express = require("express");
require('dotenv').config()
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const { next } = require("cheerio/lib/api/traversing");
const app = express();
app.use(cors());
app.use(express.json())
//Database variables and initialization
const { Sequelize, Model, DataTypes } = require('sequelize');
const user = "mdwiltfong";
const host = "localhost";
const database = "bandnameapi";
const password = process.env.DATABASE_PW;
const port = "5432";
const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false
  })

  class BandName extends Model {}

  BandName.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'bandnames',
    timestamps: false
  })

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
  return `Hey, we should call the band The ${
    randomAjective() + " " + randomNoun()
  }.`;
}

app.get("/bandname", (req, res, next) => {
  res.json({
    bandName: GenerateBandName(),
  });
});


app.post("/bandname/add",(req,res,next)=>{
    console.log(req.body);
    res.status(200).send(req.body)
})

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


app.listen(8000, async () => {
  try {
    await sequelize.authenticate();
    console.log(`server running in port 8000`);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
