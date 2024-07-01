const argon2 = require("argon2");
const User = require("../../api/v1/users/model");
const { BadRequestError } = require("../../errors");

const createUser = async (req) => {
  const { name, email, password, confirmPassword, is_admin } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password dan confirm password tidak sama");
  }

  const hashPassword = await argon2.hash(password);

  const response = await User.create({
    name: name,
    email: email,
    password: hashPassword,
    is_admin: is_admin,
  });

  return response;
};

const getAllUsers = async (req) => {
  const response = await User.findAll({
    attributes: ["id", "name", "email", "is_admin", "createdAt", "updatedAt"],
  });

  return response;
};

module.exports = { createUser, getAllUsers };
