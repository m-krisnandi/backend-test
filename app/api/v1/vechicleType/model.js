const db = require("../../../db");
const { Sequelize } = require("sequelize");
const { v7: uuidv7 } = require("uuid");
const VehicleBrand = require("../vehicleBrand/model");

const { DataTypes } = Sequelize;

const VehicleType = db.define(
  "vehicle_type",
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
    vehicleBrandId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
);

VehicleBrand.hasMany(VehicleType);
VehicleType.belongsTo(VehicleBrand, { foreignKey: "vehicleBrandId" });

module.exports = VehicleType;
