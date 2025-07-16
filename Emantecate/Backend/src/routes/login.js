const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()

router.use(express.json())

router.post("/api/login", (req, res) => {
  const { email, password } = req.body
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
  const JWT_SECRET = process.env.JWT_SECRET

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET) {
    return res.status(500).json({ message: "Configuración del servidor incompleta" })
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Credenciales incorrectas" })
  }

  const token = jwt.sign({ role: "admin", email }, JWT_SECRET, { expiresIn: "2h" })

  return res.status(200).json({ token })
})

module.exports = router
