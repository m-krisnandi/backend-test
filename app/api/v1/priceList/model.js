const db = require("../../../db");
const { Sequelize } = require("sequelize");
const { v7: uuidv7 } = require("uuid");
const VehicleModel = require("../vehicleModel/model");
const VehicleYear = require("../vehicleYear/model");

const { DataTypes } = Sequelize;

const PriceList = db.define(
  "price_list",
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
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    vehicleYearId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    vehicleModelId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
    hooks: {
      beforeCreate: (priceList, options) => {
        if (priceList.price && typeof priceList.price === "string") {
          priceList.price = priceList.price
            .replace(/\./g, "")
            .replace(/,/g, ".");
        }
      },
      beforeUpdate: (priceList, options) => {
        if (priceList.price && typeof priceList.price === "string") {
          priceList.price = priceList.price
            .replace(/\./g, "")
            .replace(/,/g, ".");
        }
      },
    },
  }
);

VehicleYear.hasMany(PriceList);
PriceList.belongsTo(VehicleYear, { foreignKey: "vehicleYearId" });

VehicleModel.hasMany(PriceList);
PriceList.belongsTo(VehicleModel, { foreignKey: "vehicleModelId" });

module.exports = PriceList;
