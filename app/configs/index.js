const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
  dbConfig: {
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbDialect: process.env.DB_DIALECT,
  },
};
