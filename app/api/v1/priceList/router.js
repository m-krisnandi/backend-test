const express = require("express");
const { create, findAll, find, update, destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const router = express.Router();

router.post("/price-lists", authenticateUser, authorizeRoles(), create);
router.get("/price-lists", authenticateUser, findAll);
router.get("/price-lists/:id", authenticateUser, find);
router.patch("/price-lists/:id", authenticateUser, authorizeRoles(), update);
router.delete("/price-lists/:id", authenticateUser, authorizeRoles(), destroy);

module.exports = router;
