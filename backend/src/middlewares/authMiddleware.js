const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  console.log("Authorization Header:", req.headers["authorization"]);
  console.log("Token:", token);

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token inválido:", err);
      return res.sendStatus(403);
    }
    console.log("Usuário autenticado:", user);
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
};
