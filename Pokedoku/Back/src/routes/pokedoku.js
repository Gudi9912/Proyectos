const express = require ("express")
const router = express.Router()
const db = require("../models/Pokemon_init")
const { Op } = require("sequelize")

router.use(express.json())

router.get("/api/", async (req, res) => {
    try {
        const pokemons = await db.Kanto.findAll()
        return res.status(200).json(pokemons)
    }catch(err){
        console.log(err)
    }
})
// Endpoint mejorado para obtener Pokémon
router.get("/api/Pokedoku", async (req, res) => {
    try {
        const { Name } = req.query;

        // Construye dinámicamente los criterios de búsqueda
        const whereClause = Name
            ? { Name: { [Op.like]: `%${Name}%` } }
            : {};

        // Consulta a la base de datos
        const pokemons = await db.Kanto.findAll({ where: whereClause });

        // Respuesta exitosa
        return res.status(200).json(pokemons);
    } catch (err) {
        console.error("Error al obtener los Pokémon:", err.message);
        return res.status(500).json({ error: "Error al obtener los Pokémon" });
    }
});

router.post("/api/Pokedoku", async (req, res) => {
    const { Name, condiciones} = req.body //Condiciones es un objeto

    try {
        //Se busca el pokemon en la base de datos
        const pokemon = await db.Kanto.findOne({
            where: {Name: Name}
        })

        //Si no se encontro, devuelve un mensaje
        if (!pokemon){
            return res.status(404).json({error: "Pokemon no encontrado"})
        }

        let coincidencias = 0
        const types = new Set(["FIRE", "WATER", "FLYING", "BUG", "DRAGON", "GRASS", "POISON", "GROUND", "ROCK", "FIGHTING", "PSYCHIC", "NORMAL", "FAIRY", "GHOST", "ELECTRIC", "ICE"])
        const special = new Set(["LEGENDARY", "FOSSIL", "STARTER"])
        const evolutionStage = new Set(["INITIAL", "MIDDLE", "FINAL", "SINGLE"])
        const evolutionMethod = new Set(["TRADE", "ITEM"])
        //Se itera sobre condiciones creando campo y valorCondicion, campo contendra el nombre del campo (ej: FirstType)
        //mientras que valor condicion contendra el valor de ese campo (ej: Fire)
        for (let [condicion, valorCondicion] of Object.entries(condiciones)) {
            //Se verifica primero si existe el campo en el pokemon, 
            //luego se verifica que su contenido sea igual al valorCondicion
            //Se verifica si el campo es monotypo, de ser asi se pregunta por el valor del segundo tipo
            if (valorCondicion === "MONOTYPE" && !pokemon["SecondType"]){
                coincidencias++
                continue
            }
            //Si es dualtype y tiene un segundo tipo, es coincidencia
            if (valorCondicion === "DUALTYPE" && pokemon["SecondType"]){
                coincidencias++
                continue
            }
            if (types.has(valorCondicion) && (pokemon["FirstType"] === valorCondicion || pokemon["SecondType"] === valorCondicion)){
                coincidencias++
                continue
            }
            if (special.has(valorCondicion) && (pokemon["Special"] === valorCondicion)){
                coincidencias++
                continue
            }
            if (evolutionStage.has(valorCondicion) && (pokemon["EvolutionStage"] === valorCondicion)){
                coincidencias++
                continue
            }
            if (evolutionMethod.has(valorCondicion) && (pokemon["EvolutionMethod"] === valorCondicion)){
                coincidencias++
                continue
            }
        }

        //Si tenemos dos coincidencias significa que el pokemon cumplio ambas condiciones, por lo que es correcto
        if (coincidencias === 2){
            console.log("El pokemon esta en la casilla correcta")
            return res.json({ message: "El pokemon esta en la casilla correcta"})
        }
        return res.json({ message: "El pokemon no esta en la casilla correcta"})
    }catch(err){
        console.error(err.message)
        return res.status(500).json({ error: "Error al verificar el pokemon"})
    }
})

module.exports = router