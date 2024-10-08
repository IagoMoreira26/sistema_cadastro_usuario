require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const express = require("express");
const { authenticateDataBase } = require("./config/dataBaseConnection");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares para JSON e URL'S.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Chamando o frontend.
app.use(express.static(path.join(__dirname, "../../frontend")));
app.use("/pages", express.static(path.join(__dirname, "../../frontend/pages")));

// Importando as rotas.
const userRoutes = require("./routes/UserRoutes");
const ManageProfileRoutes = require("./routes/ManageProfileRoutes");
const loginRoutes = require("./routes/LoginRoutes");

// Usando as rotas.
app.use("/api/users", userRoutes);
app.use("/api/profiles", ManageProfileRoutes);
app.use("/api/login", loginRoutes);

// Tratamento de erros.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro no servidor!" });
});

// Rota para tratamento de 404.
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada!" });
});

// Conexão ao banco de dados e inicialização do servidor.
authenticateDataBase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SERVER ONLINE | PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("ERROR! FAILED TO CONNECT TO SERVER BECAUSE OF THE DATABASE");
  });
