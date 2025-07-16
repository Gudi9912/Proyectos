const express = require("express")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const app = express()

require("./src/config/Emantecate_init.js") 

app.use(express.json())
app.use(cors())
app.use("/uploads", express.static(path.join(__dirname,"uploads")))
const emantecateRouterProductos = require("./src/routes/productos.js")
const emantecateRouterRellenos = require("./src/routes/rellenos.js")
const emantecateRouterLogin = require("./src/routes/login.js")
app.use("/", emantecateRouterLogin)
app.use(emantecateRouterProductos)
app.use(emantecateRouterRellenos)


// Verifica si el archivo no está siendo importado como un módulo en otro archivo
if(!module.parent){
    const port = process.env.PORT || 3001

    app.locals.fechaInicio = new Date()
    
    app.listen(port, () => {
        console.log("Sitio escuchando en el puerto ", port)
    })
}

module.exports = app