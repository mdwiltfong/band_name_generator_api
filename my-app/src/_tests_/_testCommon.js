const { sequelize } = require("../../../configuration");
let t;
async function clearTable(table) {
  try {
    const res = await sequelize.query(
      `
      DELETE FROM ${table}
      RETURNING id;
      `
    );
    return res.length > 0 ? true : false;
  } catch (error) {
    console.error(error);
  }
}
async function commonBeforeAll(tableName) {
  // noinspection SqlWithoutWhere
  await sequelize.query(`DELETE FROM ${tableName.toLowerCase()}`);
}

async function commonBeforeEach() {
  t = await sequelize.transaction();
}

async function commonAfterEach() {
  await t.rollback();
}

async function commonAfterAll() {
  await sequelize.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
