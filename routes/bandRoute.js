const express = require("express");
const router = express.Router();
const {
  getBands,
  addBand,
  getRandomBandName,
  updateBandLikes,
} = require("../controllers/band");

router.get("/bands", getBands);

router.get("/randomName", getRandomBandName);

router.post("/add", addBand);

router.post("/updateLikes/:id", updateBandLikes);

module.exports = router;
