const argon2 = require("argon2");
const User = require("../../api/v1/users/model");
const { BadRequestError, NotFoundError } = require("../../errors");
const { Op } = require("sequelize");

const createUser = async (req) => {
  const { name, email, password, confirmPassword, is_admin } = req.body;

  const userEmail = await User.findOne({
    where: { email },
  });

  if (userEmail) throw new BadRequestError("Email already use");

  if (password !== confirmPassword) {
    throw new BadRequestError("Password and confirm password are not the same");
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

const getOneUser = async (req) => {
  const { id } = req.params;

  const response = await User.findOne({
    where: { id: id },
  });

  if (!response) throw new NotFoundError("User not found");

  return response;
};

const updateUser = async (req) => {
  const { id } = req.params;
  const { name, email, password, is_admin } = req.body;

  const user = await User.findByPk(id);
  if (!user) throw new NotFoundError("User not found");

  if (email !== user.email) {
    const check = await User.findOne({
      where: {
        email,
        id: { [Op.ne]: id },
      },
    });

    if (check) throw new BadRequestError("Duplicate email");
  }

  // has password
  let hashedPassword = user.password;
  if (password) {
    hashedPassword = await argon2.hash(password);
  }

  // update user
  const response = await User.update(
    { name, email, password: hashedPassword, is_admin },
    {
      where: { id },
      returning: true,
      individualHooks: true,
    }
  );
  console.log(response);

  if (!response[1].length) throw new NotFoundError("User not found");

  return response[1][0];
};

const deleteUser = async (req) => {
  const { id } = req.params;

  const response = await User.findByPk(id);

  if (!response) throw new NotFoundError("User not found");

  await response.destroy();

  return response;
};

module.exports = {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
