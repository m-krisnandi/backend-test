const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    // check heade
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new UnauthenticatedError("Token not define");
    }

    const payload = isTokenValid({ token });

    // set user
    req.user = {
      id: payload.userId,
      name: payload.name,
      email: payload.email,
      is_admin: payload.is_admin,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const authorizeRoles = () => {
  return (req, res, next) => {
    if (!req.user.is_admin) {
      throw new UnauthorizedError("You do not have access");
    }

    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
