const express = require ("express")
const router = express.Router()
const db = require("../models/Pokemon_init")
const { Op } = require("sequelize")

router.use(express.json())

//Consultar un pokemon por su nombre

router.get("/api/Pokedoku", async (req, res) => {
    try {
        const { Name } = req.query;

        if (!Name) {
            return res.status(400).json({ error: "El parámetro 'Name' es requerido" });
        }

        // Normalizar el término de búsqueda
        const searchTerm = Name.toLowerCase().replace(/[^a-z]/g, '');

        // Obtener todos los Pokémon
        const allPokemons = await db.Pokemon.findAll();

        // Asignar un puntaje a cada Pokémon basado en la coincidencia
        const scoredPokemons = allPokemons.map(pokemon => {
            const pokemonName = pokemon.Name.toLowerCase().replace(/[^a-z]/g, '');
            const score = calculateMatchScore(pokemonName, searchTerm);
            return { ...pokemon.toJSON(), score };
        });

        // Filtrar Pokémon que contengan todas las letras del término de búsqueda
        const filteredPokemons = scoredPokemons.filter(pokemon => 
            containsAllLetters(pokemon.Name.toLowerCase(), searchTerm)
        );

        // Ordenar por puntaje (mayor puntaje primero)
        filteredPokemons.sort((a, b) => b.score - a.score);

        // Respuesta exitosa
        return res.status(200).json(filteredPokemons);
    } catch (err) {
        console.error("Error al obtener los Pokémon:", err.message);
        return res.status(500).json({ error: "Error al obtener los Pokémon" });
    }
});

// Función para verificar si un nombre contiene todas las letras del término de búsqueda
function containsAllLetters(pokemonName, searchTerm) {
    const pokemonLetters = pokemonName.split('');
    const searchLetters = searchTerm.split('');
    return searchLetters.every(letter => pokemonLetters.includes(letter));
}

// Función para calcular el puntaje de coincidencia
function calculateMatchScore(pokemonName, searchTerm) {
    let score = 0;

    // Priorizar coincidencias exactas
    if (pokemonName === searchTerm) {
        score += 200; // Máxima prioridad si el nombre es exactamente igual
    }
    // Priorizar coincidencias exactas o subcadenas en el mismo orden
    if (pokemonName.includes(searchTerm)) {
        score += 100; // Máxima prioridad si el término está en el mismo orden
    }

    // Priorizar letras en el mismo orden, aunque no sean consecutivas
    let searchIndex = 0;
    for (let i = 0; i < pokemonName.length; i++) {
        if (pokemonName[i] === searchTerm[searchIndex]) {
            score += 10; // Aumentar el puntaje por cada letra en el orden correcto
            searchIndex++;
        }
    }

    // Priorizar Pokémon que contengan todas las letras del término de búsqueda
    if (containsAllLetters(pokemonName, searchTerm)) {
        score += 5;
    }

    return score;
}

//Consultar si un pokemon cumple con las condiciones dadas
router.post("/api/Pokedoku", async (req, res) => {
    const { Name, condiciones} = req.body 

    try {
        //Se busca el pokemon en la base de datos
        const pokemon = await db.Pokemon.findOne({
            where: {Name: Name}
        })

        //Si no se encontro, devuelve un mensaje
        if (!pokemon){
            return res.status(404).json({error: "Pokemon no encontrado"})
        }

        let coincidencias = 0
        const types = new Set(["FIRE", "WATER", "FLYING", "BUG", "DRAGON", "GRASS", "POISON", "GROUND", "ROCK", "FIGHTING", "PSYCHIC", "NORMAL", "FAIRY", "GHOST", "ELECTRIC", "ICE"])
        const special = new Set(["LEGENDARY", "FOSSIL", "STARTER", "ULTRA BEAST", "PARADOX", "MYTHICAL"])
        const evolutionStage = new Set(["INITIAL", "MIDDLE", "FINAL", "SINGLE"])
        const evolutionMethod = new Set(["TRADE", "ITEM", "FRIENDSHIP"])
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
            return res.json({ message: "El pokemon esta en la casilla correcta",
                IdPokedex: pokemon.IdPokedex
            })
        }
        return res.json({ message: "El pokemon no esta en la casilla correcta"})
    }catch(err){
        console.error(err.message)
        return res.status(500).json({ error: "Error al verificar el pokemon"})
    }
})


//Se obtiene un conjunto de filtros de la base de datos
router.get("/api/Filters", async (req, res) => {
    try{
        const totalRows = await db.Filters.count()
        const randomId = Math.floor(Math.random() * totalRows) + 1

        const filters = await db.Filters.findOne({
            where:{
                IdFilter : randomId
            }
        })

        if (!filters){
            console.log("Id fuera de indice: " + randomId)
            return res.status(500).json({error: "Id fuera de indice"})
        }

        return res.status(200).json(filters)
    }catch(err){
        console.error(err.message)
        return res.status(500).json({error: "Error interno del servidor"})
    }
})


module.exports = router