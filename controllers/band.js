const colors = require("colors");

const {
  getBandsDB,
  addBandDB,
  updateBandLikesDB,
} = require("../models/modelFunctions/band");

const { generateBandName } = require("../utils/generateBand");

const getBands = async (req, res) => {
  try {
    const bands = await getBandsDB();
    res.json({ bands });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong getting bands from DB");
  }
};

const getRandomBandName = async (req, res) => {
  try {
    const bandName = generateBandName();
    res.json({ bandName });
  } catch (error) {
    console.log("");
    console.log("getRandomBandName controller...".magenta);
    console.log("error: ".brightRed, error);
    res.status(500).send("Something went wrong generating a band name");
  }
};

const addBand = async (req, res) => {
  try {
    const { bandName } = req.body;
    console.log("");
    console.log("addBand controller...".magenta);
    console.log(`incoming name: ${bandName}`.brightBlue);
    const band = await addBandDB(bandName);
    console.log(
      `band added to and returned from database: ${JSON.stringify(band)}`.yellow
    );
    res.send("Band successfully added");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong adding band to DB");
  }
};

const updateBandLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const { likes } = req.body;
    console.log("");
    console.log("updateBandLikes controller...".magenta);
    console.log(`incoming id: ${id}`.brightBlue);
    console.log(`incoming likes: ${likes}`.brightBlue);
    const updated = await updateBandLikesDB(id, likes);
    console.log(`band after updating likes: ${JSON.stringify(updated)}`.yellow);
    res.send("Likes updated succesfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong updating band likes in DB");
  }
};

module.exports = { getBands, getRandomBandName, addBand, updateBandLikes };
