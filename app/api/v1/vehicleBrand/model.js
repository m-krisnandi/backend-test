const db = require("../../../db");
const { Sequelize } = require("sequelize");
const { v7: uuidv7 } = require("uuid");

const { DataTypes } = Sequelize;

const VehicleBrand = db.define(
  "vehicle_brand",
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
);

module.exports = VehicleBrand;
