const createTokenUser = (user) => {
  return {
    userId: user.id,
    name: user.name,
    email: user.email,
    is_admin: user.is_admin,
  };
};

module.exports = { createTokenUser };
