const express = require("express")
const cors = require("cors")

const app = express()

require("./src/config/Pokemon_init") //Se creara la base de datos si esta no existe

app.use(express.json())
app.use(cors())

// Verifica si el archivo no está siendo importado como un módulo en otro archivo
if(!module.parent){
    const port = process.env.PORT || 3000

    app.locals.fechaInicio = new Date()
    
    app.listen(port, () => {
        console.log("Sitio escuchando en el puerto ", port)
    })
}

module.exports = app