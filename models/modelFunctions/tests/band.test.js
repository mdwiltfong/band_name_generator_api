const { Band } = require("../../modelDefinitions");
const { addBandDB } = require("../band");
const MockData = require("./MockData");
describe("addBandDB tests", () => {
  /* TODO: create integration tests for these sets of functions */
  test("Creates a Band instance", async () => {
    const bands = await Promise.all(
      MockData.MockBandNames.map(async (bandName) => await addBandDB(bandName))
    );

    expect(bands);
  });
});
