require("dotenv").config({ path: "../.env" });

const express = require("express");
const { authenticateDataBase } = require("./config/dataBaseConnection");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares para JSON e URL'S.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importando as rotas.
const userRoutes = require("./routes/UserRoutes");
const profileRoutes = require("./routes/ProfileRoutes");
const loginRoutes = require("./routes/LoginRoutes");

// Usando as rotas.
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/login", loginRoutes);

// Tratamento de erros.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro no servidor!" });
});

authenticateDataBase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SERVER ONLINE | PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("ERROR! FAILED TO CONNECT TO SERVER BECAUSE OF THE DATABASE");
  });
