const VehicleYear = require("../../api/v1/vehicleYear/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const createVehicleYear = async (req) => {
  const { year } = req.body;

  const checkYear = await VehicleYear.findOne({
    where: { year },
  });

  if (checkYear) throw new BadRequestError("Duplicate year");

  const response = await VehicleYear.create({
    year: year,
  });

  return response;
};

const getAllVehicleYears = async (req) => {
  const { year, limit, offset } = req.query;

  const limitValue = parseInt(limit, 10) || 10;
  const offsetValue = parseInt(offset, 10) || 0;

  const whereConditions = {};
  if (year) {
    whereConditions.year = parseInt(year, 10);
  }

  const { count, rows } = await VehicleYear.findAndCountAll({
    where: whereConditions,
    limit: limitValue,
    offset: offsetValue,
  });

  const formattedResponse = rows.map((vehicleYear) => ({
    id: vehicleYear.id,
    year: vehicleYear.year,
    createdAt: vehicleYear.createdAt,
    updatedAt: vehicleYear.updatedAt,
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

const getOneVehicleYear = async (req) => {
  const { id } = req.params;

  const response = await VehicleYear.findOne({
    where: { id: id },
  });

  if (!response) throw new NotFoundError("VehicleYear not found");

  return response;
};

const updateVehicleYear = async (req) => {
  const { id } = req.params;
  const { year } = req.body;

  const vehicleYear = await VehicleYear.findByPk(id);
  if (!vehicleYear) throw new NotFoundError("VehicleYear not found");

  const checkYear = await VehicleYear.findOne({
    where: { year },
  });

  if (checkYear) throw new BadRequestError("Duplicate year");

  // update vehicleYear
  const response = await VehicleYear.update(
    { year },
    {
      where: { id },
      returning: true,
      individualHooks: true,
    }
  );
  console.log(response);

  if (!response[1].length) throw new NotFoundError("VehicleYear not found");

  return response[1][0];
};

const deleteVehicleYear = async (req) => {
  const { id } = req.params;

  const response = await VehicleYear.findByPk(id);

  if (!response) throw new NotFoundError("VehicleYear not found");

  await response.destroy();

  return response;
};

module.exports = {
  createVehicleYear,
  getAllVehicleYears,
  getOneVehicleYear,
  updateVehicleYear,
  deleteVehicleYear,
};
