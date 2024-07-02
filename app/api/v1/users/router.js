const express = require("express");
const { create, findAll, find, update, destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const router = express.Router();

router.post("/users", create);
router.get("/users", authenticateUser, findAll);
router.get("/users/:id", authenticateUser, find);
router.patch("/users/:id", authenticateUser, authorizeRoles(), update);
router.delete("/users/:id", authenticateUser, authorizeRoles(), destroy);

module.exports = router;
