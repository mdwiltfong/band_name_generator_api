const { faker } = require("@faker-js/faker");
const { capitalize } = require("./string.js");

function generateBandName() {
  const adjective = capitalize(faker.word.adjective());
  const noun = capitalize(faker.word.noun());

  return `${adjective} ${noun}`;
}

function generateBandNames(n) {
  return [...new Array(n).map(() => generateBandName())];
}

function generateBand(bandName) {
  return {
    name: generateBandName(),
    likes: faker.datatype.number({ min: -50, max: 75 }),
  };
}

function generateBands(n) {
  const bands = generateBandNames(n).map((bandName) => generateBand(bandName));
  return bands;
}

module.exports = {
  generateBandName,
  generateBandNames,
  generateBand,
  generateBands,
};
