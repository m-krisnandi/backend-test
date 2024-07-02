const {
  createVehicleYear,
  getAllVehicleYears,
  getOneVehicleYear,
  updateVehicleYear,
  deleteVehicleYear,
} = require("../../../services/sequelize/vehicleYear");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const response = await createVehicleYear(req);
    res.status(StatusCodes.CREATED).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const response = await getAllVehicleYears(req);
    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const response = await getOneVehicleYear(req);

    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const response = await updateVehicleYear(req);

    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const response = await deleteVehicleYear(req);

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
