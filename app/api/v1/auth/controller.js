const { StatusCodes } = require("http-status-codes");
const { signin } = require("../../../services/sequelize/auth");

const signIn = async (req, res, next) => {
  try {
    const result = await signin(req);

    res.status(StatusCodes.CREATED).json({
      data: { token: result.token, is_admin: result.is_admin },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signIn };
