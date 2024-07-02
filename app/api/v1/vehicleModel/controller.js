const {
  createVehicleModel,
  getAllVehicleModels,
  getOneVehicleModel,
  updateVehicleModel,
  deleteVehicleModel,
} = require("../../../services/sequelize/vehicleModel");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const response = await createVehicleModel(req);
    res.status(StatusCodes.CREATED).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const response = await getAllVehicleModels(req);
    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const response = await getOneVehicleModel(req);

    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const response = await updateVehicleModel(req);

    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const response = await deleteVehicleModel(req);

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
