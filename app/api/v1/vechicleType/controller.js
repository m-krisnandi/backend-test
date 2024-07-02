const {
  createVehicleType,
  getAllVehicleTypes,
  getOneVehicleType,
  updateVehicleType,
  deleteVehicleType,
} = require("../../../services/sequelize/vehicleType");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const response = await createVehicleType(req);
    res.status(StatusCodes.CREATED).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const response = await getAllVehicleTypes(req);
    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const response = await getOneVehicleType(req);

    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const response = await updateVehicleType(req);

    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const response = await deleteVehicleType(req);

    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  findAll,
  find,
  update,
  destroy,
};
