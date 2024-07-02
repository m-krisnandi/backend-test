const db = require("../../../db");
const { Sequelize } = require("sequelize");
const { v7: uuidv7 } = require("uuid");

const { DataTypes } = Sequelize;

const VehicleYear = db.define(
  "vehicle_year",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv7(),
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
        min: 1886,
        max: new Date().getFullYear() + 1,
      },
    },
  },
  { freezeTableName: true }
);

module.exports = VehicleYear;
