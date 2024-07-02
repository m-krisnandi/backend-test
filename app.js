const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

const usersRouter = require("./app/api/v1/users/router");
const authRouter = require("./app/api/v1/auth/router");
const vehicleBrandRouter = require("./app/api/v1/vehicleBrand/router");
const vehicleTypeRouter = require("./app/api/v1/vechicleType/router");

// middlewares
const notFoundMiddleware = require("./app/middlewares/not-found");
const errorHandleMiddleware = require("./app/middlewares/handle-error");

const v1 = "/api/v1";

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(`${v1}`, usersRouter);
app.use(`${v1}`, authRouter);
app.use(`${v1}`, vehicleBrandRouter);
app.use(`${v1}`, vehicleTypeRouter);

// catch 404 and forward to error handler
app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

module.exports = app;
