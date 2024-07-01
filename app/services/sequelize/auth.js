const User = require("../../api/v1/users/model");
const { BadRequestError, UnauthorizedError } = require("../../errors");
const { createJWT, createTokenUser } = require("../../utils");

const signin = async (req) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }

  const result = await User.findOne({ where: { email } });
  if (!result) throw new UnauthorizedError("Incorrect email or password");

  const isMatch = await result.comparePassword(password);
  if (!isMatch) throw new UnauthorizedError("Incorrect email or password");

  const token = createJWT({ payload: createTokenUser(result) });

  return { token, is_admin: result.is_admin };
};

module.exports = { signin };
