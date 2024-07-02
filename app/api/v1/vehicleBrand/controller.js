const {
  createVehicleBrand,
  getAllVehicleBrands,
  getOneVehicleBrand,
  updateVehicleBrand,
  deleteVehicleBrand,
} = require("../../../services/sequelize/vehicleBrand");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const response = await createVehicleBrand(req);
    res.status(StatusCodes.CREATED).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const response = await getAllVehicleBrands(req);
    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const response = await getOneVehicleBrand(req);

    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const response = await updateVehicleBrand(req);

    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const response = await deleteVehicleBrand(req);

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
