const { Band } = require("../modelDefinitions");

async function addBandDB(bandName) {
  try {
    const band = await Band.create({ name: bandName });
    return band;
  } catch (error) {
    throw Error("There was an issue adding a band to DB");
  }
}

async function updateBandLikesDB(id, likes) {
  try {
    const updatedBand = await Band.update(
      {
        likes: likes,
      },
      {
        where: {
          id: id,
        },
        returning: ["id", "name", "likes"],
      }
    );
    return updatedBand[1][0].dataValues;
  } catch (error) {
    throw Error("There was an issue updating the DB");
  }
}

async function getBandsDB() {
  try {
    const allBands = await Band.findAll({
      attributes: ["id", "name", "likes"],
      limit: 40,
      order: [["likes", "DESC"]],
    });
    return allBands;
  } catch (error) {
    console.log(error);
    throw Error("There was an issue getting bands from the DB");
  }
}

module.exports = { updateBandLikesDB, getBandsDB, addBandDB };
