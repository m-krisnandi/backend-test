const VehicleModel = require("../../api/v1/vehicleModel/model");
const VehicleType = require("../../api/v1/vechicleType/model");
const { BadRequestError, NotFoundError } = require("../../errors");
const { Op } = require("sequelize");

const createVehicleModel = async (req) => {
  const { name, vehicleTypeId } = req.body;

  const checkName = await VehicleModel.findOne({
    where: { name },
  });

  if (checkName) throw new BadRequestError("Duplicate name");

  const response = await VehicleModel.create({
    name,
    vehicleTypeId,
  });

  return response;
};

const getAllVehicleModels = async (req) => {
  const { name, type_id, limit, offset } = req.query;

  const limitValue = parseInt(limit, 10) || 10;
  const offsetValue = parseInt(offset, 10) || 0;

  const whereConditions = {};
  if (name) {
    whereConditions.name = { [Op.iLike]: `%${name}%` };
  }

  if (type_id) {
    whereConditions.vehicleTypeId = type_id;
  }

  const { count, rows } = await VehicleModel.findAndCountAll({
    where: whereConditions,
    include: [
      {
        model: VehicleType,
        attributes: ["id", "name"],
      },
    ],
    limit: limitValue,
    offset: offsetValue,
  });

  const formattedResponse = rows.map((vehicleModel) => ({
    id: vehicleModel.id,
    name: vehicleModel.name,
    vehicle_type: {
      id: vehicleModel.vehicle_type.id,
      name: vehicleModel.vehicle_type.name,
    },
    createdAt: vehicleModel.createdAt,
    updatedAt: vehicleModel.updatedAt,
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

const getOneVehicleModel = async (req) => {
  const { id } = req.params;

  const response = await VehicleModel.findOne({
    where: { id: id },
    include: [
      {
        model: VehicleType,
        attributes: ["id", "name"],
      },
    ],
  });

  if (!response) throw new NotFoundError("VehicleModel not found");

  const {
    id: modelId,
    name: modelName,
    createdAt,
    updatedAt,
    vehicle_type,
  } = response.toJSON();
  const responseData = {
    id: modelId,
    name: modelName,
    vehicle_type,
    createdAt,
    updatedAt,
  };

  return responseData;
};

const updateVehicleModel = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const vehicleModel = await VehicleModel.findByPk(id);
  if (!vehicleModel) throw new NotFoundError("VehicleModel not found");

  const checkName = await VehicleModel.findOne({
    where: { name },
  });

  if (checkName) throw new BadRequestError("Duplicate name");

  // update vehicleModel
  const response = await VehicleModel.update(
    { name },
    {
      where: { id },
      returning: true,
      individualHooks: true,
    }
  );
  console.log(response);

  if (!response[1].length) throw new NotFoundError("VehicleModel not found");

  return response[1][0];
};

const deleteVehicleModel = async (req) => {
  const { id } = req.params;

  const response = await VehicleModel.findByPk(id);

  if (!response) throw new NotFoundError("VehicleModel not found");

  await response.destroy();

  return response;
};

module.exports = {
  createVehicleModel,
  getAllVehicleModels,
  getOneVehicleModel,
  updateVehicleModel,
  deleteVehicleModel,
};
