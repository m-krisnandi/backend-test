const express = require("express");
const { create, findAll, find, update, destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const router = express.Router();

router.post("/vehicle-models", authenticateUser, authorizeRoles(), create);
router.get("/vehicle-models", authenticateUser, findAll);
router.get("/vehicle-models/:id", authenticateUser, find);
router.patch("/vehicle-models/:id", authenticateUser, authorizeRoles(), update);
router.delete(
  "/vehicle-models/:id",
  authenticateUser,
  authorizeRoles(),
  destroy
);

module.exports = router;
