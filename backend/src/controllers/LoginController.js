const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Joi = require("joi");

// Valida os dados.
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Realiza o login de um usuário já cadastrado.
async function login(req, res) {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    const passwordMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!user || !passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Credenciais inválidas!" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ success: true, message: "Login efetuado com sucesso!", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor, tente novamente ou mais tarde!",
    });
  }
}

module.exports = {
  login,
};
