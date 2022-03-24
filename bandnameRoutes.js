const express = require("express");
const router = express.Router();
const { BandName, User } = require("./bandname");

BandName.sync();
User.sync();

const generateBandName = require("./utils/generateBandName");

router.get("/random", (req, res, next) => {
  try {
    res.json({
      bandName: generateBandName(),
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    /* TODO Add error handling for this route in the event bandname 254 is requested */
    const id = req.params.id;
    const bandname = await BandName.findAll({
      where: {
        id: id,
      },
    });
    res.send(bandname[0]);
  } catch (e) {
    next(e);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const bandnames = await BandName.findAll();
    res.send(bandnames);
  } catch (e) {
    next(e);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const { name, likes } = req.body;

    if (!name || !likes) {
      throw new Error("Request does not have likes or band name");
    }
    if (req.body) {
      const name = req.body.name;
      const likes = req.body.likes;
      await BandName.create({ name, likes });
      res.status(200).send(req.body);
    } else {
      res.status(400).send(req.body);
    }
  } catch (e) {
    next(e);
  }
});

/* TODO: Finish making router.post request for liking specific bandnames */
/* app.post("/like/:id", async (req, res, next) => {
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
}); */

module.exports = router;
