const {
    createPriceList,
    getAllPriceLists,
    getOnePriceList,
    updatePriceList,
    deletePriceList,
  } = require("../../../services/sequelize/priceList");
  const { StatusCodes } = require("http-status-codes");
  
  const create = async (req, res, next) => {
    try {
      const response = await createPriceList(req);
      res.status(StatusCodes.CREATED).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };
  
  const findAll = async (req, res, next) => {
    try {
      const response = await getAllPriceLists(req);
      res.status(StatusCodes.OK).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };
  
  const find = async (req, res, next) => {
    try {
      const response = await getOnePriceList(req);
  
      res.status(StatusCodes.OK).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };
  
  const update = async (req, res, next) => {
    try {
      const response = await updatePriceList(req);
  
      res.status(StatusCodes.OK).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };
  
  const destroy = async (req, res, next) => {
    try {
      const response = await deletePriceList(req);
  
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
  