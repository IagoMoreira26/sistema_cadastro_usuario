const express = require("express");
const router = express.Router();
const ManageProfileController = require("../controllers/ManageProfileController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { name, surname, profile_photo, bio } = req.body;

  try {
   
    const photoToSave = profile_photo || "default-photo.png"; // Substitua pela sua imagem padrão

    const newProfile = await ManageProfileController.createProfile(userId, {
      name,
      surname,
      profile_photo: photoToSave,
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

router.get("/:id", authenticateToken, ManageProfileController.getProfileById);
router.put("/:id", authenticateToken, ManageProfileController.updateProfile);
router.delete("/:id", authenticateToken, ManageProfileController.deleteProfile);

module.exports = router;
