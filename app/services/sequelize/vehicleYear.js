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
  const response = await VehicleYear.findAll();

  return response;
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
