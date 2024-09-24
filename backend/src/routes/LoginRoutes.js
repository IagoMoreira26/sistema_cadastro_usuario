const express = require("express");
const router = express.Router();
const { login } = require("../controllers/LoginController");
const path = require("path");

router.post("/login", login);

module.exports = router;
