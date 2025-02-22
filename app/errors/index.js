const BadRequestError = require("./bad-request");
const CustomAPIError = require("./custom-api-error");
const NotFoundError = require("./not-found");
const UnauthenticatedError = require("./unauthenticated");
const UnauthorizedError = require("./unauthorized");

module.exports = {
  CustomAPIError,
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
};
