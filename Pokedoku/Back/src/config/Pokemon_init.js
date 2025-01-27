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
                "(23, 'EKANS', 'INITIAL', 'POISON', NULL, NULL, NULL)," +
                "(24, 'ARBOK', 'FINAL', 'POISON', NULL, NULL, NULL)," +
                "(25, 'PIKACHU', 'MIDDLE', 'ELECTRIC', NULL, 'STARTER', NULL)," +
                "(26, 'RAICHU', 'FINAL', 'ELECTRIC', NULL, 'STARTER', 'ITEM')," +
                "(27, 'SANDSHREW', 'INITIAL', 'GROUND', NULL, NULL, NULL)," +
                "(28, 'SANDSLASH', 'FINAL', 'GROUND', NULL, NULL, NULL)," +
                "(29, 'NIDORAN♀', 'INITIAL', 'POISON', NULL, NULL, NULL)," +
                "(30, 'NIDORINA', 'MIDDLE', 'POISON', NULL, NULL, NULL)," +
                "(31, 'NIDOQUEEN', 'FINAL', 'POISON', 'GROUND', NULL, 'ITEM')," +
                "(32, 'NIDORAN♂', 'INITIAL', 'POISON', NULL, NULL, NULL)," +
                "(33, 'NIDORINO', 'MIDDLE', 'POISON', NULL, NULL, NULL)," +
                "(34, 'NIDOKING', 'FINAL', 'POISON', 'GROUND', NULL, 'ITEM')," +
                "(35, 'CLEFAIRY', 'MIDDLE', 'FAIRY', NULL, NULL, NULL)," +
                "(36, 'CLEFABLE', 'FINAL', 'FAIRY', NULL, NULL, 'ITEM')," +
                "(37, 'VULPIX', 'INITIAL', 'FIRE', NULL, NULL, NULL)," +
                "(38, 'NINETALES', 'FINAL', 'FIRE', NULL, NULL, 'ITEM')," +
                "(39, 'JIGGLYPUFF', 'MIDDLE', 'NORMAL', 'FAIRY', NULL, NULL)," +
                "(40, 'WIGGLYTUFF', 'FINAL', 'NORMAL', 'FAIRY', NULL, NULL)," +
                "(41, 'ZUBAT', 'INITIAL', 'POISON', 'FLYING', NULL, NULL)," +
                "(42, 'GOLBAT', 'MIDDLE', 'POISON', 'FLYING', NULL, NULL)," +
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
                "(57, 'PRIMEAPE', 'MIDDLE', 'FIGHTING', NULL, NULL, NULL)," +
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
                "(95, 'ONIX', 'INITIAL', 'ROCK', 'GROUND', NULL, NULL)," +
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
                "(106, 'HITMONLEE', 'FINAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(107, 'HITMONCHAN', 'FINAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(108, 'LICKITUNG', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(109, 'KOFFING', 'INITIAL', 'POISON', NULL, NULL, NULL)," +
                "(110, 'WEEZING', 'FINAL', 'POISON', NULL, NULL, NULL)," +
                "(111, 'RHYHORN', 'INITIAL', 'GROUND', 'ROCK', NULL, NULL)," +
                "(112, 'RHYDON', 'MIDDLE', 'GROUND', 'ROCK', NULL, NULL)," +
                "(113, 'CHANSEY', 'MIDDLE', 'NORMAL', NULL, NULL, NULL)," +
                "(114, 'TANGELA', 'INITIAL', 'GRASS', NULL, NULL, NULL)," +
                "(115, 'KANGASKHAN', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(116, 'HORSEA', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(117, 'SEADRA', 'MIDDLE', 'WATER', NULL, NULL, NULL)," +
                "(118, 'GOLDEEN', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(119, 'SEAKING', 'FINAL', 'WATER', NULL, NULL, NULL)," +
                "(120, 'STARYU', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(121, 'STARMIE', 'FINAL', 'WATER', 'PSYCHIC', NULL, 'ITEM')," +
                "(122, 'MR. MIME', 'FINAL', 'PSYCHIC', 'FAIRY', NULL, NULL)," +
                "(123, 'SCYTHER', 'INITIAL', 'BUG', 'FLYING', NULL, NULL)," +
                "(124, 'JYNX', 'FINAL', 'ICE', 'PSYCHIC', NULL, NULL)," +
                "(125, 'ELECTABUZZ', 'MIDDLE', 'ELECTRIC', NULL, NULL, NULL)," +
                "(126, 'MAGMAR', 'MIDDLE', 'FIRE', NULL, NULL, NULL)," +
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
                "(137, 'PORYGON', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(138, 'OMANYTE', 'INITIAL', 'ROCK', 'WATER', 'FOSSIL', NULL)," +
                "(139, 'OMASTAR', 'FINAL', 'ROCK', 'WATER', 'FOSSIL', NULL)," +
                "(140, 'KABUTO', 'INITIAL', 'ROCK', 'WATER', 'FOSSIL', NULL)," +
                "(141, 'KABUTOPS', 'FINAL', 'ROCK', 'WATER', 'FOSSIL', NULL)," +
                "(142, 'AERODACTYL', 'SINGLE', 'ROCK', 'FLYING', 'FOSSIL', NULL)," +
                "(143, 'SNORLAX', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(144, 'ARTICUNO', 'SINGLE', 'ICE', 'FLYING', 'LEGENDARY', NULL)," +
                "(145, 'ZAPDOS', 'SINGLE', 'ELECTRIC', 'FLYING', 'LEGENDARY', NULL)," +
                "(146, 'MOLTRES', 'SINGLE', 'FIRE', 'FLYING', 'LEGENDARY', NULL)," +
                "(147, 'DRATINI', 'INITIAL', 'DRAGON', NULL, NULL, NULL)," +
                "(148, 'DRAGONAIR', 'MIDDLE', 'DRAGON', NULL, NULL, NULL)," +
                "(149, 'DRAGONITE', 'FINAL', 'DRAGON', 'FLYING', NULL, NULL)," +
                "(150, 'MEWTWO', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL)," +
                "(151, 'MEW', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL), " +
                "(152, 'CHIKORITA', 'INITIAL', 'GRASS', NULL, 'STARTER', NULL)," +
                "(153, 'BAYLEEF', 'MIDDLE', 'GRASS', 'STARTER', NULL, NULL), " + 
                "(154, 'MEGANIUM', 'FINAL', 'GRASS', NULL, 'STARTER', NULL), " +
                "(155, 'CYNDAQUIL', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL), " +
                "(156, 'QUILAVA', 'MIDDLE', 'FIRE', NULL, 'STARTER', NULL)," +
                "(157, 'TYPHLOSION', 'FINAL', 'FIRE', NULL, 'STARTER', NULL)," +
                "(158, 'TOTODILE', 'INITIAL', 'WATER', NULL, 'STARTER', NULL)," +
                "(159, 'CROCONAW', 'MIDDLE', 'WATER', NULL, 'STARTER', NULL), " +
                "(160, 'FERALIGATR', 'FINAL', 'WATER', NULL, 'STARTER', NULL)," +
                "(161, 'SENTRET', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(162, 'FURRET', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(163, 'HOOTHOOT', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(164, 'NOCTOWL', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(165, 'LEDYBA', 'INITIAL', 'BUG', 'FLYING', NULL, NULL)," +
                "(166, 'LEDIAN', 'FINAL', 'BUG', 'FLYING', NULL, NULL)," +
                "(167, 'SPINARAK', 'INITIAL', 'BUG', 'POISON', NULL, NULL)," +
                "(168, 'ARIADOS', 'FINAL', 'BUG', 'POISON', NULL, NULL)," +
                "(169, 'CROBAT', 'FINAL', 'POISON', 'FLYING', NULL, 'FRIENDSHIP')," +
                "(170, 'CHINCHOU', 'INITIAL', 'WATER', 'ELECTRIC', NULL, NULL)," +
                "(171, 'LANTURN', 'FINAL', 'WATER', 'ELECTRIC', NULL, NULL)," +
                "(172, 'PICHU', 'INITIAL', 'ELECTRIC', NULL, NULL, 'FRIENDSHIP')," +
                "(173, 'CLEFFA', 'INITIAL', 'FAIRY', NULL, NULL, 'FRIENDSHIP')," +
                "(174, 'IGGLYBUFF', 'INITIAL', 'NORMAL', 'FAIRY', NULL, 'FRIENDSHIP')," +
                "(175, 'TOGEPI', 'INITIAL', 'FAIRY', NULL, NULL, 'FRIENDSHIP')," +
                "(176, 'TOGETIC', 'MIDDLE', 'FAIRY', 'FLYING', NULL, 'ITEM')," +
                "(177, 'NATU', 'INITIAL', 'PSYCHIC', 'FLYING', NULL, NULL)," +
                "(178, 'XATU', 'FINAL', 'PSYCHIC', 'FLYING', NULL, NULL)," +
                "(179, 'MAREEP', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL)," +
                "(180, 'FLAAFFY', 'MIDDLE', 'ELECTRIC', NULL, NULL, NULL)," +
                "(181, 'AMPHAROS', 'FINAL', 'ELECTRIC', NULL, NULL, NULL)," +
                "(182, 'BELLOSSOM', 'FINAL', 'GRASS', NULL, NULL, 'ITEM')," +
                "(183, 'MARILL', 'MIDDLE', 'WATER', 'FAIRY', NULL, NULL)," +
                "(184, 'AZUMARILL', 'FINAL', 'WATER', 'FAIRY', NULL, NULL)," +
                "(185, 'SUDOWOODO', 'SINGLE', 'ROCK', NULL, NULL, NULL)," +
                "(186, 'POLITOED', 'FINAL', 'WATER', NULL, NULL, 'TRADE')," +
                "(187, 'HOPPIP', 'INITIAL', 'GRASS', 'FLYING', NULL, NULL)," +
                "(188, 'SKIPLOOM', 'MIDDLE', 'GRASS', 'FLYING', NULL, NULL)," +
                "(189, 'JUMPLUFF', 'FINAL', 'GRASS', 'FLYING', NULL, NULL)," +
                "(190, 'AIPOM', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(191, 'SUNKERN', 'INITIAL', 'GRASS', NULL, NULL, NULL)," +
                "(192, 'SUNFLORA', 'FINAL', 'GRASS', NULL, NULL, 'ITEM')," +
                "(193, 'YANMA', 'INITIAL', 'BUG', 'FLYING', NULL, NULL)," +
                "(194, 'WOOPER', 'INITIAL', 'WATER', 'GROUND', NULL, NULL)," +
                "(195, 'QUAGSIRE', 'FINAL', 'WATER', 'GROUND', NULL, NULL)," +
                "(196, 'ESPEON', 'FINAL', 'PSYCHIC', NULL, NULL, 'FRIENDSHIP')," +
                "(197, 'UMBREON', 'FINAL', 'DARK', NULL, NULL, 'FRIENDSHIP')," +
                "(198, 'MURKROW', 'INITIAL', 'DARK', 'FLYING', NULL, NULL)," +
                "(199, 'SLOWKING', 'FINAL', 'WATER', 'PSYCHIC', NULL, 'TRADE')," +
                "(200, 'MISDREAVUS', 'INITIAL', 'GHOST', NULL, NULL, NULL)," +
                "(201, 'UNOWN', 'SINGLE', 'PSYCHIC', NULL, NULL, NULL)," +
                "(202, 'WOBBUFFET', 'MIDDLE', 'PSYCHIC', NULL, NULL, NULL)," +
                "(203, 'GIRAFARIG', 'INITIAL', 'NORMAL', 'PSYCHIC', NULL, NULL)," +
                "(204, 'PINECO', 'INITIAL', 'BUG', NULL, NULL, NULL)," +
                "(205, 'FORRETRESS', 'FINAL', 'BUG', 'STEEL', NULL, NULL)," +
                "(206, 'DUNSPARCE', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(207, 'GLIGAR', 'INITIAL', 'GROUND', 'FLYING', NULL, NULL)," +
                "(208, 'STEELIX', 'FINAL', 'STEEL', 'GROUND', NULL, 'TRADE')," +
                "(209, 'SNUBBULL', 'INITIAL', 'FAIRY', NULL, NULL, NULL)," +
                "(210, 'GRANBULL', 'FINAL', 'FAIRY', NULL, NULL, NULL)," +
                "(211, 'QWILFISH', 'SINGLE', 'WATER', 'POISON', NULL, NULL)," +
                "(212, 'SCIZOR', 'FINAL', 'BUG', 'STEEL', NULL, 'TRADE')," +
                "(213, 'SHUCKLE', 'SINGLE', 'BUG', 'ROCK', NULL, NULL)," +
                "(214, 'HERACROSS', 'SINGLE', 'BUG', 'FIGHTING', NULL, NULL)," +
                "(215, 'SNEASEL', 'INITIAL', 'DARK', 'ICE', NULL, NULL)," +
                "(216, 'TEDDIURSA', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(217, 'URSARING', 'MIDDLE', 'NORMAL', NULL, NULL, NULL)," +
                "(218, 'SLUGMA', 'INITIAL', 'FIRE', NULL, NULL, NULL)," +
                "(219, 'MAGCARGO', 'FINAL', 'FIRE', 'ROCK', NULL, NULL)," +
                "(220, 'SWINUB', 'INITIAL', 'ICE', 'GROUND', NULL, NULL)," +
                "(221, 'PILOSWINE', 'MIDDLE', 'ICE', 'GROUND', NULL, NULL)," +
                "(222, 'CORSOLA', 'SINGLE', 'WATER', 'ROCK', NULL, NULL)," +
                "(223, 'REMORAID', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(224, 'OCTILLERY', 'FINAL', 'WATER', NULL, NULL, NULL)," +
                "(225, 'DELIBIRD', 'SINGLE', 'ICE', 'FLYING', NULL, NULL)," +
                "(226, 'MANTINE', 'FINAL', 'WATER', 'FLYING', NULL, NULL)," +
                "(227, 'SKARMORY', 'SINGLE', 'STEEL', 'FLYING', NULL, NULL)," +
                "(228, 'HOUNDOUR', 'INITIAL', 'DARK', 'FIRE', NULL, NULL)," +
                "(229, 'HOUNDOOM', 'FINAL', 'DARK', 'FIRE', NULL, NULL)," +
                "(230, 'KINGDRA', 'FINAL', 'WATER', 'DRAGON', NULL, 'TRADE')," +
                "(231, 'PHANPY', 'INITIAL', 'GROUND', NULL, NULL, NULL)," +
                "(232, 'DONPHAN', 'FINAL', 'GROUND', NULL, NULL, NULL)," +
                "(233, 'PORYGON2', 'MIDDLE', 'NORMAL', NULL, NULL, 'TRADE')," +
                "(234, 'STANTLER', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," + 
                "(235, 'SMEARGLE', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(236, 'TYROGUE', 'INITIAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(237, 'HITMONTOP', 'FINAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(238, 'SMOOCHUM', 'INITIAL', 'ICE', 'PSYCHIC', NULL, NULL)," +
                "(239, 'ELEKID', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL)," +
                "(240, 'MAGBY', 'INITIAL', 'FIRE', NULL, NULL, NULL)," +
                "(241, 'MILTANK', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(242, 'BLISSEY', 'FINAL', 'NORMAL', NULL, NULL, 'FRIENDSHIP')," +
                "(243, 'RAIKOU', 'SINGLE', 'ELECTRIC', NULL, 'LEGENDARY', NULL)," +
                "(244, 'ENTEI', 'SINGLE', 'FIRE', NULL, 'LEGENDARY', NULL)," +
                "(245, 'SUICUNE', 'SINGLE', 'WATER', NULL, 'LEGENDARY', NULL)," +
                "(246, 'LARVITAR', 'INITIAL', 'ROCK', 'GROUND', NULL, NULL)," +
                "(247, 'PUPITAR', 'MIDDLE', 'ROCK', 'GROUND', NULL, NULL)," +
                "(248, 'TYRANITAR', 'FINAL', 'ROCK', 'DARK', NULL, NULL)," +
                "(249, 'LUGIA', 'SINGLE', 'PSYCHIC', 'FLYING', 'LEGENDARY', NULL)," +
                "(250, 'HOOH', 'SINGLE', 'FIRE', 'FLYING', 'LEGENDARY', NULL)," +
                "(251, 'CELEBI', 'SINGLE', 'PSYCHIC', 'GRASS', 'LEGENDARY', NULL)," +
                "(252, 'TREECKO', 'INITIAL', 'GRASS', NULL, 'STARTER', NULL)," +
                "(253, 'GROVYLE', 'MIDDLE', 'GRASS', NULL, 'STARTER', NULL)," +
                "(254, 'SCEPTILE', 'FINAL', 'GRASS', NULL, 'STARTER', NULL)," +
                "(255, 'TORCHIC', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL)," +
                "(256, 'COMBUSKEN', 'MIDDLE', 'FIRE', 'FIGHTING', 'STARTER', NULL)," +
                "(257, 'BLAZIKEN', 'FINAL', 'FIRE', 'FIGHTING', 'STARTER', NULL)," +
                "(258, 'MUDKIP', 'INITIAL', 'WATER', NULL, 'STARTER', NULL)," +
                "(259, 'MARSHTOMP', 'MIDDLE', 'WATER', 'GROUND', 'STARTER', NULL)," +
                "(260, 'SWAMPERT', 'FINAL', 'WATER', 'GROUND', 'STARTER', NULL)," +
                "(261, 'POOCHYENA', 'INITIAL', 'DARK', NULL, NULL, NULL)," +
                "(262, 'MIGHTYENA', 'FINAL', 'DARK', NULL, NULL, NULL)," +
                "(263, 'ZIGZAGOON', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(264, 'LINOONE', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(265, 'WURMPLE', 'INITIAL', 'BUG', NULL, NULL, NULL)," +
                "(266, 'SILCOON', 'MIDDLE', 'BUG', NULL, NULL, NULL)," +
                "(267, 'BEAUTIFLY', 'FINAL', 'BUG', 'FLYING', NULL, NULL)," +
                "(268, 'CASCOON', 'MIDDLE', 'BUG', NULL, NULL, NULL)," +
                "(269, 'DUSTOX', 'FINAL', 'BUG', 'POISON', NULL, NULL)," +
                "(270, 'LOTAD', 'INITIAL', 'WATER', 'GRASS', NULL, NULL)," +
                "(271, 'LOMBRE', 'MIDDLE', 'WATER', 'GRASS', NULL, NULL)," +
                "(272, 'LUDICOLO', 'FINAL', 'WATER', 'GRASS', NULL, 'ITEM')," +
                "(273, 'SEEDOT', 'INITIAL', 'GRASS', NULL, NULL, NULL)," +
                "(274, 'NUZLEAF', 'MIDDLE', 'GRASS', 'DARK', NULL, NULL)," +
                "(275, 'SHIFTRY', 'FINAL', 'GRASS', 'DARK', NULL, 'ITEM')," +
                "(276, 'TAILLOW', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(277, 'SWELLOW', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(278, 'WINGULL', 'INITIAL', 'WATER', 'FLYING', NULL, NULL)," +
                "(279, 'PELIPPER', 'FINAL', 'WATER', 'FLYING', NULL, NULL)," +
                "(280, 'RALTS', 'INITIAL', 'PSYCHIC', 'FAIRY', NULL, NULL)," +
                "(281, 'KIRLIA', 'MIDDLE', 'PSYCHIC', 'FAIRY', NULL, NULL)," +
                "(282, 'GARDEVOIR', 'FINAL', 'PSYCHIC', 'FAIRY', NULL, NULL)," +
                "(283, 'SURSKIT', 'INITIAL', 'BUG', 'WATER', NULL, NULL)," +
                "(284, 'MASQUERAIN', 'FINAL', 'BUG', 'FLYING', NULL, NULL)," +
                "(285, 'SHROOMISH', 'INITIAL', 'GRASS', NULL, NULL, NULL)," +
                "(286, 'BRELOOM', 'FINAL', 'GRASS', 'FIGHTING', NULL, NULL)," +
                "(287, 'SLAKOTH', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(288, 'VIGOROTH', 'MIDDLE', 'NORMAL', NULL, NULL, NULL)," +
                "(289, 'SLAKING', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(290, 'NINCADA', 'INITIAL', 'BUG', 'GROUND', NULL, NULL)," +
                "(291, 'NINJASK', 'FINAL', 'BUG', 'FLYING', NULL, NULL)," +
                "(292, 'SHEDINJA', 'FINAL', 'BUG', 'GHOST', NULL, NULL)," +
                "(293, 'WHISMUR', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(294, 'LOUDRED', 'MIDDLE', 'NORMAL', NULL, NULL, NULL)," +
                "(295, 'EXPLOUD', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(296, 'MAKUHITA', 'INITIAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(297, 'HARIYAMA', 'FINAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(298, 'AZURILL', 'INITIAL', 'NORMAL', 'FAIRY', NULL, 'FRIENDSHIP')," +
                "(299, 'NOSEPASS', 'SINGLE', 'ROCK', NULL, NULL, NULL)," +
                "(300, 'SKITTY', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(301, 'DELCATTY', 'FINAL', 'NORMAL', NULL, NULL, 'ITEM')," +
                "(302, 'SABLEYE', 'SINGLE', 'DARK', 'GHOST', NULL, NULL)," +
                "(303, 'MAWILE', 'SINGLE', 'STEEL', 'FAIRY', NULL, NULL)," +
                "(304, 'ARON', 'INITIAL', 'STEEL', 'ROCK', NULL, NULL)," +
                "(305, 'LAIRON', 'MIDDLE', 'STEEL', 'ROCK', NULL, NULL)," +
                "(306, 'AGGRON', 'FINAL', 'STEEL', 'ROCK', NULL, NULL)," +
                "(307, 'MEDITITE', 'INITIAL', 'FIGHTING', 'PSYCHIC', NULL, NULL)," +
                "(308, 'MEDICHAM', 'FINAL', 'FIGHTING', 'PSYCHIC', NULL, NULL)," +
                "(309, 'ELECTRIKE', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL)," +
                "(310, 'MANECTRIC', 'FINAL', 'ELECTRIC', NULL, NULL, NULL)," +
                "(311, 'PLUSLE', 'SINGLE', 'ELECTRIC', NULL, NULL, NULL)," +
                "(312, 'MINUN', 'SINGLE', 'ELECTRIC', NULL, NULL, NULL)," +
                "(313, 'VOLBEAT', 'SINGLE', 'BUG', NULL, NULL, NULL)," +
                "(314, 'ILLUMISE', 'SINGLE', 'BUG', NULL, NULL, NULL)," +
                "(315, 'ROSELIA', 'SINGLE', 'GRASS', 'POISON', NULL, NULL)," +
                "(316, 'GULPIN', 'INITIAL', 'POISON', NULL, NULL, NULL)," +
                "(317, 'SWALOT', 'FINAL', 'POISON', NULL, NULL, NULL)," +
                "(318, 'CARVANHA', 'INITIAL', 'WATER', 'DARK', NULL, NULL)," +
                "(319, 'SHARPEDO', 'FINAL', 'WATER', 'DARK', NULL, NULL)," +
                "(320, 'WAILMER', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(321, 'WAILORD', 'FINAL', 'WATER', NULL, NULL, NULL)," +
                "(322, 'NUMEL', 'INITIAL', 'FIRE', 'GROUND', NULL, NULL)," +
                "(323, 'CAMERUPT', 'FINAL', 'FIRE', 'GROUND', NULL, NULL)," +
                "(324, 'TORKOAL', 'SINGLE', 'FIRE', NULL, NULL, NULL)," +
                "(325, 'SPOINK', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(326, 'GRUMPIG', 'FINAL', 'PSYCHIC', NULL, NULL, NULL), " +
                "(327, 'SPINDA', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(328, 'TRAPINCH', 'INITIAL', 'GROUND', NULL, NULL, NULL)," +
                "(329, 'VIBRAVA', 'MIDDLE', 'GROUND', 'DRAGON', NULL, NULL)," +
                "(330, 'FLYGON', 'FINAL', 'GROUND', 'DRAGON', NULL, NULL)," +
                "(331, 'CACNEA', 'INITIAL', 'GRASS', NULL, NULL, NULL)," +
                "(332, 'CACTURNE', 'FINAL', 'GRASS', 'DARK', NULL, NULL)," +
                "(333, 'SWABLU', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(334, 'ALTARIA', 'FINAL', 'DRAGON', 'FLYING', NULL, NULL)," +
                "(335, 'ZANGOOSE', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(336, 'SEVIPER', 'SINGLE', 'POISON', NULL, NULL, NULL)," +
                "(337, 'LUNATONE', 'SINGLE', 'ROCK', 'PSYCHIC', NULL, NULL)," +
                "(338, 'SOLROCK', 'SINGLE', 'ROCK', 'PSYCHIC', NULL, NULL)," +
                "(339, 'BARBOACH', 'INITIAL', 'WATER', 'GROUND', NULL, NULL)," +
                "(340, 'WHISCASH', 'FINAL', 'WATER', 'GROUND', NULL, NULL)," +
                "(341, 'CORPHISH', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(342, 'CRAWDAUNT', 'FINAL', 'WATER', 'DARK', NULL, NULL)," +
                "(343, 'BALTOY', 'INITIAL', 'GROUND', 'PSYCHIC', NULL, NULL)," +
                "(344, 'CLAYDOL', 'FINAL', 'GROUND', 'PSYCHIC', NULL, NULL)," +
                "(345, 'LILEEP', 'INITIAL', 'ROCK', 'GRASS', 'FOSSIL', NULL)," +
                "(346, 'CRADILY', 'FINAL', 'ROCK', 'GRASS', 'FOSSIL', NULL)," +
                "(347, 'ANORITH', 'INITIAL', 'ROCK', 'BUG', 'FOSSIL', NULL)," +
                "(348, 'ARMALDO', 'FINAL', 'ROCK', 'BUG', 'FOSSIL', NULL)," +
                "(349, 'FEEBAS', 'INITIAL', 'WATER', NULL, NULL, 'FRIENDSHIP')," +
                "(350, 'MILOTIC', 'FINAL', 'WATER', NULL, NULL, NULL)," +
                "(351, 'CASTFORM', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(352, 'KECLEON', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(353, 'SHUPPET', 'INITIAL', 'GHOST', NULL, NULL, NULL)," +
                "(354, 'BANETTE', 'FINAL', 'GHOST', NULL, NULL, NULL)," +
                "(355, 'DUSKULL', 'INITIAL', 'GHOST', NULL, NULL, NULL)," +
                "(356, 'DUSCLOPS', 'FINAL', 'GHOST', NULL, NULL, NULL)," +
                "(357, 'TROPIUS', 'SINGLE', 'GRASS', 'FLYING', NULL, NULL)," +
                "(358, 'CHIMECHO', 'SINGLE', 'PSYCHIC', NULL, NULL, NULL)," +
                "(359, 'ABSOL', 'SINGLE', 'DARK', NULL, NULL, NULL)," +
                "(360, 'WYNAUT', 'INITIAL', 'PSYCHIC', NULL, NULL, 'FRIENDSHIP')," +
                "(361, 'SNORUNT', 'INITIAL', 'ICE', NULL, NULL, NULL)," +
                "(362, 'GLALIE', 'FINAL', 'ICE', NULL, NULL, NULL)," +
                "(363, 'SPHEAL', 'INITIAL', 'ICE', 'WATER', NULL, NULL)," +
                "(364, 'SEALEO', 'MIDDLE', 'ICE', 'WATER', NULL, NULL)," +
                "(365, 'WALREIN', 'FINAL', 'ICE', 'WATER', NULL, NULL)," +
                "(366, 'CLAMPERL', 'INITIAL', 'WATER', NULL, NULL, 'ITEM')," +
                "(367, 'HUNTAIL', 'FINAL', 'WATER', NULL, NULL, 'ITEM')," +
                "(368, 'GOREBYSS', 'FINAL', 'WATER', NULL, NULL, 'ITEM')," +
                "(369, 'RELICANTH', 'SINGLE', 'WATER', 'ROCK', NULL, NULL)," +
                "(370, 'LUVDISC', 'SINGLE', 'WATER', NULL, NULL, NULL)," +
                "(371, 'BAGON', 'INITIAL', 'DRAGON', NULL, NULL, NULL)," +
                "(372, 'SHELGON', 'MIDDLE', 'DRAGON', NULL, NULL, NULL)," +
                "(373, 'SALAMENCE', 'FINAL', 'DRAGON', 'FLYING', NULL, NULL)," +
                "(374, 'BELDUM', 'INITIAL', 'STEEL', 'PSYCHIC', NULL, NULL)," +
                "(375, 'METANG', 'MIDDLE', 'STEEL', 'PSYCHIC', NULL, NULL)," +
                "(376, 'METAGROSS', 'FINAL', 'STEEL', 'PSYCHIC', NULL, NULL)," +
                "(377, 'REGIROCK', 'SINGLE', 'ROCK', NULL, 'LEGENDARY', NULL)," +
                "(378, 'REGICE', 'SINGLE', 'ICE', NULL, 'LEGENDARY', NULL)," +
                "(379, 'REGISTEEL', 'SINGLE', 'STEEL', NULL, 'LEGENDARY', NULL)," +
                "(380, 'LATIAS', 'SINGLE', 'DRAGON', 'PSYCHIC', 'LEGENDARY', NULL)," +
                "(381, 'LATIOS', 'SINGLE', 'DRAGON', 'PSYCHIC', 'LEGENDARY', NULL)," +
                "(382, 'KYOGRE', 'SINGLE', 'WATER', NULL, 'LEGENDARY', NULL)," +
                "(383, 'GROUDON', 'SINGLE', 'GROUND', NULL, 'LEGENDARY', NULL)," +
                "(384, 'RAYQUAZA', 'SINGLE', 'DRAGON', 'FLYING', 'LEGENDARY', NULL)," +
                "(385, 'JIRACHI', 'SINGLE', 'STEEL', 'PSYCHIC', 'LEGENDARY', NULL)," +
                "(386, 'DEOXYS', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL)," +
                "(387, 'TURTWIG', 'INITIAL', 'GRASS', NULL, 'STARTER', NULL)," +
                "(388, 'GROTLE', 'MIDDLE', 'GRASS', NULL, 'STARTER', NULL)," +
                "(389, 'TORTERRA', 'FINAL', 'GRASS', 'GROUND', 'STARTER', NULL)," +
                "(390, 'CHIMCHAR', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL)," +
                "(391, 'MONFERNO', 'MIDDLE', 'FIRE', 'FIGHTING', 'STARTER', NULL)," +
                "(392, 'INFERNAPE', 'FINAL', 'FIRE', 'FIGHTING', 'STARTER', NULL)," +
                "(393, 'PIPLUP', 'INITIAL', 'WATER', NULL, 'STARTER', NULL)," +
                "(394, 'PRINPLUP', 'MIDDLE', 'WATER', NULL, 'STARTER', NULL)," +
                "(395, 'EMPOLEON', 'FINAL', 'WATER', 'STEEL', 'STARTER', NULL)," +
                "(396, 'STARLY', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(397, 'STARAVIA', 'MIDDLE', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(398, 'STARAPTOR', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(399, 'BIDOOF', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(400, 'BIBAREL', 'FINAL', 'NORMAL', 'WATER', NULL, NULL)," +
                "(401, 'KRICKETOT', 'INITIAL', 'BUG', NULL, NULL, NULL)," +
                "(402, 'KRICKETUNE', 'FINAL', 'BUG', NULL, NULL, NULL)," +
                "(403, 'SHINX', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL)," +
                "(404, 'LUXIO', 'MIDDLE', 'ELECTRIC', NULL, NULL, NULL)," +
                "(405, 'LUXRAY', 'FINAL', 'ELECTRIC', NULL, NULL, NULL)," +
                "(406, 'BUDEW', 'INITIAL', 'GRASS', 'POISON', NULL, 'FRIENDSHIP')," +
                "(407, 'ROSERADE', 'FINAL', 'GRASS', 'POISON', NULL, 'ITEM')," +
                "(408, 'CRANIDOS', 'INITIAL', 'ROCK', NULL, 'FOSSIL', NULL)," +
                "(409, 'RAMPARDOS', 'FINAL', 'ROCK', NULL, 'FOSSIL', NULL)," +
                "(410, 'SHIELDON', 'INITIAL', 'ROCK', 'STEEL', 'FOSSIL', NULL)," +
                "(411, 'BASTIODON', 'FINAL', 'ROCK', 'STEEL', 'FOSSIL', NULL)," +
                "(412, 'BURMY', 'INITIAL', 'BUG', NULL, NULL, NULL)," +
                "(413, 'WORMADAM', 'FINAL', 'BUG', 'GRASS', NULL, NULL)," +
                "(414, 'MOTHIM', 'FINAL', 'BUG', 'FLYING', NULL, NULL)," +
                "(415, 'COMBEE', 'INITIAL', 'BUG', 'FLYING', NULL, NULL)," +
                "(416, 'VESPIQUEN', 'FINAL', 'BUG', 'FLYING', NULL, NULL)," +
                "(417, 'PACHIRISU', 'SINGLE', 'ELECTRIC', NULL, NULL, NULL)," +
                "(418, 'BUIZEL', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(419, 'FLOATZEL', 'FINAL', 'WATER', NULL, NULL, NULL)," +
                "(420, 'CHERUBI', 'INITIAL', 'GRASS', NULL, NULL, NULL)," +
                "(421, 'CHERRIM', 'FINAL', 'GRASS', NULL, NULL, NULL)," +
                "(422, 'SHELLIOS', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(423, 'GASTRODON', 'FINAL', 'WATER', 'GROUND', NULL, NULL)," +
                "(424, 'AMBIPOM', 'FINAL', 'NORMAL', NULL, NULL, 'ITEM')," +
                "(425, 'DRIFLOON', 'INITIAL', 'GHOST', 'FLYING', NULL, NULL)," +
                "(426, 'DRIFBLIM', 'FINAL', 'GHOST', 'FLYING', NULL, NULL)," +
                "(427, 'BUNEARY', 'INITIAL', 'NORMAL', NULL, NULL, 'FRIENDSHIP')," +
                "(428, 'LOPUNNY', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(429, 'MISMAGIUS', 'FINAL', 'GHOST', NULL, NULL, 'ITEM')," +
                "(430, 'HONCHKROW', 'FINAL', 'DARK', 'FLYING', NULL, 'ITEM')," +
                "(431, 'GLAMEOW', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(432, 'PURUGLY', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(433, 'CHINGLING', 'INITIAL', 'PSYCHIC', NULL, NULL, 'FRIENDSHIP')," +
                "(434, 'STUNKY', 'INITIAL', 'POISON', 'DARK', NULL, NULL)," +
                "(435, 'SKUNTANK', 'FINAL', 'POISON', 'DARK', NULL, NULL)," +
                "(436, 'BRONZOR', 'INITIAL', 'STEEL', 'PSYCHIC', NULL, NULL)," +
                "(437, 'BRONZONG', 'FINAL', 'STEEL', 'PSYCHIC', NULL, NULL)," +
                "(438, 'BONSLY', 'INITIAL', 'ROCK', NULL, NULL, 'ITEM')," +
                "(439, 'MIME JR.', 'INITIAL', 'PSYCHIC', 'FAIRY', NULL, 'ITEM')," +
                "(440, 'HAPPINY', 'INITIAL', 'NORMAL', NULL, NULL, 'ITEM')," +
                "(441, 'CHATOT', 'SINGLE', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(442, 'SPIRITOMB', 'SINGLE', 'GHOST', 'DARK', NULL, NULL)," +
                "(443, 'GIBLE', 'INITIAL', 'DRAGON', 'GROUND', NULL, NULL)," +
                "(444, 'GABITE', 'MIDDLE', 'DRAGON', 'GROUND', NULL, NULL)," +
                "(445, 'GARCHOMP', 'FINAL', 'DRAGON', 'GROUND', NULL, NULL)," +
                "(446, 'MUNCHLAX', 'INITIAL', 'NORMAL', NULL, NULL, 'FRIENDSHIP')," +
                "(447, 'RIOLU', 'INITIAL', 'FIGHTING', NULL, NULL, 'FRIENDSHIP')," +
                "(448, 'LUCARIO', 'FINAL', 'FIGHTING', 'STEEL', NULL, NULL)," +
                "(449, 'HIPPOPOTAS', 'INITIAL', 'GROUND', NULL, NULL, NULL)," +
                "(450, 'HIPPOWDON', 'FINAL', 'GROUND', NULL, NULL, NULL)," +
                "(451, 'SKORUPI', 'INITIAL', 'POISON', 'BUG', NULL, NULL)," +
                "(452, 'DRAPION', 'FINAL', 'POISON', 'DARK', NULL, NULL)," +
                "(453, 'CROAGUNK', 'INITIAL', 'POISON', 'FIGHTING', NULL, NULL)," +
                "(454, 'TOXICROAK', 'FINAL', 'POISON', 'FIGHTING', NULL, NULL)," +
                "(455, 'CARNIVINE', 'SINGLE', 'GRASS', NULL, NULL, NULL)," +
                "(456, 'FINNEON', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(457, 'LUMINEON', 'FINAL', 'WATER', NULL, NULL, NULL)," +
                "(458, 'MANTYKE', 'INITIAL', 'WATER', 'FLYING', NULL, 'ITEM')," +
                "(459, 'SNOVER', 'INITIAL', 'GRASS', 'ICE', NULL, NULL)," +
                "(460, 'ABOMASNOW', 'FINAL', 'GRASS', 'ICE', NULL, NULL)," +
                "(461, 'WEAVILE', 'FINAL', 'DARK', 'ICE', NULL, 'ITEM')," +
                "(462, 'MAGNEZONE', 'FINAL', 'ELECTRIC', 'STEEL', NULL, 'ITEM')," +
                "(463, 'LICKILICKY', 'FINAL', 'NORMAL', NULL, NULL, 'ITEM')," +
                "(464, 'RHYPERIOR', 'FINAL', 'GROUND', 'ROCK', NULL, 'ITEM')," +
                "(465, 'TANGROWTH', 'FINAL', 'GRASS', NULL, NULL, 'ITEM')," +
                "(466, 'ELECTIVIRE', 'FINAL', 'ELECTRIC', NULL, NULL, 'ITEM')," +
                "(467, 'MAGMORTAR', 'FINAL', 'FIRE', NULL, NULL, 'ITEM')," +
                "(468, 'TOGEKISS', 'FINAL', 'FAIRY', 'FLYING', NULL, 'ITEM')," +
                "(469, 'YANMEGA', 'FINAL', 'BUG', 'FLYING', NULL, 'ITEM')," +
                "(470, 'LEAFEON', 'FINAL', 'GRASS', NULL, NULL, 'ITEM')," +
                "(471, 'GLACEON', 'FINAL', 'ICE', NULL, NULL, 'ITEM')," +
                "(472, 'GLISCOR', 'FINAL', 'GROUND', 'FLYING', NULL, 'ITEM')," +
                "(473, 'MAMOSWINE', 'FINAL', 'ICE', 'GROUND', NULL, 'ITEM')," +
                "(474, 'PORYGON-Z', 'FINAL', 'NORMAL', NULL, NULL, 'ITEM')," +
                "(475, 'GALLADE', 'FINAL', 'PSYCHIC', 'FIGHTING', NULL, 'ITEM')," +
                "(476, 'PROBOPASS', 'FINAL', 'ROCK', 'STEEL', NULL, 'ITEM')," +
                "(477, 'DUSKNOIR', 'FINAL', 'GHOST', NULL, NULL, 'ITEM')," +
                "(478, 'FROSLASS', 'FINAL', 'ICE', 'GHOST', NULL, 'ITEM')," +
                "(479, 'ROTOM', 'SINGLE', 'ELECTRIC', 'GHOST', NULL, NULL)," +
                "(480, 'UXIE', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL)," +
                "(481, 'MESPRIT', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL)," +
                "(482, 'AZELF', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL)," +
                "(483, 'DIALGA', 'SINGLE', 'STEEL', 'DRAGON', 'LEGENDARY', NULL)," +
                "(484, 'PALKIA', 'SINGLE', 'WATER', 'DRAGON', 'LEGENDARY', NULL)," +
                "(485, 'HEATRAN', 'SINGLE', 'FIRE', 'STEEL', 'LEGENDARY', NULL)," +
                "(486, 'REGIGIGAS', 'SINGLE', 'NORMAL', NULL, 'LEGENDARY', NULL)," +
                "(487, 'GIRATINA', 'SINGLE', 'GHOST', 'DRAGON', 'LEGENDARY', NULL)," +
                "(488, 'CRESSELIA', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL)," +
                "(489, 'PHIONE', 'SINGLE', 'WATER', NULL, 'LEGENDARY', NULL)," +
                "(490, 'MANAPHY', 'SINGLE', 'WATER', NULL, 'LEGENDARY', NULL)," +
                "(491, 'DARKRAI', 'SINGLE', 'DARK', NULL, 'LEGENDARY', NULL)," +
                "(492, 'SHAYMIN', 'SINGLE', 'GRASS', NULL, 'LEGENDARY', NULL)," +
                "(493, 'ARCEUS', 'SINGLE', 'NORMAL', NULL, 'LEGENDARY', NULL)," +
                "(494, 'VICTINI', 'SINGLE', 'PSYCHIC', 'FIRE', 'LEGENDARY', NULL)," +
                "(495, 'SNIVY', 'INITIAL', 'GRASS', NULL, 'STARTER', NULL)," +
                "(496, 'SERVINE', 'MIDDLE', 'GRASS', NULL, 'STARTER', NULL)," +
                "(497, 'SERPERIOR', 'FINAL', 'GRASS', NULL, 'STARTER', NULL)," +
                "(498, 'TEPIG', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL)," +
                "(499, 'PIGNITE', 'MIDDLE', 'FIRE', 'FIGHTING', 'STARTER', NULL)," +
                "(500, 'EMBOAR', 'FINAL', 'FIRE', 'FIGHTING', 'STARTER', NULL)," +
                "(501, 'OSHAWOTT', 'INITIAL', 'WATER', NULL, 'STARTER', NULL)," +
                "(502, 'DEWOTT', 'MIDDLE', 'WATER', NULL, 'STARTER', NULL)," +
                "(503, 'SAMUROTT', 'FINAL', 'WATER', NULL, 'STARTER', NULL)," +
                "(504, 'PATRAT', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(505, 'WATCHOG', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(506, 'LILLIPUP', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(507, 'HERDIER', 'MIDDLE', 'NORMAL', NULL, NULL, NULL)," +
                "(508, 'STOUTLAND', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(509, 'PURRLOIN', 'INITIAL', 'DARK', NULL, NULL, NULL)," +
                "(510, 'LIEPARD', 'FINAL', 'DARK', NULL, NULL, NULL)," +
                "(511, 'PANSAGE', 'INITIAL', 'GRASS', NULL, NULL, NULL)," +
                "(512, 'SIMISAGE', 'FINAL', 'GRASS', NULL, NULL, 'ITEM')," +
                "(513, 'PANSEAR', 'INITIAL', 'FIRE', NULL, NULL, NULL)," +
                "(514, 'SIMISEAR', 'FINAL', 'FIRE', NULL, NULL, 'ITEM')," +
                "(515, 'PANPOUR', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(516, 'SIMIPOUR', 'FINAL', 'WATER', NULL, NULL, 'ITEM')," +
                "(517, 'MUNNA', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(518, 'MUSHARNA', 'FINAL', 'PSYCHIC', NULL, NULL, 'ITEM')," +
                "(519, 'PIDOVE', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(520, 'TRANQUILL', 'MIDDLE', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(521, 'UNFEZANT', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(522, 'BLITZLE', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL)," +
                "(523, 'ZEBSTRIKA', 'FINAL', 'ELECTRIC', NULL, NULL, NULL)," +
                "(524, 'ROGGENROLA', 'INITIAL', 'ROCK', NULL, NULL, NULL)," +
                "(525, 'BOLDORE', 'MIDDLE', 'ROCK', NULL, NULL, NULL)," +
                "(526, 'GIGALITH', 'FINAL', 'ROCK', NULL, NULL, 'TRADE')," +
                "(527, 'WOOBAT', 'INITIAL', 'PSYCHIC', 'FLYING', NULL, NULL)," +
                "(528, 'SWOOBAT', 'FINAL', 'PSYCHIC', 'FLYING', NULL, 'FRIENDSHIP')," +
                "(529, 'DRILBUR', 'INITIAL', 'GROUND', NULL, NULL, NULL)," +
                "(530, 'EXCADRILL', 'FINAL', 'GROUND', 'STEEL', NULL, NULL)," +
                "(531, 'AUDINO', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(532, 'TIMBURR', 'INITIAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(533, 'GURDURR', 'MIDDLE', 'FIGHTING', NULL, NULL, 'TRADE')," +
                "(534, 'CONKELDURR', 'FINAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(535, 'TYMPOLE', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(536, 'PALPITOAD', 'MIDDLE', 'WATER', 'GROUND', NULL, NULL)," +
                "(537, 'SEISMITOAD', 'FINAL', 'WATER', 'GROUND', NULL, NULL)," +
                "(538, 'THROH', 'SINGLE', 'FIGHTING', NULL, NULL, NULL)," +
                "(539, 'SAWK', 'SINGLE', 'FIGHTING', NULL, NULL, NULL)," +
                "(540, 'SEWADDLE', 'INITIAL', 'BUG', 'GRASS', NULL, NULL)," +
                "(541, 'SWADLOON', 'MIDDLE', 'BUG', 'GRASS', NULL, NULL)," +
                "(542, 'LEAVANNY', 'FINAL', 'BUG', 'GRASS', NULL, 'FRIENDSHIP')," +
                "(543, 'VENIPEDE', 'INITIAL', 'BUG', 'POISON', NULL, NULL)," +
                "(544, 'WHIRLIPEDE', 'MIDDLE', 'BUG', 'POISON', NULL, NULL)," +
                "(545, 'SCOLIPEDE', 'FINAL', 'BUG', 'POISON', NULL, NULL)," +
                "(546, 'COTTONEE', 'INITIAL', 'GRASS', 'FAIRY', NULL, NULL)," +
                "(547, 'WHIMSICOTT', 'FINAL', 'GRASS', 'FAIRY', NULL, 'ITEM')," +
                "(548, 'PETILIL', 'INITIAL', 'GRASS', NULL, NULL, NULL)," +
                "(549, 'LILLIGANT', 'FINAL', 'GRASS', NULL, NULL, 'ITEM')," +
                "(550, 'BASCULIN', 'SINGLE', 'WATER', NULL, NULL, NULL)," +
                "(551, 'SANDILE', 'INITIAL', 'GROUND', 'DARK', NULL, NULL)," +
                "(552, 'KROKOROK', 'MIDDLE', 'GROUND', 'DARK', NULL, NULL)," +
                "(553, 'KROOKODILE', 'FINAL', 'GROUND', 'DARK', NULL, NULL)," +
                "(554, 'DARUMAKA', 'INITIAL', 'FIRE', NULL, NULL, NULL)," +
                "(555, 'DARMANITAN', 'FINAL', 'FIRE', NULL, NULL, NULL)," +
                "(556, 'MARACTUS', 'SINGLE', 'GRASS', NULL, NULL, NULL)," +
                "(557, 'DWEBBLE', 'INITIAL', 'BUG', 'ROCK', NULL, NULL)," +
                "(558, 'CRUSTLE', 'FINAL', 'BUG', 'ROCK', NULL, NULL)," +
                "(559, 'SCRAGGY', 'INITIAL', 'DARK', 'FIGHTING', NULL, NULL)," +
                "(560, 'SCRAFTY', 'FINAL', 'DARK', 'FIGHTING', NULL, NULL)," +
                "(561, 'SIGILYPH', 'SINGLE', 'PSYCHIC', 'FLYING', NULL, NULL)," +
                "(562, 'YAMASK', 'INITIAL', 'GHOST', NULL, NULL, NULL)," +
                "(563, 'COFAGRIGUS', 'FINAL', 'GHOST', NULL, NULL, NULL)," +
                "(564, 'TIRTOUGA', 'INITIAL', 'WATER', 'ROCK', 'FOSSIL', NULL)," +
                "(565, 'CARRACOSTA', 'FINAL', 'WATER', 'ROCK', 'FOSSIL', NULL)," +
                "(566, 'ARCHEN', 'INITIAL', 'ROCK', 'FLYING', 'FOSSIL', NULL)," +
                "(567, 'ARCHEOPS', 'FINAL', 'ROCK', 'FLYING', 'FOSSIL', NULL)," +
                "(568, 'TRUBBISH', 'INITIAL', 'POISON', NULL, NULL, NULL)," +
                "(569, 'GARBODOR', 'FINAL', 'POISON', NULL, NULL, NULL)," + 
                "(570, 'ZORUA', 'INITIAL', 'DARK', NULL, NULL, NULL)," +
                "(571, 'ZOROARK', 'FINAL', 'DARK', NULL, NULL, NULL)," +
                "(572, 'MINCCINO', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(573, 'CINCCINO', 'FINAL', 'NORMAL', NULL, NULL, 'ITEM')," +
                "(574, 'GOTHITA', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(575, 'GOTHORITA', 'MIDDLE', 'PSYCHIC', NULL, NULL, NULL)," +
                "(576, 'GOTHITELLE', 'FINAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(577, 'SOLOSIS', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(578, 'DUOSION', 'MIDDLE', 'PSYCHIC', NULL, NULL, NULL)," +
                "(579, 'REUNICLUS', 'FINAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(580, 'DUCKLETT', 'INITIAL', 'WATER', 'FLYING', NULL, NULL)," +
                "(581, 'SWANNA', 'FINAL', 'WATER', 'FLYING', NULL, NULL)," +
                "(582, 'VANILLITE', 'INITIAL', 'ICE', NULL, NULL, NULL)," +
                "(583, 'VANILLISH', 'MIDDLE', 'ICE', NULL, NULL, NULL)," +
                "(584, 'VANILLUXE', 'FINAL', 'ICE', NULL, NULL, NULL)," +
                "(585, 'DEERLING', 'INITIAL', 'NORMAL', 'GRASS', NULL, NULL)," +
                "(586, 'SAWSBUCK', 'FINAL', 'NORMAL', 'GRASS', NULL, NULL)," +
                "(587, 'EMOLGA', 'SINGLE', 'ELECTRIC', 'FLYING', NULL, NULL)," +
                "(588, 'KARRABLAST', 'INITIAL', 'BUG', NULL, NULL, NULL)," +
                "(589, 'ESCAVALIER', 'FINAL', 'BUG', 'STEEL', NULL, 'TRADE')," +
                "(590, 'FOONGUS', 'INITIAL', 'GRASS', 'POISON', NULL, NULL)," +
                "(591, 'AMOONGUSS', 'FINAL', 'GRASS', 'POISON', NULL, NULL)," +
                "(592, 'FRILLISH', 'INITIAL', 'WATER', 'GHOST', NULL, NULL)," +
                "(593, 'JELLICENT', 'FINAL', 'WATER', 'GHOST', NULL, NULL)," +
                "(594, 'ALOMOMOLA', 'SINGLE', 'WATER', NULL, NULL, NULL)," +
                "(595, 'JOLTIK', 'INITIAL', 'BUG', 'ELECTRIC', NULL, NULL)," +
                "(596, 'GALVANTULA', 'FINAL', 'BUG', 'ELECTRIC', NULL, NULL)," +
                "(597, 'FERROSEED', 'INITIAL', 'GRASS', 'STEEL', NULL, NULL)," +
                "(598, 'FERROTHORN', 'FINAL', 'GRASS', 'STEEL', NULL, NULL)," +
                "(599, 'KLINK', 'INITIAL', 'STEEL', NULL, NULL, NULL)," +
                "(600, 'KLANG', 'MIDDLE', 'STEEL', NULL, NULL, NULL)," +
                "(601, 'KLINKLANG', 'FINAL', 'STEEL', NULL, NULL, NULL)," +
                "(602, 'TYNAMO', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL)," +
                "(603, 'EELEKTRIK', 'MIDDLE', 'ELECTRIC', NULL, NULL, NULL)," +
                "(604, 'EELEKTROSS', 'FINAL', 'ELECTRIC', NULL, NULL, 'ITEM')," +
                "(605, 'ELGYEM', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(606, 'BEHEEYEM', 'FINAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(607, 'LITWICK', 'INITIAL', 'GHOST', 'FIRE', NULL, NULL)," +
                "(608, 'LAMPENT', 'MIDDLE', 'GHOST', 'FIRE', NULL, NULL)," +
                "(609, 'CHANDELURE', 'FINAL', 'GHOST', 'FIRE', NULL, 'ITEM')," +
                "(610, 'AXEW', 'INITIAL', 'DRAGON', NULL, NULL, NULL)," +
                "(611, 'FRAXURE', 'MIDDLE', 'DRAGON', NULL, NULL, NULL)," +
                "(612, 'HAXORUS', 'FINAL', 'DRAGON', NULL, NULL, NULL)," +
                "(613, 'CUBCHOO', 'INITIAL', 'ICE', NULL, NULL, NULL)," +
                "(614, 'BEARTIC', 'FINAL', 'ICE', NULL, NULL, NULL)," +
                "(615, 'CRYOGONAL', 'SINGLE', 'ICE', NULL, NULL, NULL)," +
                "(616, 'SHELMET', 'INITIAL', 'BUG', NULL, NULL, NULL)," +
                "(617, 'ACCELGOR', 'FINAL', 'BUG', NULL, NULL, 'TRADE')," +
                "(618, 'STUNFISK', 'SINGLE', 'GROUND', 'ELECTRIC', NULL, NULL)," +
                "(619, 'MIENFOO', 'INITIAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(620, 'MIENSHAO', 'FINAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(621, 'DRUDDIGON', 'SINGLE', 'DRAGON', NULL, NULL, NULL)," +
                "(622, 'GOLETT', 'INITIAL', 'GROUND', 'GHOST', NULL, NULL)," +
                "(623, 'GOLURK', 'FINAL', 'GROUND', 'GHOST', NULL, NULL)," +
                "(624, 'PAWNIARD', 'INITIAL', 'DARK', 'STEEL', NULL, NULL)," +
                "(625, 'BISHARP', 'FINAL', 'DARK', 'STEEL', NULL, NULL)," +
                "(626, 'BOUFFALANT', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(627, 'RUFFLET', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(628, 'BRAVIARY', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(629, 'VULLABY', 'INITIAL', 'DARK', 'FLYING', NULL, NULL)," +
                "(630, 'MANDIBUZZ', 'FINAL', 'DARK', 'FLYING', NULL, NULL)," +
                "(631, 'HEATMOR', 'SINGLE', 'FIRE', NULL, NULL, NULL)," +
                "(632, 'DURANT', 'SINGLE', 'BUG', 'STEEL', NULL, NULL)," +
                "(633, 'DEINO', 'INITIAL', 'DARK', 'DRAGON', NULL, NULL)," +
                "(634, 'ZWEILOUS', 'MIDDLE', 'DARK', 'DRAGON', NULL, NULL)," +
                "(635, 'HYDREIGON', 'FINAL', 'DARK', 'DRAGON', NULL, NULL)," +
                "(636, 'LARVESTA', 'INITIAL', 'BUG', 'FIRE', NULL, NULL)," +
                "(637, 'VOLCARONA', 'FINAL', 'BUG', 'FIRE', NULL, NULL)," +
                "(638, 'COBALION', 'SINGLE', 'STEEL', 'FIGHTING', 'LEGENDARY', NULL)," +
                "(639, 'TERRAKION', 'SINGLE', 'ROCK', 'FIGHTING', 'LEGENDARY', NULL)," +
                "(640, 'VIRIZION', 'SINGLE', 'GRASS', 'FIGHTING', 'LEGENDARY', NULL)," +
                "(641, 'TORNADUS', 'SINGLE', 'FLYING', NULL, 'LEGENDARY', NULL)," +
                "(642, 'THUNDURUS', 'SINGLE', 'ELECTRIC', 'FLYING', 'LEGENDARY', NULL)," +
                "(643, 'RESHIRAM', 'SINGLE', 'DRAGON', 'FIRE', 'LEGENDARY', NULL)," +
                "(644, 'ZEKROM', 'SINGLE', 'DRAGON', 'ELECTRIC', 'LEGENDARY', NULL)," +
                "(645, 'LANDORUS', 'SINGLE', 'GROUND', 'FLYING', 'LEGENDARY', NULL)," +
                "(646, 'KYUREM', 'SINGLE', 'DRAGON', 'ICE', 'LEGENDARY', NULL)," +
                "(647, 'KELDEO', 'SINGLE', 'WATER', 'FIGHTING', 'LEGENDARY', NULL)," +
                "(648, 'MELOETTA', 'SINGLE', 'NORMAL', 'PSYCHIC', 'LEGENDARY', NULL)," +
                "(649, 'GENESECT', 'SINGLE', 'BUG', 'STEEL', 'LEGENDARY', NULL)," +
                "(650, 'CHESPIN', 'INITIAL', 'GRASS', NULL, 'STARTER', NULL)," +
                "(651, 'QUILLADIN', 'MIDDLE', 'GRASS', NULL, 'STARTER', NULL)," +
                "(652, 'CHESNAUGHT', 'FINAL', 'GRASS', 'FIGHTING', 'STARTER', NULL)," +
                "(653, 'FENNEKIN', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL)," +
                "(654, 'BRAIXEN', 'MIDDLE', 'FIRE', NULL, 'STARTER', NULL)," +
                "(655, 'DELPHOX', 'FINAL', 'FIRE', 'PSYCHIC', 'STARTER', NULL)," +
                "(656, 'FROAKIE', 'INITIAL', 'WATER', NULL, 'STARTER', NULL)," +
                "(657, 'FROGADIER', 'MIDDLE', 'WATER', NULL, 'STARTER', NULL)," +
                "(658, 'GRENINJA', 'FINAL', 'WATER', 'DARK', 'STARTER', NULL)," +
                "(659, 'BUNNELBY', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(660, 'DIGGERSBY', 'FINAL', 'NORMAL', 'GROUND', NULL, NULL)," +
                "(661, 'FLETCHLING', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(662, 'FLETCHINDER', 'MIDDLE', 'FIRE', 'FLYING', NULL, NULL)," +
                "(663, 'TALONFLAME', 'FINAL', 'FIRE', 'FLYING', NULL, NULL)," +
                "(664, 'SCATTERBUG', 'INITIAL', 'BUG', NULL, NULL, NULL)," +
                "(665, 'SPEWPA', 'MIDDLE', 'BUG', NULL, NULL, NULL)," +
                "(666, 'VIVILLON', 'FINAL', 'BUG', 'FLYING', NULL, NULL)," +
                "(667, 'LITLEO', 'INITIAL', 'FIRE', 'NORMAL', NULL, NULL)," +
                "(668, 'PYROAR', 'FINAL', 'FIRE', 'NORMAL', NULL, NULL),"  +
                "(669, 'FLABEBE', 'INITIAL', 'FAIRY', NULL, NULL, NULL)," +
                "(670, 'FLOETTE', 'MIDDLE', 'FAIRY', NULL, NULL, NULL)," +
                "(671, 'FLORGES', 'FINAL', 'FAIRY', NULL, NULL, NULL)," +
                "(672, 'SKIDDO', 'INITIAL', 'GRASS', NULL, NULL, NULL)," +
                "(673, 'GOGOAT', 'FINAL', 'GRASS', NULL, NULL, NULL)," +
                "(674, 'PANCHAM', 'INITIAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(675, 'PANGORO', 'FINAL', 'FIGHTING', 'DARK', NULL, NULL)," +
                "(676, 'FURFROU', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(677, 'ESPURR', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(678, 'MEOWSTIC', 'FINAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(679, 'HONEDGE', 'INITIAL', 'STEEL', 'GHOST', NULL, NULL)," +
                "(680, 'DOUBLADE', 'MIDDLE', 'STEEL', 'GHOST', NULL, NULL)," +
                "(681, 'AEGISLASH', 'FINAL', 'STEEL', 'GHOST', NULL, 'ITEM')," +
                "(682, 'SPRITZEE', 'INITIAL', 'FAIRY', NULL, NULL, NULL)," +
                "(683, 'AROMATISSE', 'FINAL', 'FAIRY', NULL, NULL, 'TRADE')," +
                "(684, 'SWIRLIX', 'INITIAL', 'FAIRY', NULL, NULL, NULL)," +
                "(685, 'SLURPUFF', 'FINAL', 'FAIRY', NULL, NULL, 'TRADE')," +
                "(686, 'INKAY', 'INITIAL', 'DARK', 'PSYCHIC', NULL, NULL)," +
                "(687, 'MALAMAR', 'FINAL', 'DARK', 'PSYCHIC', NULL, NULL)," +
                "(688, 'BINACLE', 'INITIAL', 'ROCK', 'WATER', NULL, NULL)," +
                "(689, 'BARBARACLE', 'FINAL', 'ROCK', 'WATER', NULL, NULL)," +
                "(690, 'SKRELP', 'INITIAL', 'POISON', 'WATER', NULL, NULL)," +
                "(691, 'DRAGALGE', 'FINAL', 'POISON', 'DRAGON', NULL, NULL)," +
                "(692, 'CLAUNCHER', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(693, 'CLAWITZER', 'FINAL', 'WATER', NULL, NULL, NULL)," +
                "(694, 'HELIOPTILE', 'INITIAL', 'ELECTRIC', 'NORMAL', NULL, NULL)," +
                "(695, 'HELIOLISK', 'FINAL', 'ELECTRIC', 'NORMAL', NULL, 'ITEM')," +
                "(696, 'TYRUNT', 'INITIAL', 'ROCK', 'DRAGON', 'FOSSIL', NULL)," +
                "(697, 'TYRANTRUM', 'FINAL', 'ROCK', 'DRAGON', NULL, NULL)," +
                "(698, 'AMAURA', 'INITIAL', 'ROCK', 'ICE', 'FOSSIL', NULL)," +
                "(699, 'AURORUS', 'FINAL', 'ROCK', 'ICE', NULL, NULL)," +
                "(700, 'SYLVEON', 'FINAL', 'FAIRY', NULL, NULL, 'FRIENDSHIP')," +
                "(701, 'HAWLUCHA', 'SINGLE', 'FIGHTING', 'FLYING', NULL, NULL)," +
                "(702, 'DEDENNE', 'SINGLE', 'ELECTRIC', 'FAIRY', NULL, NULL)," +
                "(703, 'CARBINK', 'SINGLE', 'ROCK', 'FAIRY', NULL, NULL)," +
                "(704, 'GOOMY', 'INITIAL', 'DRAGON', NULL, NULL, NULL)," +
                "(705, 'SLIGGOO', 'MIDDLE', 'DRAGON', NULL, NULL, NULL)," +
                "(706, 'GOODRA', 'FINAL', 'DRAGON', NULL, NULL, NULL)," +
                "(707, 'KLEFKI', 'SINGLE', 'STEEL', 'FAIRY', NULL, NULL)," +
                "(708, 'PHANTUMP', 'INITIAL', 'GHOST', 'GRASS', NULL, 'TRADE')," +
                "(709, 'TREVENANT', 'FINAL', 'GHOST', 'GRASS', NULL, NULL)," +
                "(710, 'PUMPKABOO', 'INITIAL', 'GHOST', 'GRASS', NULL, NULL)," +
                "(711, 'GOURGEIST', 'FINAL', 'GHOST', 'GRASS', NULL, NULL)," +
                "(712, 'BERGMITE', 'INITIAL', 'ICE', NULL, NULL, NULL)," +
                "(713, 'AVALUGG', 'FINAL', 'ICE', NULL, NULL, NULL)," +
                "(714, 'NOIBAT', 'INITIAL', 'FLYING', 'DRAGON', NULL, NULL)," +
                "(715, 'NOIVERN', 'FINAL', 'FLYING', 'DRAGON', NULL, NULL)," +
                "(716, 'XERNEAS', 'SINGLE', 'FAIRY', NULL, 'LEGENDARY', NULL)," +
                "(717, 'YVELTAL', 'SINGLE', 'DARK', 'FLYING', 'LEGENDARY', NULL)," +
                "(718, 'ZYGARDE', 'SINGLE', 'DRAGON', 'GROUND', 'LEGENDARY', NULL)," +
                "(719, 'DIANCIE', 'SINGLE', 'ROCK', 'FAIRY', 'LEGENDARY', NULL)," +
                "(720, 'HOOPA', 'SINGLE', 'PSYCHIC', 'GHOST', 'LEGENDARY', NULL)," +
                "(721, 'VOLCANION', 'SINGLE', 'FIRE', 'WATER', 'LEGENDARY', NULL)," +
                "(722, 'ROWLET', 'INITIAL', 'GRASS', 'FLYING', 'STARTER', NULL)," +
                "(723, 'DARTRIX', 'MIDDLE', 'GRASS', 'FLYING', NULL, NULL)," +
                "(724, 'DECIDUEYE', 'FINAL', 'GRASS', 'GHOST', NULL, NULL)," +
                "(725, 'LITTEN', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL)," +
                "(726, 'TORRACAT', 'MIDDLE', 'FIRE', NULL, NULL, NULL)," +
                "(727, 'INCINEROAR', 'FINAL', 'FIRE', 'DARK', NULL, NULL)," +
                "(728, 'POPPLIO', 'INITIAL', 'WATER', NULL, 'STARTER', NULL)," +
                "(729, 'BRIONNE', 'MIDDLE', 'WATER', NULL, NULL, NULL)," +
                "(730, 'PRIMARINA', 'FINAL', 'WATER', 'FAIRY', NULL, NULL)," +
                "(731, 'PIKIPEK', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(732, 'TRUMBEAK', 'MIDDLE', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(733, 'TOUCANNON', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(734, 'YUNGOOS', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(735, 'GUMSHOOS', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(736, 'GRUBBIN', 'INITIAL', 'BUG', NULL, NULL, NULL)," +
                "(737, 'CHARJABUG', 'MIDDLE', 'BUG', 'ELECTRIC', NULL, NULL)," +
                "(738, 'VIKAVOLT', 'FINAL', 'BUG', 'ELECTRIC', NULL, 'ITEM')," +
                "(739, 'CRABRAWLER', 'INITIAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(740, 'CRABOMINABLE', 'FINAL', 'FIGHTING', 'ICE', NULL, 'ITEM')," +
                "(741, 'ORICORIO', 'SINGLE', 'FIRE', 'FLYING', NULL, NULL)," +
                "(742, 'CUTIEFLY', 'INITIAL', 'BUG', 'FAIRY', NULL, NULL)," +
                "(743, 'RIBOMBEE', 'FINAL', 'BUG', 'FAIRY', NULL, NULL)," +
                "(744, 'ROCKRUFF', 'INITIAL', 'ROCK', NULL, NULL, NULL)," +
                "(745, 'LYCANROC', 'FINAL', 'ROCK', NULL, NULL, NULL)," +
                "(746, 'WISHIWASHI', 'SINGLE', 'WATER', NULL, NULL, NULL)," +
                "(747, 'MAREANIE', 'INITIAL', 'POISON', 'WATER', NULL, NULL)," +
                "(748, 'TOXAPEX', 'FINAL', 'POISON', 'WATER', NULL, NULL)," +
                "(749, 'MUDBRAY', 'INITIAL', 'GROUND', NULL, NULL, NULL)," +
                "(750, 'MUDSDALE', 'FINAL', 'GROUND', NULL, NULL, NULL)," +
                "(751, 'DEWPIDER', 'INITIAL', 'WATER', 'BUG', NULL, NULL)," +
                "(752, 'ARAQUANID', 'FINAL', 'WATER', 'BUG', NULL, NULL)," +
                "(753, 'FOMANTIS', 'INITIAL', 'GRASS', NULL, NULL, NULL)," +
                "(754, 'LURANTIS', 'FINAL', 'GRASS', NULL, NULL, NULL)," +
                "(755, 'MORELULL', 'INITIAL', 'GRASS', 'FAIRY', NULL, NULL)," +
                "(756, 'SHIINOTIC', 'FINAL', 'GRASS', 'FAIRY', NULL, NULL)," +
                "(757, 'SALANDIT', 'INITIAL', 'POISON', 'FIRE', NULL, NULL)," +
                "(758, 'SALAZZLE', 'FINAL', 'POISON', 'FIRE', NULL, NULL)," +
                "(759, 'STUFFUL', 'INITIAL', 'NORMAL', 'FIGHTING', NULL, NULL)," +
                "(760, 'BEWEAR', 'FINAL', 'NORMAL', 'FIGHTING', NULL, NULL)," +
                "(761, 'BOUNSWEET', 'INITIAL', 'GRASS', NULL, NULL, NULL)," +
                "(762, 'STEENEE', 'MIDDLE', 'GRASS', NULL, NULL, NULL)," +
                "(763, 'TSAREENA', 'FINAL', 'GRASS', NULL, NULL, NULL)," +
                "(764, 'COMFEY', 'SINGLE', 'FAIRY', NULL, NULL, NULL)," +
                "(765, 'ORANGURU', 'SINGLE', 'NORMAL', 'PSYCHIC', NULL, NULL)," +
                "(766, 'PASSIMIAN', 'SINGLE', 'FIGHTING', NULL, NULL, NULL)," +
                "(767, 'WIMPOD', 'INITIAL', 'BUG', 'WATER', NULL, NULL)," +
                "(768, 'GOLISOPOD', 'FINAL', 'BUG', 'WATER', NULL, NULL)," +
                "(769, 'SANDYGAST', 'INITIAL', 'GHOST', 'GROUND', NULL, NULL)," +
                "(770, 'PALOSSAND', 'FINAL', 'GHOST', 'GROUND', NULL, NULL)," +
                "(771, 'PYUKUMUKU', 'SINGLE', 'WATER', NULL, NULL, NULL)," +
                "(772, 'TYPE: NULL', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(773, 'SILVALLY', 'FINAL', 'NORMAL', NULL, NULL, 'ITEM')," +
                "(774, 'MINIOR', 'SINGLE', 'ROCK', 'FLYING', NULL, NULL)," +
                "(775, 'KOMALA', 'SINGLE', 'NORMAL', NULL, NULL, NULL)," +
                "(776, 'TURTONATOR', 'SINGLE', 'FIRE', 'DRAGON', NULL, NULL)," +
                "(777, 'TOGEDEMARU', 'SINGLE', 'ELECTRIC', 'STEEL', NULL, NULL)," +
                "(778, 'MIMIKYU', 'SINGLE', 'GHOST', 'FAIRY', NULL, NULL)," +
                "(779, 'BRUXISH', 'SINGLE', 'WATER', 'PSYCHIC', NULL, NULL)," +
                "(780, 'DRAMPA', 'SINGLE', 'NORMAL', 'DRAGON', NULL, NULL)," +
                "(781, 'DHELMISE', 'SINGLE', 'GHOST', 'GRASS', NULL, NULL)," +
                "(782, 'JANGMO-O', 'INITIAL', 'DRAGON', NULL, NULL, NULL)," +
                "(783, 'HAKAMO-O', 'MIDDLE', 'DRAGON', 'FIGHTING', NULL, NULL)," +
                "(784, 'KOMMO-O', 'FINAL', 'DRAGON', 'FIGHTING', NULL, NULL)," +
                "(785, 'TAPU KOKO', 'SINGLE', 'ELECTRIC', 'FAIRY', 'LEGENDARY', NULL)," +
                "(786, 'TAPU LELE', 'SINGLE', 'PSYCHIC', 'FAIRY', 'LEGENDARY', NULL)," +
                "(787, 'TAPU BULU', 'SINGLE', 'GRASS', 'FAIRY', 'LEGENDARY', NULL)," +
                "(788, 'TAPU FINI', 'SINGLE', 'WATER', 'FAIRY', 'LEGENDARY', NULL)," +
                "(789, 'COSMOG', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(790, 'COSMOEM', 'MIDDLE', 'PSYCHIC', NULL, NULL, NULL)," +
                "(791, 'SOLGALEO', 'FINAL', 'PSYCHIC', 'STEEL', 'LEGENDARY', NULL)," +
                "(792, 'LUNALA', 'FINAL', 'PSYCHIC', 'GHOST', 'LEGENDARY', NULL)," +
                "(793, 'NIHILEGO', 'SINGLE', 'ROCK', 'POISON', 'LEGENDARY', NULL)," +
                "(794, 'BUZZWOLE', 'SINGLE', 'BUG', 'FIGHTING', 'LEGENDARY', NULL)," +
                "(795, 'PHEROMOSA', 'SINGLE', 'BUG', 'FIGHTING', 'LEGENDARY', NULL)," +
                "(796, 'XURKITREE', 'SINGLE', 'ELECTRIC', NULL, 'LEGENDARY', NULL)," +
                "(797, 'CELESTEELA', 'SINGLE', 'STEEL', 'FLYING', 'LEGENDARY', NULL)," +
                "(798, 'KARTANA', 'SINGLE', 'GRASS', 'STEEL', 'LEGENDARY', NULL)," +
                "(799, 'GUZZLORD', 'SINGLE', 'DARK', 'DRAGON', 'LEGENDARY', NULL)," +
                "(800, 'NECROZMA', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL)," +
                "(801, 'MAGEARNA', 'SINGLE', 'STEEL', 'FAIRY', 'LEGENDARY', NULL)," +
                "(802, 'MARSHADOW', 'SINGLE', 'FIGHTING', 'GHOST', 'LEGENDARY', NULL)," +
                "(803, 'POIPOLE', 'INITIAL', 'POISON', NULL, 'LEGENDARY', NULL)," +
                "(804, 'NAGANADEL', 'FINAL', 'POISON', 'DRAGON', 'LEGENDARY', NULL)," +
                "(805, 'STAKATAKA', 'SINGLE', 'ROCK', 'STEEL', 'LEGENDARY', NULL)," +
                "(806, 'BLACEPHALON', 'SINGLE', 'FIRE', 'GHOST', 'LEGENDARY', NULL)," +
                "(807, 'ZERAORA', 'SINGLE', 'ELECTRIC', NULL, 'LEGENDARY', NULL)," +
                "(808, 'MELTAN', 'SINGLE', 'STEEL', NULL, 'LEGENDARY', NULL)," +
                "(809, 'MELMETAL', 'FINAL', 'STEEL', NULL, 'LEGENDARY', NULL)," +
                "(810, 'GROOKEY', 'INITIAL', 'GRASS', NULL, 'STARTER', NULL)," +
                "(811, 'THWACKEY', 'MIDDLE', 'GRASS', NULL, 'STARTER', NULL)," +
                "(812, 'RILLABOOM', 'FINAL', 'GRASS', NULL, 'STARTER', NULL)," +
                "(813, 'SCORBUNNY', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL)," +
                "(814, 'RABOOT', 'MIDDLE', 'FIRE', NULL, 'STARTER', NULL)," +
                "(815, 'CINDERACE', 'FINAL', 'FIRE', NULL, 'STARTER', NULL)," +
                "(816, 'SOBBLE', 'INITIAL', 'WATER', NULL, 'STARTER', NULL)," +
                "(817, 'DRIZZILE', 'MIDDLE', 'WATER', NULL, 'STARTER', NULL)," +
                "(818, 'INTELEON', 'FINAL', 'WATER', NULL, 'STARTER', NULL)," +
                "(819, 'SKWOVET', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(820, 'GREEDENT', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(821, 'ROOKIDEE', 'INITIAL', 'FLYING', NULL, NULL, NULL)," +
                "(822, 'CORVISQUIRE', 'MIDDLE', 'FLYING', NULL, NULL, NULL)," +
                "(823, 'CORVIKNIGHT', 'FINAL', 'FLYING', 'STEEL', NULL, NULL)," +
                "(824, 'BLIPBUG', 'INITIAL', 'BUG', NULL, NULL, NULL)," +
                "(825, 'DOTTLER', 'MIDDLE', 'BUG', 'PSYCHIC', NULL, NULL)," +
                "(826, 'ORBEETLE', 'FINAL', 'BUG', 'PSYCHIC', NULL, NULL)," +
                "(827, 'NICKIT', 'INITIAL', 'DARK', NULL, NULL, NULL)," +
                "(828, 'THIEVUL', 'FINAL', 'DARK', NULL, NULL, NULL)," +
                "(829, 'GOSSIFLEUR', 'INITIAL', 'GRASS', NULL, NULL, NULL)," +
                "(830, 'ELDEGOSS', 'FINAL', 'GRASS', NULL, NULL, NULL)," +
                "(831, 'WOOLOO', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(832, 'DUBWOOL', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(833, 'CHEWTLE', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(834, 'DREDNAW', 'FINAL', 'WATER', 'ROCK', NULL, NULL)," +
                "(835, 'YAMPER', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL)," +
                "(836, 'BOLTUND', 'FINAL', 'ELECTRIC', NULL, NULL, NULL)," +
                "(837, 'ROLYCOLY', 'INITIAL', 'ROCK', NULL, NULL, NULL)," +
                "(838, 'CARKOL', 'MIDDLE', 'ROCK', 'FIRE', NULL, NULL)," +
                "(839, 'COALOSSAL', 'FINAL', 'ROCK', 'FIRE', NULL, NULL)," +
                "(840, 'APPLIN', 'INITIAL', 'GRASS', 'DRAGON', NULL, NULL)," +
                "(841, 'FLAPPLE', 'FINAL', 'GRASS', 'DRAGON', NULL, 'ITEM')," +
                "(842, 'APPLETON', 'FINAL', 'GRASS', 'DRAGON', NULL, 'ITEM')," +
                "(843, 'SILICOBRA', 'INITIAL', 'GROUND', NULL, NULL, NULL)," +
                "(844, 'SANDACONDA', 'FINAL', 'GROUND', NULL, NULL, NULL)," +
                "(845, 'CRAMORANT', 'SINGLE', 'FLYING', 'WATER', NULL, NULL)," +
                "(846, 'ARROKUDA', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(847, 'BARRASKEWDA', 'FINAL', 'WATER', NULL, NULL, NULL)," +
                "(848, 'TOXEL', 'INITIAL', 'ELECTRIC', 'POISON', NULL, NULL)," +
                "(849, 'TOXTRICITY', 'FINAL', 'ELECTRIC', 'POISON', NULL, NULL)," +
                "(850, 'SIZZLIPEDE', 'INITIAL', 'FIRE', 'BUG', NULL, NULL)," +
                "(851, 'CENTISKORCH', 'FINAL', 'FIRE', 'BUG', NULL, NULL)," +
                "(852, 'CLOBBOPUS', 'INITIAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(853, 'GRAPPLOCT', 'FINAL', 'FIGHTING', NULL, NULL, NULL)," +
                "(854, 'SINISTEA', 'INITIAL', 'GHOST', NULL, NULL, NULL)," +
                "(855, 'POLTEAGEIST', 'FINAL', 'GHOST', NULL, NULL, 'ITEM')," +
                "(856, 'HATENNA', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(857, 'HATTREM', 'MIDDLE', 'PSYCHIC', NULL, NULL, NULL)," +
                "(858, 'HATTERENE', 'FINAL', 'PSYCHIC', 'FAIRY', NULL, NULL)," +
                "(859, 'IMPIDIMP', 'INITIAL', 'DARK', 'FAIRY', NULL, NULL)," +
                "(860, 'MORGREM', 'MIDDLE', 'DARK', 'FAIRY', NULL, NULL)," +
                "(861, 'GRIMMSNARL', 'FINAL', 'DARK', 'FAIRY', NULL, NULL)," +
                "(862, 'OBSTAGOON', 'FINAL', 'DARK', 'NORMAL', NULL, NULL)," +
                "(863, 'PERRSERKER', 'FINAL', 'STEEL', NULL, NULL, NULL)," +
                "(864, 'CURSOLA', 'FINAL', 'GHOST', NULL, NULL, NULL)," +
                "(865, 'SIRFETCHD', 'FINAL', 'FIGHTING', NULL, NULL, 'ITEM')," +
                "(866, 'MR_RIME', 'FINAL', 'ICE', 'PSYCHIC', NULL, NULL)," +
                "(867, 'RUNERIGUS', 'FINAL', 'GROUND', 'GHOST', NULL, 'ITEM')," +
                "(868, 'MILCERY', 'INITIAL', 'FAIRY', NULL, NULL, 'ITEM')," +
                "(869, 'ALCREMIE', 'FINAL', 'FAIRY', NULL, NULL, NULL)," +
                "(870, 'FALINKS', 'SINGLE', 'FIGHTING', NULL, NULL, NULL)," +
                "(871, 'PINCURCHIN', 'SINGLE', 'ELECTRIC', NULL, NULL, NULL)," +
                "(872, 'SNOM', 'INITIAL', 'ICE', 'BUG', NULL, NULL)," +
                "(873, 'FROSMOTH', 'FINAL', 'ICE', 'BUG', NULL, 'FRIENDSHIP')," +
                "(874, 'STONJOURNER', 'SINGLE', 'ROCK', NULL, NULL, NULL)," +
                "(875, 'EISCUE', 'SINGLE', 'ICE', NULL, NULL, NULL)," +
                "(876, 'INDEEDEE', 'SINGLE', 'PSYCHIC', 'NORMAL', NULL, NULL)," +
                "(877, 'MORPEKO', 'SINGLE', 'ELECTRIC', 'DARK', NULL, NULL)," +
                "(878, 'CUFANT', 'INITIAL', 'STEEL', NULL, NULL, NULL)," +
                "(879, 'COPPERAJAH', 'FINAL', 'STEEL', NULL, NULL, NULL)," +
                "(880, 'DRACOZOLT', 'FINAL', 'ELECTRIC', 'DRAGON', 'FOSSIL', NULL)," +
                "(881, 'ARCTOZOLT', 'FINAL', 'ELECTRIC', 'ICE', 'FOSSIL', NULL)," +
                "(882, 'DRACOVISH', 'FINAL', 'WATER', 'DRAGON', 'FOSSIL', NULL)," +
                "(883, 'ARCTOVISH', 'FINAL', 'WATER', 'ICE', 'FOSSIL', NULL)," +
                "(884, 'DURALUDON', 'INITIAL', 'STEEL', 'DRAGON', NULL, NULL)," +
                "(885, 'DREEPY', 'INITIAL', 'DRAGON', 'GHOST', NULL, NULL)," +
                "(886, 'DRAKLOAK', 'MIDDLE', 'DRAGON', 'GHOST', NULL, NULL)," +
                "(887, 'DRAGAPULT', 'FINAL', 'DRAGON', 'GHOST', NULL, NULL)," +
                "(888, 'ZACIAN', 'SINGLE', 'FAIRY', 'STEEL', 'LEGENDARY', NULL)," +
                "(889, 'ZAMAZENTA', 'SINGLE', 'FIGHTING', 'STEEL', 'LEGENDARY', NULL)," +
                "(890, 'ETERNATUS', 'SINGLE', 'POISON', 'DRAGON', 'LEGENDARY', NULL)," +
                "(891, 'KUBFU', 'INITIAL', 'FIGHTING', NULL, 'LEGENDARY', NULL)," +
                "(892, 'URSHIFU', 'FINAL', 'FIGHTING', 'DARK', 'LEGENDARY', NULL)," +
                "(893, 'ZARUDE', 'SINGLE', 'DARK', 'GRASS', 'LEGENDARY', NULL)," +
                "(894, 'REGIELEKI', 'SINGLE', 'ELECTRIC', NULL, 'LEGENDARY', NULL)," +
                "(895, 'REGIDRAGO', 'SINGLE', 'DRAGON', NULL, 'LEGENDARY', NULL)," +
                "(896, 'GLASTRIER', 'SINGLE', 'ICE', NULL, 'LEGENDARY', NULL)," +
                "(897, 'SPECTRIER', 'SINGLE', 'GHOST', NULL, 'LEGENDARY', NULL)," +
                "(898, 'CALYREX', 'SINGLE', 'PSYCHIC', 'GRASS', 'LEGENDARY', NULL)," +
                "(899, 'WYRDEER', 'FINAL', 'NORMAL', 'PSYCHIC', NULL, NULL)," +
                "(900, 'KLEAVOR', 'FINAL', 'BUG', 'ROCK', NULL, NULL)," +
                "(901, 'URSALUNA', 'FINAL', 'NORMAL', 'GROUND', NULL, NULL)," +
                "(902, 'BASCULEGION', 'FINAL', 'WATER', 'GHOST', NULL, NULL)," +
                "(903, 'SNEASLER', 'FINAL', 'FIGHTING', 'POISON', NULL, NULL)," +
                "(904, 'OVERQWIL', 'FINAL', 'DARK', 'POISON', NULL, NULL)," +
                "(905, 'ENAMORUS', 'SINGLE', 'FAIRY', 'FLYING', 'LEGENDARY', NULL)," +
                "(906, 'SPRIGATITO', 'INITIAL', 'GRASS', NULL, 'STARTER', NULL)," +
                "(907, 'FLORAGATO', 'MIDDLE', 'GRASS', NULL, 'STARTER', NULL)," +
                "(908, 'MEOWSCARADA', 'FINAL', 'GRASS', 'DARK', 'STARTER', NULL)," +
                "(909, 'FUECOCO', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL)," +
                "(910, 'CROCALOR', 'MIDDLE', 'FIRE', NULL, 'STARTER', NULL)," +
                "(911, 'SKELEDIRGE', 'FINAL', 'FIRE', 'GHOST', 'STARTER', NULL)," +
                "(912, 'QUAXLY', 'INITIAL', 'WATER', NULL, 'STARTER', NULL)," +
                "(913, 'QUAXWELL', 'MIDDLE', 'WATER', NULL, 'STARTER', NULL)," +
                "(914, 'QUAQUAVAL', 'FINAL', 'WATER', 'FIGHTING', 'STARTER', NULL)," +
                "(915, 'LECHONK', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(916, 'OINKOLOGNE', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(917, 'TAROUNTULA', 'INITIAL', 'BUG', NULL, NULL, NULL)," +
                "(918, 'SPIDOPS', 'FINAL', 'BUG', NULL, NULL, NULL)," +
                "(919, 'NYMBLE', 'INITIAL', 'BUG', NULL, NULL, NULL)," +
                "(920, 'LOKIX', 'FINAL', 'BUG', 'DARK', NULL, NULL)," +
                "(921, 'PAWMI', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL)," +
                "(922, 'PAWMO', 'MIDDLE', 'ELECTRIC', 'FIGHTING', NULL, NULL)," +
                "(923, 'PAWMOT', 'FINAL', 'ELECTRIC', 'FIGHTING', NULL, NULL)," +
                "(924, 'TANDEMAUS', 'INITIAL', 'NORMAL', NULL, NULL, NULL)," +
                "(925, 'MAUSHOLD', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(926, 'FIDDOUGH', 'INITIAL', 'FAIRY', NULL, NULL, NULL)," +
                "(927, 'DACHSBUN', 'FINAL', 'FAIRY', NULL, NULL, NULL)," +
                "(928, 'SMOLIV', 'INITIAL', 'GRASS', 'NORMAL', NULL, NULL)," +
                "(929, 'DOLLIV', 'MIDDLE', 'GRASS', 'NORMAL', NULL, NULL)," +
                "(930, 'ARBOLIVA', 'FINAL', 'GRASS', 'NORMAL', NULL, NULL)," +
                "(931, 'SQUAWKABILLY', 'SINGLE', 'NORMAL', 'FLYING', NULL, NULL)," +
                "(932, 'NACLI', 'INITIAL', 'ROCK', NULL, NULL, NULL)," +
                "(933, 'NACLSTACK', 'MIDDLE', 'ROCK', NULL, NULL, NULL)," +
                "(934, 'GARGANACL', 'FINAL', 'ROCK', NULL, NULL, NULL)," +
                "(935, 'CHARCADET', 'INITIAL', 'FIRE', NULL, NULL, NULL)," +
                "(936, 'ARMAROUGE', 'FINAL', 'FIRE', 'PSYCHIC', NULL, 'ITEM')," +
                "(937, 'CERULEDGE', 'FINAL', 'FIRE', 'GHOST', NULL, 'ITEM')," +
                "(938, 'TADBULB', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL)," +
                "(939, 'BELLIBOLT', 'FINAL', 'ELECTRIC', NULL, NULL, 'ITEM')," +
                "(940, 'WATTREL', 'INITIAL', 'ELECTRIC', 'FLYING', NULL, NULL)," +
                "(941, 'KILOWATTREL', 'FINAL', 'ELECTRIC', 'FLYING', NULL, NULL)," +
                "(942, 'MASCHIFF', 'INITIAL', 'DARK', NULL, NULL, NULL)," +
                "(943, 'MABOSTIFF', 'FINAL', 'DARK', NULL, NULL, NULL)," +
                "(944, 'SHROODLE', 'INITIAL', 'POISON', 'NORMAL', NULL, NULL)," +
                "(945, 'GRAFAIAI', 'FINAL', 'POISON', 'NORMAL', NULL, NULL)," +
                "(946, 'BRAMBLIN', 'INITIAL', 'GRASS', 'GHOST', NULL, NULL)," +
                "(947, 'BRAMBLEGHAST', 'FINAL', 'GRASS', 'GHOST', NULL, NULL)," +
                "(948, 'TOEDSCOOL', 'INITIAL', 'GROUND', 'GRASS', NULL, NULL)," +
                "(949, 'TOEDSCRUEL', 'FINAL', 'GROUND', 'GRASS', NULL, NULL)," +
                "(950, 'KLAWFF', 'SINGLE', 'ROCK', NULL, NULL, NULL)," +
                "(951, 'CAPSAKID', 'INITIAL', 'GRASS', NULL, NULL, NULL)," +
                "(952, 'SCOVILLAIN', 'FINAL', 'GRASS', 'FIRE', NULL, 'ITEM')," +
                "(953, 'RELLOR', 'INITIAL', 'BUG', NULL, NULL, NULL)," +
                "(954, 'RABSCA', 'FINAL', 'BUG', 'PSYCHIC', NULL, NULL)," +
                "(955, 'FLITTLE', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(956, 'ESPATHRA', 'FINAL', 'PSYCHIC', NULL, NULL, NULL)," +
                "(957, 'TINKATINK', 'INITIAL', 'FAIRY', 'STEEL', NULL, NULL)," +
                "(958, 'TINKATUFF', 'MIDDLE', 'FAIRY', 'STEEL', NULL, NULL)," +
                "(959, 'TINKATON', 'FINAL', 'FAIRY', 'STEEL', NULL, NULL)," +
                "(960, 'WIGLETT', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(961, 'WUGTRIO', 'FINAL', 'WATER', NULL, NULL, NULL)," +
                "(962, 'BOMBIRDIER', 'SINGLE', 'FLYING', 'DARK', NULL, NULL)," +
                "(963, 'FINIZEN', 'INITIAL', 'WATER', NULL, NULL, NULL)," +
                "(964, 'PALAFIN', 'FINAL', 'WATER', NULL, NULL, 'FRIENDSHIP')," +
                "(965, 'VAROOM', 'INITIAL', 'STEEL', 'POISON', NULL, NULL)," +
                "(966, 'REVAVROOM', 'FINAL', 'STEEL', 'POISON', NULL, NULL)," +
                "(967, 'CYCLOZAR', 'SINGLE', 'DRAGON', 'NORMAL', NULL, NULL)," +
                "(968, 'ORTHWORM', 'SINGLE', 'STEEL', NULL, NULL, NULL)," +
                "(969, 'GLIMMET', 'INITIAL', 'ROCK', 'POISON', NULL, NULL)," +
                "(970, 'GLIMMORA', 'FINAL', 'ROCK', 'POISON', NULL, NULL)," +
                "(971, 'GREAVARD', 'INITIAL', 'GHOST', NULL, NULL, NULL)," +
                "(972, 'HOUNDSTONE', 'FINAL', 'GHOST', NULL, NULL, NULL)," +
                "(973, 'FLAMIGO', 'SINGLE', 'FLYING', 'FIGHTING', NULL, NULL)," +
                "(974, 'CETODDLE', 'INITIAL', 'ICE', NULL, NULL, NULL)," +
                "(975, 'CETITAN', 'FINAL', 'ICE', NULL, NULL, 'ITEM')," +
                "(976, 'VELUZA', 'SINGLE', 'WATER', 'PSYCHIC', NULL, NULL)," +
                "(977, 'DONDOZO', 'SINGLE', 'WATER', NULL, NULL, NULL)," +
                "(978, 'TATSUGIRI', 'SINGLE', 'DRAGON', 'WATER', NULL, NULL)," +
                "(979, 'ANNIHILAPE', 'FINAL', 'FIGHTING', 'GHOST', NULL, NULL)," +
                "(980, 'CLODSIRE', 'FINAL', 'POISON', 'GROUND', NULL, NULL)," +
                "(981, 'FARIGIRAF', 'FINAL', 'NORMAL', 'PSYCHIC', NULL, NULL)," +
                "(982, 'DUDUNSPARCE', 'FINAL', 'NORMAL', NULL, NULL, NULL)," +
                "(983, 'KINGAMBIT', 'FINAL', 'DARK', 'STEEL', NULL, NULL)," +
                "(984, 'GREAT TUSK', 'SINGLE', 'GROUND', 'FIGHTING', NULL, NULL)," +
                "(985, 'SCREAM TAIL', 'SINGLE', 'FAIRY', 'PSYCHIC', NULL, NULL)," +
                "(986, 'BRUTE BONNET', 'SINGLE', 'GRASS', 'DARK', NULL, NULL)," +
                "(987, 'FLUTTER MANE', 'SINGLE', 'GHOST', 'FAIRY', NULL, NULL)," +
                "(988, 'SLITHER WING', 'SINGLE', 'BUG', 'FIGHTING', NULL, NULL)," +
                "(989, 'SANDY SHOCKS', 'SINGLE', 'ELECTRIC', 'GROUND', NULL, NULL)," +
                "(990, 'IRON TREADS', 'SINGLE', 'GROUND', 'STEEL', NULL, NULL)," +
                "(991, 'IRON BUNDLE', 'SINGLE', 'ICE', 'WATER', NULL, NULL)," +
                "(992, 'IRON HANDS', 'SINGLE', 'FIGHTING', 'ELECTRIC', NULL, NULL)," +
                "(993, 'IRON JUGULIS', 'SINGLE', 'DARK', 'FLYING', NULL, NULL)," +
                "(994, 'IRON MOTH', 'SINGLE', 'FIRE', 'POISON', NULL, NULL)," +
                "(995, 'IRON THORNS', 'SINGLE', 'ROCK', 'ELECTRIC', NULL, NULL)," +
                "(996, 'FRIGIBAX', 'INITIAL', 'DRAGON', 'ICE', NULL, NULL)," +
                "(997, 'ARCTIBAX', 'MIDDLE', 'DRAGON', 'ICE', NULL, NULL)," +
                "(998, 'BAXCALIBUR', 'FINAL', 'DRAGON', 'ICE', NULL, NULL)," +
                "(999, 'GIMMIGHOUL', 'INITIAL', 'GHOST', NULL, NULL, NULL)," +
                "(1000, 'GHOLDENGO', 'FINAL', 'GHOST', 'STEEL', NULL, NULL)," +
                "(1001, 'WO-CHIEN', 'SINGLE', 'DARK', 'GRASS', NULL, NULL)," +
                "(1002, 'CHIEN-PAO', 'SINGLE', 'DARK', 'ICE', NULL, NULL)," +
                "(1003, 'TING-LU', 'SINGLE', 'DARK', 'GROUND', NULL, NULL)," +
                "(1004, 'CHI-YU', 'SINGLE', 'DARK', 'FIRE', NULL, NULL)," +
                "(1005, 'ROARING MOON', 'SINGLE', 'DRAGON', 'DARK', NULL, NULL)," +
                "(1006, 'IRON VALIANT', 'SINGLE', 'FAIRY', 'FIGHTING', NULL, NULL)," +
                "(1007, 'KORAIDON', 'SINGLE', 'FIGHTING', 'DRAGON', 'LEGENDARY', NULL)," +
                "(1008, 'MIRAIDON', 'SINGLE', 'ELECTRIC', 'DRAGON', 'LEGENDARY', NULL)," +
                "(1009, 'WALKING WAKE', 'SINGLE', 'WATER', 'DRAGON', NULL, NULL)," +
                "(1010, 'IRON LEAVES', 'SINGLE', 'GRASS', 'PSYCHIC', 'LEGENDARY', NULL)," +
                "(1011, 'DIPPLIN', 'MIDDLE', 'GRASS', 'DRAGON', NULL, NULL)," +
                "(1012, 'POLTCHAGEIST', 'INITIAL', 'GRASS', 'GHOST', NULL, NULL)," +
                "(1013, 'SINISTCHA', 'FINAL', 'GRASS', 'GHOST', NULL, 'ITEM')," +
                "(1014, 'OKIDOGI', 'SINGLE', 'POISON', 'FIGHTING', 'LEGENDARY', NULL)," +
                "(1015, 'MUNKIDORI', 'SINGLE', 'POISON', 'PSYCHIC', 'LEGENDARY', NULL)," +
                "(1016, 'FEZANDIPITI', 'SINGLE', 'POISON', 'FAIRY', 'LEGENDARY', NULL)," +
                "(1017, 'OGERPON', 'SINGLE', 'GRASS', NULL, 'LEGENDARY', NULL)," +
                "(1018, 'ARCHALUDON', 'FINAL', 'STEEL', 'DRAGON', NULL, 'ITEM')," +
                "(1019, 'HYDRAPPLE', 'FINAL', 'GRASS', 'DRAGON', NULL, NULL)," +
                "(1020, 'GOUGING FIRE', 'SINGLE', 'FIRE', 'DRAGON', 'LEGENDARY', NULL)," +
                "(1021, 'RAGING BOLT', 'SINGLE', 'ELECTRIC', 'DRAGON', 'LEGENDARY', NULL)," +
                "(1022, 'IRON BOULDER', 'SINGLE', 'ROCK', 'PSYCHIC', 'LEGENDARY', NULL)," +
                "(1023, 'IRON CROWN', 'SINGLE', 'STEEL', 'PSYCHIC', 'LEGENDARY', NULL)," +
                "(1024, 'TERAPAGOS', 'SINGLE', 'NORMAL', NULL, 'LEGENDARY', NULL)," +
                "(1025, 'PECHARUNT', 'SINGLE', 'POISON', 'GHOST', 'LEGENDARY', NULL);"

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
