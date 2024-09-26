const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post(
  "/register",
  UserController.upload.single("profile_photo"),
  UserController.register
);

module.exports = router;
