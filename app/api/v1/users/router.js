const express = require("express");
const { create, findAll } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const router = express.Router();

router.post("/users", create);
router.get("/users", authenticateUser, findAll);

module.exports = router;
