const express = require("express");
const { create, findAll, find, update, destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const router = express.Router();

router.post("/vehicle-years", authenticateUser, authorizeRoles(), create);
router.get("/vehicle-years", authenticateUser, findAll);
router.get("/vehicle-years/:id", authenticateUser, find);
router.patch("/vehicle-years/:id", authenticateUser, authorizeRoles(), update);
router.delete(
  "/vehicle-years/:id",
  authenticateUser,
  authorizeRoles(),
  destroy
);

module.exports = router;
