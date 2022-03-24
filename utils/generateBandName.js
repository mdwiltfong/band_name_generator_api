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

module.exports = GenerateBandName;
