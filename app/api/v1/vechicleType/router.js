const express = require("express");
const { create, findAll, find, update, destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const router = express.Router();

router.post("/vehicle-types", authenticateUser, authorizeRoles(), create);
router.get("/vehicle-types", authenticateUser, findAll);
router.get("/vehicle-types/:id", authenticateUser, find);
router.patch("/vehicle-types/:id", authenticateUser, authorizeRoles(), update);
router.delete(
  "/vehicle-types/:id",
  authenticateUser,
  authorizeRoles(),
  destroy
);

module.exports = router;
