const express = require("express");
const { create, findAll, find, update, destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const router = express.Router();

router.post("/vehicle-brands", authenticateUser, authorizeRoles(), create);
router.get("/vehicle-brands", authenticateUser, findAll);
router.get("/vehicle-brands/:id", authenticateUser, find);
router.patch("/vehicle-brands/:id", authenticateUser, authorizeRoles(), update);
router.delete(
  "/vehicle-brands/:id",
  authenticateUser,
  authorizeRoles(),
  destroy
);

module.exports = router;
