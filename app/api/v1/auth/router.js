const express = require("express");
const { signIn } = require("./controller");
const router = express.Router();

router.post("/auth/signin", signIn);

module.exports = router;
