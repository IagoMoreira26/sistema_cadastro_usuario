const express = require("express");
const router = express.Router();
const ManageProfileController = require("../controllers/ManageProfileController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.get("/:id", authenticateToken, ManageProfileController.getProfileById);
router.put("/:id", authenticateToken, ManageProfileController.updateProfile);
router.delete("/:id", authenticateToken, ManageProfileController.deleteProfile);

module.exports = router;
