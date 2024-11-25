const express = require("express")
const cors = require("cors")
// const { sequelize } = require("./src/models/Pokemon_init") // Importa la configuración de Sequelize


const app = express()

require("./src/config/Pokemon_init") //Se creara la base de datos si esta no existe

app.use(express.json())
app.use(cors())

// //Se verifica la conexion a la base de datos
// sequelize.authenticate()
//     .then(() => console.log("Conexión a la base de datos exitosa."))
//     .catch(err => {
//         console.error("Error al conectar a la base de datos:", err);
//         process.exit(1); // Finaliza la app si no puede conectar
//     });

const pokemonRouter = require("./src/routes/pokedoku")
app.use(pokemonRouter)

// Verifica si el archivo no está siendo importado como un módulo en otro archivo
if(!module.parent){
    const port = process.env.PORT || 3000

    app.locals.fechaInicio = new Date()
    
    app.listen(port, () => {
        console.log("Sitio escuchando en el puerto ", port)
    })
}

module.exports = app