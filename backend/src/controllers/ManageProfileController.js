const Users = require("../models/User");
const Joi = require("joi");

const profileSchema = Joi.object({
  name: Joi.string().optional().allow(null, ""),
  surname: Joi.string().optional().allow(null, ""),
  profile_photo: Joi.string().optional().allow(null, ""),
  bio: Joi.string().optional().allow(null, ""),
});

async function getProfileById(req, res) {
  const { id } = req.params;

  try {
    const user = await Users.findOne({ where: { id } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Perfil não encontrado!" });
    }

    return res.status(200).json({
      success: true,
      profile: {
        username: user.username,
        email: user.email,
        name: user.name,
        surname: user.surname,
        profile_photo: user.profile_photo,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor, tente novamente ou mais tarde!",
    });
  }
}

async function updateProfile(req, res) {
  const { id } = req.params;
  const profileData = req.body;

  const { error } = profileSchema.validate(profileData);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Perfil não encontrado!" });
    }

    user.name = profileData.name || user.name;
    user.surname = profileData.surname || user.surname;
    user.profile_photo = profileData.profile_photo || user.profile_photo;
    user.bio = profileData.bio || user.bio;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Perfil atualizado com sucesso!",
      profile: {
        name: user.name,
        surname: user.surname,
        profile_photo: user.profile_photo,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor, tente novamente ou mais tarde!",
    });
  }
}

async function deleteProfile(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Perfil não encontrado!" });
    }

    await user.destroy();

    return res.status(200).json({
      success: true,
      message: "Perfil deletado com sucesso!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor, tente novamente ou mais tarde!",
    });
  }
}

module.exports = {
  getProfileById,
  updateProfile,
  deleteProfile,
};
