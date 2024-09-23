const Profile = require("../models/Profile");
const Joi = require("joi");

// Valida os dados ao criar um perfil.
const createProfileSchema = Joi.object({
  name: Joi.string().min(1).allow("").required(),
  surname: Joi.string().min(1).allow("").required(),
  profile_photo: Joi.string().allow(""),
  bio: Joi.string().allow(""),
});

// Valida os dados ao atualizar um perfil.
const updateProfileSchema = Joi.object({
  name: Joi.string().min(1).optional().allow(null, ""),
  surname: Joi.string().min(1).optional().allow(null, ""),
  profile_photo: Joi.string().optional().allow(null, ""),
  bio: Joi.string().optional().allow(null, ""),
});

// Função para criar um perfil.
async function createProfile(userId, profileData) {
  const { error } = createProfileSchema.validate(profileData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  try {
    const newProfile = await Profile.create({
      user_id: userId,
      name: profileData.name,
      surname: profileData.surname,
      profile_photo: profileData.profile_photo || "",
      bio: profileData.bio || "",
    });
    return newProfile;
  } catch (error) {
    console.error("Erro ao criar o perfil: ", error);
    throw new Error("Erro ao criar o perfil");
  }
}

// Função para buscar um perfil por ID.
async function getProfileById(req, res) {
  const { id } = req.params;

  try {
    const profile = await Profile.findOne({ where: { id } });

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Perfil não encontrado!" });
    }

    return res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor, tente novamente ou mais tarde!",
    });
  }
}

// Função para atualizar um perfil.
async function updateProfile(req, res) {
  const { id } = req.params;
  const profileData = req.body;

  const { error } = updateProfileSchema.validate(profileData);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  try {
    const profile = await Profile.findOne({ where: { id } });

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Perfil não encontrado!" });
    }

    // Atualiza somente os campos preenchidos.
    if (profileData.name) profile.name = profileData.name;
    if (profileData.surname) profile.surname = profileData.surname;
    if (profileData.profile_photo)
      profile.profile_photo = profileData.profile_photo;
    if (profileData.bio) profile.bio = profileData.bio;

    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Perfil atualizado com sucesso!",
      profile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor, tente novamente ou mais tarde!",
    });
  }
}

// Função para deletar um perfil.
async function deleteProfile(req, res) {
  const { id } = req.params;

  try {
    const profile = await Profile.findOne({ where: { id } });

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Perfil não encontrado!" });
    }

    await profile.destroy();

    return res
      .status(200)
      .json({ success: true, message: "Perfil deletado com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor, tente novamente mais tarde!",
    });
  }
}

module.exports = {
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
};
