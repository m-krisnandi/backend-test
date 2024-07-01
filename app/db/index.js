const { Sequelize } = require("sequelize");

const db = new Sequelize("vehicle_db", "postgres", "secret", {
  host: "localhost",
  dialect: "postgres",
});

// auto generate table to database
// (async () => {
//   await db.sync();
// })();

module.exports = db;
