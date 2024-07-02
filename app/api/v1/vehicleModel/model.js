const db = require("../../../db");
const { Sequelize } = require("sequelize");
const { v7: uuidv7 } = require("uuid");
const VehicleType = require("../vechicleType/model");

const { DataTypes } = Sequelize;

const VehicleModel = db.define(
  "vehicle_model",
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
    vehicleTypeId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
);

VehicleType.hasMany(VehicleModel);
VehicleModel.belongsTo(VehicleType, { foreignKey: "vehicleTypeId" });

module.exports = VehicleModel;
