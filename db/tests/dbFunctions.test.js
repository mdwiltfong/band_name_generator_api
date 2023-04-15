let { createTable } = require("../dbFunctions");
let { tableExists } = require("../dbFunctions");
const { sequelize } = require("../../configuration");
const { User, Band } = require("../../models/modelDefinitions");
jest.mock("../../configuration");
function setUpMock(tableStatus, errorMsg = undefined) {
  if (errorMsg) {
    sequelize.query.mockImplementationOnce(() => {
      throw Error("Unable to complete query");
    });
  } else {
    sequelize.query.mockImplementation(() => {
      return [
        {
          exists: tableStatus,
        },
      ];
    });
  }
}
describe("Createtable Tests", () => {
  const mockModel = {
    tableName: "Test Name",
    sync() {
      return jest.fn();
    },
  };

  test("Returns True", async () => {
    setUpMock(true);
    console.log(sequelize.query());
    const resp = await createTable(mockModel);
    expect(resp).toBe(true);
  });
  test("Returns False", async () => {
    setUpMock(false);

    const resp = await createTable(mockModel);
    expect(resp).toBe(false);
  });

  test("Functions throws errors", async () => {
    try {
      setUpMock("Unable to complete query");
      const resp = await createTable(mockModel);
    } catch (error) {
      expect(e).toEqual({
        error: "Unable to complete query",
      });
    }
  });
});

describe("tableExists tests", () => {
  test("Returns true", async () => {
    setUpMock(true);
    const resp = await tableExists("mockTable");
    expect(resp).toBe(true);
  });
  test("Returns False", async () => {
    setUpMock(false);
    const resp = await tableExists("mockTable");
    expect(resp).toBe(false);
  });
  test("Throws an error", async () => {
    try {
      setUpMock("Unable to connect to DB");
      const resp = await tableExists("mockTable");
    } catch (error) {
      expect(error).toEqual({
        error: "Unable to connect to DB",
      });
    }
  });
});
