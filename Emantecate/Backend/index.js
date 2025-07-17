const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();


const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

require("./src/config/Emantecate_init.js");

app.use(express.json());
app.use(cors(corsOptions)); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const emantecateRouterProductos = require("./src/routes/productos.js");
const emantecateRouterRellenos = require("./src/routes/rellenos.js");
const emantecateRouterLogin = require("./src/routes/login.js");


app.use((req, res, next) => {
  const allowedOrigin = 'http://localhost:3000';
  const requestOrigin = req.headers.origin;
  
  if (requestOrigin && requestOrigin !== allowedOrigin) {
    return res.status(403).json({ error: 'Acceso no autorizado' });
  }
  
  
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
  
  next();
});


app.use("/", emantecateRouterLogin);
app.use(emantecateRouterProductos);
app.use(emantecateRouterRellenos);


if (!module.parent) {
  const port = process.env.PORT || 3001;
  
  app.locals.fechaInicio = new Date();
  
  app.listen(port, () => {
    console.log("Sitio escuchando en el puerto ", port);
    console.log("CORS configurado solo para: http://localhost:3000");
  });
}

module.exports = app;