const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default error
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong",
  };

  // error validation dari sequielize
  if (err.name === "ValidationError") {
    customError.msg = err.errors.map((e) => e.message).join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // error duplicate key
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate field value entered for ${Object.keyValue} field, please use another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customError.msg = `Item not found with id : ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return res.status(customError.statusCode).json({
    msg: customError.msg,
  });
};

module.exports = errorHandlerMiddleware;
