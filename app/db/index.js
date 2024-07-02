const { Sequelize } = require("sequelize");
const { dbConfig } = require("../configs");

const { dbName, dbUser, dbPassword, dbHost, dbDialect } = dbConfig;

const db = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
});

// auto generate table to database
// (async () => {
//   await db.sync();
// })();

module.exports = db;
