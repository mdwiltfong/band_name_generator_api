let { createTable } = require("../dbFunctions");
const sequelize = require("../dbConfig");
const { User, Band } = require("../../models/modelDefinitions");

jest.mock("../../models/modelDefinitions");
jest.mock("../dbConfig", () => {
  return {
    query() {
      return [
        {
          exists: true,
        },
      ];
    },
    define() {
      return;
    },
  };
});

jest.mock("../dbConfig");

describe("Createtable Tests", () => {
  const mockModel = {
    tableName: "Test Name",
    sync() {
      return jest.fn();
    },
  };
  test("Returns True", async () => {
    jest.mock("../dbConfig", () => {
      return {
        query() {
          return [
            {
              exists: true,
            },
          ];
        },
        define() {
          return;
        },
      };
    });

    const resp = await createTable(mockModel);
    expect(resp).toBe(true);
  });
  test.todo("Returns False", async () => {
    jest.mock("../dbConfig", () => {
      return {
        query() {
          return [
            {
              exists: false,
            },
          ];
        },
        define() {
          return;
        },
      };
    });
    const resp = await createTable(mockModel);
    expect(resp).toBe(false);
  });
  /* TODO: We can mock sequelize.query to throw an error, and then use the following pattern: 
  
  it('tests error with async/await', async () => {
  expect.assertions(1);
  try {
    await user.getUserName(1);
  } catch (e) {
    expect(e).toEqual({
      error: 'User with 1 not found.',
    });
  }
    
  */
  test.todo("Functions throws errors");
});

describe("tableExists tests", () => {
  test.todo("Returns true", () => {});
  test.todo("Returns False", () => {});
  test.todo("Throws an error", () => {});
});

des;
