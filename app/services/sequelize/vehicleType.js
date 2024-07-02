const { Op } = require("sequelize");
const VehicleType = require("../../api/v1/vechicleType/model");
const VehicleBrand = require("../../api/v1/vehicleBrand/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const createVehicleType = async (req) => {
  const { name, vehicleBrandId } = req.body;

  const checkName = await VehicleType.findOne({
    where: { name },
  });

  if (checkName) throw new BadRequestError("Duplicate name");

  const response = await VehicleType.create({
    name,
    vehicleBrandId,
  });

  return response;
};

const getAllVehicleTypes = async (req) => {
  const { name, brand_id, limit, offset } = req.query;

  const limitValue = parseInt(limit, 10) || 10;
  const offsetValue = parseInt(offset, 10) || 0;

  const whereConditions = {};
  if (name) {
    whereConditions.name = { [Op.iLike]: `%${name}%` };
  }

  if (brand_id) {
    whereConditions.vehicleBrandId = brand_id;
  }

  const { count, rows } = await VehicleType.findAndCountAll({
    where: whereConditions,
    include: [
      {
        model: VehicleBrand,
        attributes: ["id", "name"],
      },
    ],
    limit: limitValue,
    offset: offsetValue,
  });

  const formattedResponse = rows.map((vehicleType) => ({
    id: vehicleType.id,
    name: vehicleType.name,
    vehicle_brand: {
      id: vehicleType.vehicle_brand.id,
      name: vehicleType.vehicle_brand.name,
    },
    createdAt: vehicleType.createdAt,
    updatedAt: vehicleType.updatedAt,
  }));

  return {
    data: formattedResponse,
    metadata: {
      total: count,
      limit: limitValue,
      offset: offsetValue,
    },
  };
};

const getOneVehicleType = async (req) => {
  const { id } = req.params;

  const response = await VehicleType.findOne({
    where: { id: id },
    include: [
      {
        model: VehicleBrand,
        attributes: ["id", "name"],
      },
    ],
  });

  if (!response) throw new NotFoundError("VehicleType not found");

  const {
    id: typeId,
    name: typeName,
    createdAt,
    updatedAt,
    vehicle_brand,
  } = response.toJSON();
  const responseData = {
    id: typeId,
    name: typeName,
    vehicle_brand,
    createdAt,
    updatedAt,
  };

  return responseData;
};

const updateVehicleType = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const vehicleType = await VehicleType.findByPk(id);
  if (!vehicleType) throw new NotFoundError("VehicleType not found");

  const checkName = await VehicleType.findOne({
    where: { name },
  });

  if (checkName) throw new BadRequestError("Duplicate name");

  // update vehicleType
  const response = await VehicleType.update(
    { name },
    {
      where: { id },
      returning: true,
      individualHooks: true,
    }
  );
  console.log(response);

  if (!response[1].length) throw new NotFoundError("VehicleType not found");

  return response[1][0];
};

const deleteVehicleType = async (req) => {
  const { id } = req.params;

  const response = await VehicleType.findByPk(id);

  if (!response) throw new NotFoundError("VehicleType not found");

  await response.destroy();

  return response;
};

module.exports = {
  createVehicleType,
  getAllVehicleTypes,
  getOneVehicleType,
  updateVehicleType,
  deleteVehicleType,
};
