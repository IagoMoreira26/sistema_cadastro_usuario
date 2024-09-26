const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const multer = require("multer");

// Configuração do multer para upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Diretório para armazenar os arquivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nome do arquivo com timestamp
  },
});

const upload = multer({ storage });

// Definição do esquema de validação
const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  profile_photo: Joi.string().optional(), // Se você espera uma string no caso de já ter uma foto
  name: Joi.string().optional(),
  surname: Joi.string().optional(),
  bio: Joi.string().optional(),
});

async function register(req, res) {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  const { username, email, password, name, surname, bio } = req.body;

  // Obtenha o caminho da imagem carregada, se existir
  const profile_photo = req.file ? req.file.path : null;

  try {
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email já está em uso!" });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username já está em uso!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      name: name || "",
      surname: surname || "",
      bio: bio || "",
      profile_photo, // Armazenar o caminho da imagem
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      success: true,
      message: "Usuário criado com sucesso!",
      user: newUser,
      token,
      profile_photo, // Inclua a URL da foto na resposta
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor. Tente novamente mais tarde.",
    });
  }
}

module.exports = {
  register,
  upload,
};
