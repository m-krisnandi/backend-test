const { Op } = require("sequelize");
const PriceList = require("../../api/v1/priceList/model");
const VehicleModel = require("../../api/v1/vehicleModel/model");
const VehicleYear = require("../../api/v1/vehicleYear/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const createPriceList = async (req) => {
  const { code, price, vehicleYearId, vehicleModelId } = req.body;

  const checkCode = await PriceList.findOne({
    where: { code },
  });

  if (checkCode) throw new BadRequestError("Duplicate code");

  const response = await PriceList.create({
    code,
    price,
    vehicleYearId,
    vehicleModelId,
  });

  return response;
};

const getAllPriceLists = async (req) => {
  const { code, price, year_id, model_id, limit, offset } = req.query;

  const limitValue = parseInt(limit, 10) || 10;
  const offsetValue = parseInt(offset, 10) || 0;

  const whereConditions = {};
  if (code) {
    whereConditions.code = { [Op.iLike]: `%${code}%` };
  }

  if (price) {
    whereConditions.price = { [Op.eq]: price };
  }

  if (year_id) {
    whereConditions.vehicleYearId = year_id;
  }

  if (model_id) {
    whereConditions.vehicleModelId = model_id;
  }

  const { count, rows } = await PriceList.findAndCountAll({
    where: whereConditions,
    include: [
      {
        model: VehicleYear,
        attributes: ["id", "year"],
      },
      {
        model: VehicleModel,
        attributes: ["id", "name"],
      },
    ],
    limit: limitValue,
    offset: offsetValue,
  });

  const formattedResponse = rows.map((priceList) => ({
    id: priceList.id,
    code: priceList.code,
    price: priceList.price,
    vehicle_year: {
      id: priceList.vehicle_year.id,
      year: priceList.vehicle_year.year,
    },
    vehicle_model: {
      id: priceList.vehicle_model.id,
      name: priceList.vehicle_model.name,
    },
    createdAt: priceList.createdAt,
    updatedAt: priceList.updatedAt,
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

const getOnePriceList = async (req) => {
  const { id } = req.params;

  const response = await PriceList.findOne({
    where: { id: id },
    include: [
      {
        model: VehicleYear,
        attributes: ["id", "year"],
      },
      {
        model: VehicleModel,
        attributes: ["id", "name"],
      },
    ],
  });

  if (!response) throw new NotFoundError("PriceList not found");

  const {
    id: priceListId,
    code,
    price,
    createdAt,
    updatedAt,
    vehicle_year,
    vehicle_model,
  } = response.toJSON();
  const responseData = {
    id: priceListId,
    code,
    price,
    vehicle_year,
    vehicle_model,
    createdAt,
    updatedAt,
  };

  return responseData;
};

const updatePriceList = async (req) => {
  const { id } = req.params;
  const { code, price, vechicleYearId, vehicleModelId } = req.body;

  const priceList = await PriceList.findByPk(id);
  if (!priceList) throw new NotFoundError("PriceList not found");

  const checkCode = await PriceList.findOne({
    where: { code },
  });

  if (checkCode) throw new BadRequestError("Duplicate code");

  // update PriceList
  const response = await PriceList.update(
    { code, price, vechicleYearId, vehicleModelId },
    {
      where: { id },
      returning: true,
      individualHooks: true,
    }
  );
  console.log(response);

  if (!response[1].length) throw new NotFoundError("PriceList not found");

  return response[1][0];
};

const deletePriceList = async (req) => {
  const { id } = req.params;

  const response = await PriceList.findByPk(id);

  if (!response) throw new NotFoundError("PriceList not found");

  await response.destroy();

  return response;
};

module.exports = {
  createPriceList,
  getAllPriceLists,
  getOnePriceList,
  updatePriceList,
  deletePriceList,
};
