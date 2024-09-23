const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { createProfile } = require("./ProfileController");
const Joi = require("joi");

// Valida os dados de cadastro.
const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Registra um novo usuário.
async function register(req, res) {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  const { username, email, password } = req.body;

  try {
    // Verifica se o email já está em uso.
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email já está em uso!" });
    }

    // Verifica se o username já está em uso.
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username já está em uso!" });
    }

    // Cria o hash da senha.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário.
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Cria o perfil do usuário com valores padrões.
    const profileData = {
      name: "",
      surname: "",
      profile_photo: "",
      bio: "",
    };
    await createProfile(newUser.id, profileData);

    // Gera o token JWT.
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      success: true,
      message: "Usuário criado com sucesso!",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor. Tente novamente ou mais tarde!",
    });
  }
}

module.exports = {
  register,
};
