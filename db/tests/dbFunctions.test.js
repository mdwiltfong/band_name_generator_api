let { createTable } = require("../dbFunctions");
let { tableExists } = require("../dbFunctions");
const sequelize = require("../dbConfig");
const { User, Band } = require("../../models/modelDefinitions");
jest.mock("../dbConfig");

describe("Createtable Tests", () => {
  const mockModel = {
    tableName: "Test Name",
    sync() {
      return jest.fn();
    },
  };
  sequelize.query.mockImplementation(() => {
    return [
      {
        exists: true,
      },
    ];
  });

  test("Returns True", async () => {
    console.log(sequelize.query());
    const resp = await createTable(mockModel);
    expect(resp).toBe(true);
  });
  test("Returns False", async () => {
    sequelize.query.mockImplementationOnce(() => {
      return [
        {
          exists: false,
        },
      ];
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
  test("Functions throws errors", async () => {
    try {
      sequelize.query.mockImplementationOnce(() => {
        throw Error("Unable to complete query");
      });
    } catch (error) {
      expect(e).toEqual({
        error: "Unable to complete query",
      });
    }
  });
});

describe("tableExists tests", () => {
  test.todo("Returns true");
  test.todo("Returns False");
  test.todo("Throws an error");
});
