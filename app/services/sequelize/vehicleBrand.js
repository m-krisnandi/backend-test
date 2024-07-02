const VehicleBrand = require("../../api/v1/vehicleBrand/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const createVehicleBrand = async (req) => {
  const { name } = req.body;

  const checkName = await VehicleBrand.findOne({
    where: { name },
  });

  if (checkName) throw new BadRequestError("Duplicate name");

  const response = await VehicleBrand.create({
    name: name,
  });

  return response;
};

const getAllVehicleBrands = async (req) => {
  const response = await VehicleBrand.findAll();

  return response;
};

const getOneVehicleBrand = async (req) => {
  const { id } = req.params;

  const response = await VehicleBrand.findOne({
    where: { id: id },
  });

  if (!response) throw new NotFoundError("VehicleBrand not found");

  return response;
};

const updateVehicleBrand = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const vehicleBrand = await VehicleBrand.findByPk(id);
  if (!vehicleBrand) throw new NotFoundError("VehicleBrand not found");

  const checkName = await VehicleBrand.findOne({
    where: { name },
  });

  if (checkName) throw new BadRequestError("Duplicate name");

  // update vehicleBrand
  const response = await VehicleBrand.update(
    { name },
    {
      where: { id },
      returning: true,
      individualHooks: true,
    }
  );
  console.log(response);

  if (!response[1].length) throw new NotFoundError("VehicleBrand not found");

  return response[1][0];
};

const deleteVehicleBrand = async (req) => {
  const { id } = req.params;

  const response = await VehicleBrand.findByPk(id);

  if (!response) throw new NotFoundError("VehicleBrand not found");

  await response.destroy();

  return response;
};

module.exports = {
  createVehicleBrand,
  getAllVehicleBrands,
  getOneVehicleBrand,
  updateVehicleBrand,
  deleteVehicleBrand,
};
