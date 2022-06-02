const axios = require("axios");
const cheerio = require("cheerio");

const rockhall = async (req, res) => {
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
};

module.exports = { rockhall };
