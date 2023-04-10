const db = require("../../../db/dbConfig");
let t;
async function clearTable(table) {
  try {
    const res = await db.query(
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
  await db.query(`DELETE FROM ${tableName.toLowerCase()}`);
}

async function commonBeforeEach() {
  t = await db.transaction();
}

async function commonAfterEach() {
  await t.rollback();
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
