const db = require("aa-sqlite");
const path = require("path")

/* TODO: agregar un campo UrlImagen que contenga la url de cada pokemon */
async function CrearBaseSiNoExiste() {
    try {
        await db.open(path.resolve(__dirname, "../../.data/Pokemon.db")); // Asegúrate de que la ruta sea correcta
        console.log("Base de datos abierta correctamente");
        
        let res = null;
        let existe = false;

        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'Kanto' ", 
            []
        )

        if (res.contar > 0) existe = true;

        if (!existe) {
            await db.run(
                "CREATE TABLE Kanto (" +
                "IdPokedex INTEGER PRIMARY KEY, " +
                "Name STRING NOT NULL, " +
                "EvolutionStage STRING NOT NULL, " +
                "FirstType STRING NOT NULL, " +
                "SecondType STRING, " +
                "Special STRING, " +
                "EvolutionMethod STRING" +
                ");"
            );
            console.log("Tabla Kanto creada con éxito");
            await db.run(
                "INSERT INTO Kanto (IdPokedex, Name, EvolutionStage, FirstType, SecondType, Special, EvolutionMethod)" +
                "VALUES " +
                "(1, 'BULBASAUR', 'INITIAL', 'GRASS', 'POISON', 'STARTER', NULL)," +
                "(2, 'IVYSAUR', 'MIDDLE', 'GRASS', 'POISON', 'STARTER', NULL)," +
                "(3, 'VENUSAUR', 'FINAL', 'GRASS', 'POISON', 'STARTER', NULL)," +
                "(4, 'CHARMANDER', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL)," +
                "(5, 'CHARMELEON', 'MIDDLE', 'FIRE', NULL, 'STARTER', NULL)," +
                "(6, 'CHARIZARD', 'FINAL', 'FIRE', 'FLYING', 'STARTER', NULL)," +
                "(7, 'SQUIRTLE', 'INITIAL', 'WATER', NULL, 'STARTER', NULL)," +
                "(8, 'WARTORTLE', 'MIDDLE', 'WATER', NULL, 'STARTER', NULL)," +
                "(9, 'BLASTOISE', 'FINAL', 'WATER', NULL, 'STARTER', NULL)," +
                "(10, 'CATERPIE', 'INITIAL', 'BUG', NULL, NULL, NULL)," +
                "(11, 'METAPOD', 'MIDDLE', 'BUG', NULL, NULL, NULL)," +
                "(12, 'BUTTERFREE', 'FINAL', 'BUG', 'FLYING', NULL, NULL)," +
                "(13, 'WEEDLE', 'INITIAL', 'BUG', 'POISON', NULL, NULL)," +
                "(14, 'KAKUNA', 'MIDDLE', 'BUG', 'POISON', NULL, NULL)," +
                "(15, 'BEEDRILL', 'FINAL', 'BUG', 'POISON', NULL, NULL)," +
                "(16, 'PIDGEY', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(17, 'PIDGEOTTO', 'MIDDLE', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(18, 'PIDGEOT', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(19, 'RATTATA', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(20, 'RATICATE', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(21, 'SPEAROW', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(22, 'FEAROW', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(23, 'EKANS', 'INTIAL', 'POISON', NULL, NULL, NULL)," +
                "(24, 'ARBOK', 'FINAL', 'POISON', NULL, NULL, NULL)," +
                "(25, 'PIKACHU', 'INITIAL', 'ELECTRIC', NULL, 'STARTER', NULL)," +
                "(26, 'RAICHU', 'FINAL', 'ELECTRIC', NULL, 'STARTER', 'ITEM')," +
                "(27, 'SANDSHREW', 'INITIAL', 'GROUND', NULL, NULL, NULL)," +
                "(28, 'SANDSLASH', 'FINAL', 'GROUND', NULL, NULL, NULL)," +
                "(29, 'NIDORAN♀', 'INITIAL', 'POISON', NULL, NULL, NULL)," +
                "(30, 'NIDORINA', 'MIDDLE', 'POISON', NULL, NULL, NULL)," +
                "(31, 'NIDOQUEEN', 'FINAL', 'POISON', 'GROUND', NULL, 'ITEM')," +
                "(32, 'NIDORAN♂', 'INITIAL', 'POISON', NULL, NULL, NULL)," +
                "(33, 'NIDORINO', 'MIDDLE', 'POISON', NULL, NULL, NULL)," +
                "(34, 'NIDOKING', 'FINAL', 'POISON', 'GROUND', NULL, 'ITEM')," +
                "(35, 'CLEFAIRY', 'INITIAL', 'FAIRY', NULL, NULL, NULL)," +
                "(36, 'CLEFABLE', 'FINAL', 'FAIRY', NULL, NULL, 'ITEM')," +
                "(37, 'VULPIX', 'INITIAL', 'FIRE', NULL, NULL, NULL)," +
                "(38, 'NINETALES', 'FINAL', 'FIRE', NULL, NULL, 'ITEM')," +
                "(39, 'JIGGLYPUFF', 'INITIAL', 'NORMAL', 'FAIRY', NULL, NULL)," +
                "(40, 'WIGGLYTUFF', 'FINAL', 'NORMAL', 'FAIRY', NULL, NULL)," +
                "(41, 'ZUBAT', 'INITIAL', 'POISON', 'FLYING', NULL, NULL)," +
                "(42, 'GOLBAT', 'FINAL', 'POISON', 'FLYING', NULL, NULL)," +
                "(43, 'ODDISH', 'INITIAL', 'GRASS', 'POISON', NULL, NULL)," +
                "(44, 'GLOOM', 'MIDDLE', 'GRASS', 'POISON', NULL, NULL)," +
                "(45, 'VILEPLUME', 'FINAL', 'GRASS', 'POISON', NULL, 'ITEM')," +
                "(46, 'PARAS', 'INITIAL', 'BUG', 'GRASS', NULL, NULL)," +
                "(47, 'PARASECT', 'FINAL', 'BUG', 'GRASS', NULL, NULL)," + 
                "(48, 'VENONAT', 'INITIAL', 'BUG', 'POISON', NULL, NULL)," +
                "(49, 'VENOMOTH', 'FINAL', 'BUG', 'POISON', NULL, NULL)," +
                "(50, 'DIGLETT', 'INITIAL', 'GROUND', NULL, NULL, NULL)," +
                "(51, 'DUGTRIO', 'FINAL', 'GROUND', NULL, NULL, NULL)," +
                "(52, 'MEOWTH', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(53, 'PERSIAN', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(54, 'PSYDUCK', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(55, 'GOLDUCK', 'FINAL', 'WATER', NULL, NULL, NULL)," +
                "(56, 'MANKEY', 'INITIAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(57, 'PRIMEAPE', 'FINAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(58, 'GROWLITHE', 'INITIAL', 'FIRE', NULL, NULL, NULL)," +
                "(59, 'ARCANINE', 'FINAL', 'FIRE', NULL, NULL, 'ITEM')," +
                "(60, 'POLIWAG', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(61, 'POLIWHIRL', 'MIDDLE', 'WATER', NULL, NULL, NULL)," +
                "(62, 'POLIWRATH', 'FINAL', 'WATER', 'FIGHTING', NULL, 'ITEM')," +
                "(63, 'ABRA', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(64, 'KADABRA', 'MIDDLE', 'PSYCHIC', NULL, NULL, NULL)," +
                "(65, 'ALAKAZAM', 'FINAL', 'PSYCHIC', NULL, NULL, 'TRADE')," +
                "(66, 'MACHOP', 'INITIAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(67, 'MACHOKE', 'MIDDLE', 'FIGHTING', NULL, NULL, NULL)," +
                "(68, 'MACHAMP', 'FINAL', 'FIGHTING', NULL, NULL, 'TRADE')," +
                "(69, 'BELLSPROUT', 'INITIAL', 'GRASS', 'POISON', NULL, NULL)," +
                "(70, 'WEEPINBELL', 'MIDDLE', 'GRASS', 'POISON', NULL, NULL)," +
                "(71, 'VICTREEBEL', 'FINAL', 'GRASS', 'POISON', NULL, 'ITEM')," +
                "(72, 'TENTACOOL', 'INITIAL', 'WATER', 'POISON', NULL, NULL)," +
                "(73, 'TENTACRUEL', 'FINAL', 'WATER', 'POISON', NULL, NULL)," +
                "(74, 'GEODUDE', 'INITIAL', 'ROCK', 'GROUND', NULL, NULL)," +
                "(75, 'GRAVELER', 'MIDDLE', 'ROCK', 'GROUND', NULL, NULL)," +
                "(76, 'GOLEM', 'FINAL', 'ROCK', 'GROUND', NULL, 'TRADE')," +
                "(77, 'PONYTA', 'INITIAL', 'FIRE', NULL, NULL, NULL)," +
                "(78, 'RAPIDASH', 'FINAL', 'FIRE', NULL, NULL, NULL)," +
                "(79, 'SLOWPOKE', 'INITIAL', 'WATER', 'PSYCHIC', NULL, 'ITEM')," +
                "(80, 'SLOWBRO', 'FINAL', 'WATER', 'PSYCHIC', NULL, NULL)," +
                "(81, 'MAGNEMITE', 'INITIAL', 'ELECTRIC', 'STEEL', NULL, NULL)," +
                "(82, 'MAGNETON', 'FINAL', 'ELECTRIC', 'STEEL', NULL, NULL)," +
                "(83, 'FARFETCHD', 'SINGLE', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(84, 'DODUO', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(85, 'DODRIO', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(86, 'SEEL', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(87, 'DEWGONG', 'FINAL', 'WATER', 'ICE', NULL, NULL)," +
                "(88, 'GRIMER', 'INITIAL', 'POISON', NULL, NULL, NULL)," +
                "(89, 'MUK', 'FINAL', 'POISON', NULL, NULL, NULL)," +
                "(90, 'SHELLDER', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(91, 'CLOYSTER', 'FINAL', 'WATER', 'ICE', NULL, 'ITEM')," +
                "(92, 'GASTLY', 'INITIAL', 'GHOST', 'POISON', NULL, NULL)," +
                "(93, 'HAUNTER', 'MIDDLE', 'GHOST', 'POISON', NULL, 'TRADE')," +
                "(94, 'GENGAR', 'FINAL', 'GHOST', 'POISON', NULL, NULL)," +
                "(95, 'ONIX', 'SINGLE', 'ROCK', 'GROUND', NULL, NULL)," +
                "(96, 'DROWZEE', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(97, 'HYPNO', 'FINAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(98, 'KRABBY', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(99, 'KINGLER', 'FINAL', 'WATER', NULL, NULL, NULL)," +
                "(100, 'VOLTORB', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL)," +
                "(101, 'ELECTRODE', 'FINAL', 'ELECTRIC', NULL, NULL, NULL)," +
                "(102, 'EXEGGCUTE', 'INITIAL', 'GRASS', 'PSYCHIC', NULL, 'ITEM')," +
                "(103, 'EXEGGUTOR', 'FINAL', 'GRASS', 'PSYCHIC', NULL, NULL)," +
                "(104, 'CUBONE', 'INITIAL', 'GROUND', NULL, NULL, NULL)," +
                "(105, 'MAROWAK', 'FINAL', 'GROUND', NULL, NULL, NULL)," +
                "(106, 'HITMONLEE', 'SINGLE', 'FIGHTING', NULL, NULL, NULL)," +
                "(107, 'HITMONCHAN', 'SINGLE', 'FIGHTING', NULL, NULL, NULL)," +
                "(108, 'LICKITUNG', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(109, 'KOFFING', 'INITIAL', 'POISON', NULL, NULL, NULL)," +
                "(110, 'WEEZING', 'FINAL', 'POISON', NULL, NULL, NULL)," +
                "(111, 'RHYHORN', 'INITIAL', 'GROUND', 'ROCK', NULL, NULL)," +
                "(112, 'RHYDON', 'FINAL', 'GROUND', 'ROCK', NULL, NULL)," +
                "(113, 'CHANSEY', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(114, 'TANGELA', 'SINGLE', 'GRASS', NULL, NULL, NULL)," +
                "(115, 'KANGASKHAN', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(116, 'HORSEA', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(117, 'SEADRA', 'FINAL', 'WATER', NULL, NULL, NULL)," +
                "(118, 'GOLDEEN', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(119, 'SEAKING', 'FINAL', 'WATER', NULL, NULL, NULL)," +
                "(120, 'STARYU', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(121, 'STARMIE', 'FINAL', 'WATER', 'PSYCHIC', NULL, 'ITEM')," +
                "(122, 'MR. MIME', 'SINGLE', 'PSYCHIC', 'FAIRY', NULL, NULL)," +
                "(123, 'SCYTHER', 'SINGLE', 'BUG', 'FLYING', NULL, NULL)," +
                "(124, 'JYNX', 'SINGLE', 'ICE', 'PSYCHIC', NULL, NULL)," +
                "(125, 'ELECTABUZZ', 'SINGLE', 'ELECTRIC', NULL, NULL, NULL)," +
                "(126, 'MAGMAR', 'SINGLE', 'FIRE', NULL, NULL, NULL)," +
                "(127, 'PINSIR', 'SINGLE', 'BUG', NULL, NULL, NULL)," +
                "(128, 'TAUROS', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(129, 'MAGIKARP', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(130, 'GYARADOS', 'FINAL', 'WATER', 'FLYING', NULL, NULL)," +
                "(131, 'LAPRAS', 'SINGLE', 'WATER', 'ICE', NULL, NULL)," +
                "(132, 'DITTO', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(133, 'EEVEE', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(134, 'VAPOREON', 'FINAL', 'WATER', NULL, NULL, 'ITEM')," +
                "(135, 'JOLTEON', 'FINAL', 'ELECTRIC', NULL, NULL, 'ITEM')," +
                "(136, 'FLAREON', 'FINAL', 'FIRE', NULL, NULL, 'ITEM')," +
                "(137, 'PORYGON', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(138, 'OMANYTE', 'INITIAL', 'ROCK', 'WATER', 'FOSSIL', NULL)," +
                "(139, 'OMASTAR', 'FINAL', 'ROCK', 'WATER', 'FOSSIL', NULL)," +
                "(140, 'KABUTO', 'INITIAL', 'ROCK', 'WATER', 'FOSSIL', NULL)," +
                "(141, 'KABUTOPS', 'FINAL', 'ROCK', 'WATER', 'FOSSIL', NULL)," +
                "(142, 'AERODACTYL', 'SINGLE', 'ROCK', 'FLYING', 'FOSSIL', NULL)," +
                "(143, 'SNORLAX', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(144, 'ARTICUNO', 'SINGLE', 'ICE', 'FLYING', 'LEGENDARY', NULL)," +
                "(145, 'ZAPDOS', 'SINGLE', 'ELECTRIC', 'FLYING', 'LEGENDARY', NULL)," +
                "(146, 'MOLTRES', 'SINGLE', 'FIRE', 'FLYING', 'LEGENDARY', NULL)," +
                "(147, 'DRATINI', 'INITIAL', 'DRAGON', NULL, NULL, NULL)," +
                "(148, 'DRAGONAIR', 'MIDDLE', 'DRAGON', NULL, NULL, NULL)," +
                "(149, 'DRAGONITE', 'FINAL', 'DRAGON', 'FLYING', NULL, NULL)," +
                "(150, 'MEWTWO', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL)," +
                "(151, 'MEW', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL);"

            )
            console.log("Datos cargados con exito")
        } else {
            console.log("La tabla Kanto ya existe");
        }

        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'Filters' ",
            []
        )

        if (res.contar > 0) existe = true

        if(!existe){
            await db.run(
                "CREATE TABLE Filters(" +
                "IdFilter INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "FilterX1 STRING NOT NULL, " +
                "FilterX2 STRING NOT NULL, " +
                "FilterX3 STRING NOT NULL, " +
                "FilterY1 STRING NOT NULL, " +
                "FilterY2 STRING NOT NULL, " +
                "FilterY3 STRING NOT NULL); "
            )
            console.log("Tabla Filters creada con exito!")
            await db.run(
                "INSERT INTO Filters (FilterX1, FilterX2, FilterX3, FilterY1, FilterY2, FilterY3)" +
                "VALUES " +
                "('POISON', 'NORMAL', 'ELECTRIC', 'FLYING', 'MONOTYPE', 'FINAL')," +
                "('DRAGON', 'NORMAL', 'PSYCHIC', 'INITIAL', 'MIDDLE', 'FINAL')," +
                "('FOSSIL', 'DUALTYPE', 'PSYCHIC', 'INITIAL', 'WATER', 'SINGLE')," +
                "('GRASS', 'WATER', 'FIRE', 'STARTER', 'FINAL', 'MONOTYPE');" 
            )
            console.log("Datos cargados con exito")
        }else{
            console.log("La tabla Filters ya existe")
        }
    } catch (error) {
        console.error("Error al crear la base de datos o acceder a ella:", error);
    }
}

CrearBaseSiNoExiste();
