const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/ProfileController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { name, surname, profile_photo, bio } = req.body;

  try {
    const newProfile = await ProfileController.createProfile(userId, {
      name,
      surname,
      profile_photo,
      bio,
    });
    return res
      .status(201)
      .json({ message: "Perfil criado com sucesso!", profile: newProfile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar perfil" });
  }
});

router.get("/:id", authenticateToken, ProfileController.getProfileById);
router.put("/:id", authenticateToken, ProfileController.updateProfile);
router.delete("/:id", authenticateToken, ProfileController.deleteProfile);

module.exports = router;
