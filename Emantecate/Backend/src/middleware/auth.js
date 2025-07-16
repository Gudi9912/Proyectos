const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado" })
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Acceso denegado: no sos admin" })
    }
    next()
  })
}

module.exports = authenticateToken
