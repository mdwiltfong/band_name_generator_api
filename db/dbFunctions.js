const { QueryTypes } = require("sequelize");
const { sequelize } = require("../configuration");
const { User, Band } = require("../models/modelDefinitions");
const { generateBands } = require("../utils/generateBand");

async function createTable(model) {
  try {
    const tableName = model.tableName;
    const exists = await tableExists(tableName);
    if (exists) {
      console.log(`${tableName} table already exists.\n`.yellow);
      return true;
    } else {
      await model.sync();
      console.log(`${tableName} table created.\n`.brightBlue);
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

async function populateTable(model, dataArray) {
  try {
    console.log(`Attempting to Populate ${model.tableName}...\n`.magenta);
    await model.bulkCreate(dataArray);
    console.log(`${model.tableName} populated\n`.brightBlue);
    console.log;
  } catch (error) {
    console.log(error);
  }
}

async function tableExists(tableName) {
  try {
    const res = await sequelize.query(
      `
    SELECT EXISTS (
      SELECT FROM
        pg_tables
      WHERE
        schemaname = 'public' AND
        tablename  = ?
    );
`,
      {
        replacements: [tableName],
        type: QueryTypes.SELECT,
      }
    );
    return res[0].exists;
  } catch (error) {
    console.log(error);
  }
}

async function dbSetup() {
  try {
    console.log("Attempting to create tables...\n".magenta);
    await createTable(User);
    const bandsExists = await createTable(Band);
    if (!bandsExists) {
      await populateTable(Band, generateBands(10));
    }
    await sequelize.close();
  } catch (error) {
    console.log(error);
  }
}

async function dbReset() {
  try {
    console.log("Dropping tables...\n".magenta);
    await User.drop();
    console.log("users table dropped\n".brightBlue);
    await Band.drop();
    console.log("bands table dropped\n".brightBlue);
    await dbSetup();
  } catch (error) {
    throw Error(error);
  }
}

module.exports = { dbSetup, dbReset, createTable, tableExists };
