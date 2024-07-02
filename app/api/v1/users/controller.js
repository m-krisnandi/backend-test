const {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../../../services/sequelize/users");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const response = await createUser(req);
    res.status(StatusCodes.CREATED).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const response = await getAllUsers(req);
    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const response = await getOneUser(req);

    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const response = await updateUser(req);

    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const response = await deleteUser(req);

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
