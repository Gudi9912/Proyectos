const db = require("aa-sqlite");
const path = require("path")

async function CrearBaseSiNoExiste() {
    try {
        await db.open(path.resolve(__dirname, "../../.data/Pokemon.db"));
        console.log("Base de datos abierta correctamente");
        
        let res = null;
        let existe = false;

        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'Pokemon' ", 
            []
        )

        if (res.contar > 0) existe = true;

        if (!existe) {
            await db.run(
                "CREATE TABLE Pokemon (" +
                "IdPokedex INTEGER PRIMARY KEY, " +
                "Name STRING NOT NULL, " +
                "EvolutionStage STRING NOT NULL, " +
                "FirstType STRING NOT NULL, " +
                "SecondType STRING, " +
                "Special STRING, " +
                "EvolutionMethod STRING," +
                "Region STRING NOT NULL);"
            );
            console.log("Tabla Pokemon creada con éxito");
            await db.run(
                "INSERT INTO Pokemon (IdPokedex, Name, EvolutionStage, FirstType, SecondType, Special, EvolutionMethod, Region)" +
                "VALUES " +
                "(1, 'BULBASAUR', 'INITIAL', 'GRASS', 'POISON', 'STARTER', NULL, 'Kanto')," +
                "(2, 'IVYSAUR', 'MIDDLE', 'GRASS', 'POISON', 'STARTER', NULL, 'Kanto')," +
                "(3, 'VENUSAUR', 'FINAL', 'GRASS', 'POISON', 'STARTER', NULL, 'Kanto')," +
                "(4, 'CHARMANDER', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL, 'Kanto')," +
                "(5, 'CHARMELEON', 'MIDDLE', 'FIRE', NULL, 'STARTER', NULL, 'Kanto')," +
                "(6, 'CHARIZARD', 'FINAL', 'FIRE', 'FLYING', 'STARTER', NULL, 'Kanto')," +
                "(7, 'SQUIRTLE', 'INITIAL', 'WATER', NULL, 'STARTER', NULL, 'Kanto')," +
                "(8, 'WARTORTLE', 'MIDDLE', 'WATER', NULL, 'STARTER', NULL, 'Kanto')," +
                "(9, 'BLASTOISE', 'FINAL', 'WATER', NULL, 'STARTER', NULL, 'Kanto')," +
                "(10, 'CATERPIE', 'INITIAL', 'BUG', NULL, NULL, NULL, 'Kanto')," +
                "(11, 'METAPOD', 'MIDDLE', 'BUG', NULL, NULL, NULL, 'Kanto')," +
                "(12, 'BUTTERFREE', 'FINAL', 'BUG', 'FLYING', NULL, NULL, 'Kanto')," +
                "(13, 'WEEDLE', 'INITIAL', 'BUG', 'POISON', NULL, NULL, 'Kanto')," +
                "(14, 'KAKUNA', 'MIDDLE', 'BUG', 'POISON', NULL, NULL, 'Kanto')," +
                "(15, 'BEEDRILL', 'FINAL', 'BUG', 'POISON', NULL, NULL, 'Kanto')," +
                "(16, 'PIDGEY', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL, 'Kanto')," +
                "(17, 'PIDGEOTTO', 'MIDDLE', 'NORMAL', 'FLYING', NULL, NULL, 'Kanto')," +
                "(18, 'PIDGEOT', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL, 'Kanto')," +
                "(19, 'RATTATA', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Kanto')," +
                "(20, 'RATICATE', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Kanto')," +
                "(21, 'SPEAROW', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL, 'Kanto')," +
                "(22, 'FEAROW', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL, 'Kanto')," +
                "(23, 'EKANS', 'INITIAL', 'POISON', NULL, NULL, NULL, 'Kanto')," +
                "(24, 'ARBOK', 'FINAL', 'POISON', NULL, NULL, NULL, 'Kanto')," +
                "(25, 'PIKACHU', 'MIDDLE', 'ELECTRIC', NULL, 'STARTER', NULL, 'Kanto')," +
                "(26, 'RAICHU', 'FINAL', 'ELECTRIC', NULL, 'STARTER', 'ITEM', 'Kanto')," +
                "(27, 'SANDSHREW', 'INITIAL', 'GROUND', NULL, NULL, NULL, 'Kanto')," +
                "(28, 'SANDSLASH', 'FINAL', 'GROUND', NULL, NULL, NULL, 'Kanto')," +
                "(29, 'NIDORAN♀', 'INITIAL', 'POISON', NULL, NULL, NULL, 'Kanto')," +
                "(30, 'NIDORINA', 'MIDDLE', 'POISON', NULL, NULL, NULL, 'Kanto')," +
                "(31, 'NIDOQUEEN', 'FINAL', 'POISON', 'GROUND', NULL, 'ITEM', 'Kanto')," +
                "(32, 'NIDORAN♂', 'INITIAL', 'POISON', NULL, NULL, NULL, 'Kanto')," +
                "(33, 'NIDORINO', 'MIDDLE', 'POISON', NULL, NULL, NULL, 'Kanto')," +
                "(34, 'NIDOKING', 'FINAL', 'POISON', 'GROUND', NULL, 'ITEM', 'Kanto')," +
                "(35, 'CLEFAIRY', 'MIDDLE', 'FAIRY', NULL, NULL, NULL, 'Kanto')," +
                "(36, 'CLEFABLE', 'FINAL', 'FAIRY', NULL, NULL, 'ITEM', 'Kanto')," +
                "(37, 'VULPIX', 'INITIAL', 'FIRE', NULL, NULL, NULL, 'Kanto')," +
                "(38, 'NINETALES', 'FINAL', 'FIRE', NULL, NULL, 'ITEM', 'Kanto')," +
                "(39, 'JIGGLYPUFF', 'MIDDLE', 'NORMAL', 'FAIRY', NULL, NULL, 'Kanto')," +
                "(40, 'WIGGLYTUFF', 'FINAL', 'NORMAL', 'FAIRY', NULL, NULL, 'Kanto')," +
                "(41, 'ZUBAT', 'INITIAL', 'POISON', 'FLYING', NULL, NULL, 'Kanto')," +
                "(42, 'GOLBAT', 'MIDDLE', 'POISON', 'FLYING', NULL, NULL, 'Kanto')," +
                "(43, 'ODDISH', 'INITIAL', 'GRASS', 'POISON', NULL, NULL, 'Kanto')," +
                "(44, 'GLOOM', 'MIDDLE', 'GRASS', 'POISON', NULL, NULL, 'Kanto')," +
                "(45, 'VILEPLUME', 'FINAL', 'GRASS', 'POISON', NULL, 'ITEM', 'Kanto')," +
                "(46, 'PARAS', 'INITIAL', 'BUG', 'GRASS', NULL, NULL, 'Kanto')," +
                "(47, 'PARASECT', 'FINAL', 'BUG', 'GRASS', NULL, NULL, 'Kanto')," + 
                "(48, 'VENONAT', 'INITIAL', 'BUG', 'POISON', NULL, NULL, 'Kanto')," +
                "(49, 'VENOMOTH', 'FINAL', 'BUG', 'POISON', NULL, NULL, 'Kanto')," +
                "(50, 'DIGLETT', 'INITIAL', 'GROUND', NULL, NULL, NULL, 'Kanto')," +
                "(51, 'DUGTRIO', 'FINAL', 'GROUND', NULL, NULL, NULL, 'Kanto')," +
                "(52, 'MEOWTH', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Kanto')," +
                "(53, 'PERSIAN', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Kanto')," +
                "(54, 'PSYDUCK', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Kanto')," +
                "(55, 'GOLDUCK', 'FINAL', 'WATER', NULL, NULL, NULL, 'Kanto')," +
                "(56, 'MANKEY', 'INITIAL', 'FIGHTING', NULL, NULL, NULL, 'Kanto')," +
                "(57, 'PRIMEAPE', 'MIDDLE', 'FIGHTING', NULL, NULL, NULL, 'Kanto')," +
                "(58, 'GROWLITHE', 'INITIAL', 'FIRE', NULL, NULL, NULL, 'Kanto')," +
                "(59, 'ARCANINE', 'FINAL', 'FIRE', NULL, NULL, 'ITEM', 'Kanto')," +
                "(60, 'POLIWAG', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Kanto')," +
                "(61, 'POLIWHIRL', 'MIDDLE', 'WATER', NULL, NULL, NULL, 'Kanto')," +
                "(62, 'POLIWRATH', 'FINAL', 'WATER', 'FIGHTING', NULL, 'ITEM', 'Kanto')," +
                "(63, 'ABRA', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL, 'Kanto')," +
                "(64, 'KADABRA', 'MIDDLE', 'PSYCHIC', NULL, NULL, NULL, 'Kanto')," +
                "(65, 'ALAKAZAM', 'FINAL', 'PSYCHIC', NULL, NULL, 'TRADE', 'Kanto')," +
                "(66, 'MACHOP', 'INITIAL', 'FIGHTING', NULL, NULL, NULL, 'Kanto')," +
                "(67, 'MACHOKE', 'MIDDLE', 'FIGHTING', NULL, NULL, NULL, 'Kanto')," +
                "(68, 'MACHAMP', 'FINAL', 'FIGHTING', NULL, NULL, 'TRADE', 'Kanto')," +
                "(69, 'BELLSPROUT', 'INITIAL', 'GRASS', 'POISON', NULL, NULL, 'Kanto')," +
                "(70, 'WEEPINBELL', 'MIDDLE', 'GRASS', 'POISON', NULL, NULL, 'Kanto')," +
                "(71, 'VICTREEBEL', 'FINAL', 'GRASS', 'POISON', NULL, 'ITEM', 'Kanto')," +
                "(72, 'TENTACOOL', 'INITIAL', 'WATER', 'POISON', NULL, NULL, 'Kanto')," +
                "(73, 'TENTACRUEL', 'FINAL', 'WATER', 'POISON', NULL, NULL, 'Kanto')," +
                "(74, 'GEODUDE', 'INITIAL', 'ROCK', 'GROUND', NULL, NULL, 'Kanto')," +
                "(75, 'GRAVELER', 'MIDDLE', 'ROCK', 'GROUND', NULL, NULL, 'Kanto')," +
                "(76, 'GOLEM', 'FINAL', 'ROCK', 'GROUND', NULL, 'TRADE', 'Kanto')," +
                "(77, 'PONYTA', 'INITIAL', 'FIRE', NULL, NULL, NULL, 'Kanto')," +
                "(78, 'RAPIDASH', 'FINAL', 'FIRE', NULL, NULL, NULL, 'Kanto')," +
                "(79, 'SLOWPOKE', 'INITIAL', 'WATER', 'PSYCHIC', NULL, 'ITEM', 'Kanto')," +
                "(80, 'SLOWBRO', 'FINAL', 'WATER', 'PSYCHIC', NULL, NULL, 'Kanto')," +
                "(81, 'MAGNEMITE', 'INITIAL', 'ELECTRIC', 'STEEL', NULL, NULL, 'Kanto')," +
                "(82, 'MAGNETON', 'FINAL', 'ELECTRIC', 'STEEL', NULL, NULL, 'Kanto')," +
                "(83, 'FARFETCHD', 'SINGLE', 'NORMAL', 'FLYING', NULL, NULL, 'Kanto')," +
                "(84, 'DODUO', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL, 'Kanto')," +
                "(85, 'DODRIO', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL, 'Kanto')," +
                "(86, 'SEEL', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Kanto')," +
                "(87, 'DEWGONG', 'FINAL', 'WATER', 'ICE', NULL, NULL, 'Kanto')," +
                "(88, 'GRIMER', 'INITIAL', 'POISON', NULL, NULL, NULL, 'Kanto')," +
                "(89, 'MUK', 'FINAL', 'POISON', NULL, NULL, NULL, 'Kanto')," +
                "(90, 'SHELLDER', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Kanto')," +
                "(91, 'CLOYSTER', 'FINAL', 'WATER', 'ICE', NULL, 'ITEM', 'Kanto')," +
                "(92, 'GASTLY', 'INITIAL', 'GHOST', 'POISON', NULL, NULL, 'Kanto')," +
                "(93, 'HAUNTER', 'MIDDLE', 'GHOST', 'POISON', NULL, 'TRADE', 'Kanto')," +
                "(94, 'GENGAR', 'FINAL', 'GHOST', 'POISON', NULL, NULL, 'Kanto')," +
                "(95, 'ONIX', 'INITIAL', 'ROCK', 'GROUND', NULL, NULL, 'Kanto')," +
                "(96, 'DROWZEE', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL, 'Kanto')," +
                "(97, 'HYPNO', 'FINAL', 'PSYCHIC', NULL, NULL, NULL, 'Kanto')," +
                "(98, 'KRABBY', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Kanto')," +
                "(99, 'KINGLER', 'FINAL', 'WATER', NULL, NULL, NULL, 'Kanto')," +
                "(100, 'VOLTORB', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL, 'Kanto')," +
                "(101, 'ELECTRODE', 'FINAL', 'ELECTRIC', NULL, NULL, NULL, 'Kanto')," +
                "(102, 'EXEGGCUTE', 'INITIAL', 'GRASS', 'PSYCHIC', NULL, 'ITEM', 'Kanto')," +
                "(103, 'EXEGGUTOR', 'FINAL', 'GRASS', 'PSYCHIC', NULL, NULL, 'Kanto')," +
                "(104, 'CUBONE', 'INITIAL', 'GROUND', NULL, NULL, NULL, 'Kanto')," +
                "(105, 'MAROWAK', 'FINAL', 'GROUND', NULL, NULL, NULL, 'Kanto')," +
                "(106, 'HITMONLEE', 'FINAL', 'FIGHTING', NULL, NULL, NULL, 'Kanto')," +
                "(107, 'HITMONCHAN', 'FINAL', 'FIGHTING', NULL, NULL, NULL, 'Kanto')," +
                "(108, 'LICKITUNG', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Kanto')," +
                "(109, 'KOFFING', 'INITIAL', 'POISON', NULL, NULL, NULL, 'Kanto')," +
                "(110, 'WEEZING', 'FINAL', 'POISON', NULL, NULL, NULL, 'Kanto')," +
                "(111, 'RHYHORN', 'INITIAL', 'GROUND', 'ROCK', NULL, NULL, 'Kanto')," +
                "(112, 'RHYDON', 'MIDDLE', 'GROUND', 'ROCK', NULL, NULL, 'Kanto')," +
                "(113, 'CHANSEY', 'MIDDLE', 'NORMAL', NULL, NULL, NULL, 'Kanto')," +
                "(114, 'TANGELA', 'INITIAL', 'GRASS', NULL, NULL, NULL, 'Kanto')," +
                "(115, 'KANGASKHAN', 'SINGLE', 'NORMAL', NULL, NULL, NULL, 'Kanto')," +
                "(116, 'HORSEA', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Kanto')," +
                "(117, 'SEADRA', 'MIDDLE', 'WATER', NULL, NULL, NULL, 'Kanto')," +
                "(118, 'GOLDEEN', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Kanto')," +
                "(119, 'SEAKING', 'FINAL', 'WATER', NULL, NULL, NULL, 'Kanto')," +
                "(120, 'STARYU', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Kanto')," +
                "(121, 'STARMIE', 'FINAL', 'WATER', 'PSYCHIC', NULL, 'ITEM', 'Kanto')," +
                "(122, 'MR. MIME', 'FINAL', 'PSYCHIC', 'FAIRY', NULL, NULL, 'Kanto')," +
                "(123, 'SCYTHER', 'INITIAL', 'BUG', 'FLYING', NULL, NULL, 'Kanto')," +
                "(124, 'JYNX', 'FINAL', 'ICE', 'PSYCHIC', NULL, NULL, 'Kanto')," +
                "(125, 'ELECTABUZZ', 'MIDDLE', 'ELECTRIC', NULL, NULL, NULL, 'Kanto')," +
                "(126, 'MAGMAR', 'MIDDLE', 'FIRE', NULL, NULL, NULL, 'Kanto')," +
                "(127, 'PINSIR', 'SINGLE', 'BUG', NULL, NULL, NULL, 'Kanto')," +
                "(128, 'TAUROS', 'SINGLE', 'NORMAL', NULL, NULL, NULL, 'Kanto')," +
                "(129, 'MAGIKARP', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Kanto')," +
                "(130, 'GYARADOS', 'FINAL', 'WATER', 'FLYING', NULL, NULL, 'Kanto')," +
                "(131, 'LAPRAS', 'SINGLE', 'WATER', 'ICE', NULL, NULL, 'Kanto')," +
                "(132, 'DITTO', 'SINGLE', 'NORMAL', NULL, NULL, NULL, 'Kanto')," +
                "(133, 'EEVEE', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Kanto')," +
                "(134, 'VAPOREON', 'FINAL', 'WATER', NULL, NULL, 'ITEM', 'Kanto')," +
                "(135, 'JOLTEON', 'FINAL', 'ELECTRIC', NULL, NULL, 'ITEM', 'Kanto')," +
                "(136, 'FLAREON', 'FINAL', 'FIRE', NULL, NULL, 'ITEM', 'Kanto')," +
                "(137, 'PORYGON', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Kanto')," +
                "(138, 'OMANYTE', 'INITIAL', 'ROCK', 'WATER', 'FOSSIL', NULL, 'Kanto')," +
                "(139, 'OMASTAR', 'FINAL', 'ROCK', 'WATER', 'FOSSIL', NULL, 'Kanto')," +
                "(140, 'KABUTO', 'INITIAL', 'ROCK', 'WATER', 'FOSSIL', NULL, 'Kanto')," +
                "(141, 'KABUTOPS', 'FINAL', 'ROCK', 'WATER', 'FOSSIL', NULL, 'Kanto')," +
                "(142, 'AERODACTYL', 'SINGLE', 'ROCK', 'FLYING', 'FOSSIL', NULL, 'Kanto')," +
                "(143, 'SNORLAX', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Kanto')," +
                "(144, 'ARTICUNO', 'SINGLE', 'ICE', 'FLYING', 'LEGENDARY', NULL, 'Kanto')," +
                "(145, 'ZAPDOS', 'SINGLE', 'ELECTRIC', 'FLYING', 'LEGENDARY', NULL, 'Kanto')," +
                "(146, 'MOLTRES', 'SINGLE', 'FIRE', 'FLYING', 'LEGENDARY', NULL, 'Kanto')," +
                "(147, 'DRATINI', 'INITIAL', 'DRAGON', NULL, NULL, NULL, 'Kanto')," +
                "(148, 'DRAGONAIR', 'MIDDLE', 'DRAGON', NULL, NULL, NULL, 'Kanto')," +
                "(149, 'DRAGONITE', 'FINAL', 'DRAGON', 'FLYING', NULL, NULL, 'Kanto')," +
                "(150, 'MEWTWO', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL, 'Kanto')," +
                "(151, 'MEW', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL, 'Kanto'), " +
                "(152, 'CHIKORITA', 'INITIAL', 'GRASS', NULL, 'STARTER', NULL, 'Jhoto')," +
                "(153, 'BAYLEEF', 'MIDDLE', 'GRASS', 'STARTER', NULL, NULL, 'Jhoto'), " + 
                "(154, 'MEGANIUM', 'FINAL', 'GRASS', NULL, 'STARTER', NULL, 'Jhoto'), " +
                "(155, 'CYNDAQUIL', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL, 'Jhoto'), " +
                "(156, 'QUILAVA', 'MIDDLE', 'FIRE', NULL, 'STARTER', NULL, 'Jhoto')," +
                "(157, 'TYPHLOSION', 'FINAL', 'FIRE', NULL, 'STARTER', NULL, 'Jhoto')," +
                "(158, 'TOTODILE', 'INITIAL', 'WATER', NULL, 'STARTER', NULL, 'Jhoto')," +
                "(159, 'CROCONAW', 'MIDDLE', 'WATER', NULL, 'STARTER', NULL, 'Jhoto'), " +
                "(160, 'FERALIGATR', 'FINAL', 'WATER', NULL, 'STARTER', NULL, 'Jhoto')," +
                "(161, 'SENTRET', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Jhoto')," +
                "(162, 'FURRET', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Jhoto')," +
                "(163, 'HOOTHOOT', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL, 'Jhoto')," +
                "(164, 'NOCTOWL', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL, 'Jhoto')," +
                "(165, 'LEDYBA', 'INITIAL', 'BUG', 'FLYING', NULL, NULL, 'Jhoto')," +
                "(166, 'LEDIAN', 'FINAL', 'BUG', 'FLYING', NULL, NULL, 'Jhoto')," +
                "(167, 'SPINARAK', 'INITIAL', 'BUG', 'POISON', NULL, NULL, 'Jhoto')," +
                "(168, 'ARIADOS', 'FINAL', 'BUG', 'POISON', NULL, NULL, 'Jhoto')," +
                "(169, 'CROBAT', 'FINAL', 'POISON', 'FLYING', NULL, 'FRIENDSHIP', 'Jhoto')," +
                "(170, 'CHINCHOU', 'INITIAL', 'WATER', 'ELECTRIC', NULL, NULL, 'Jhoto')," +
                "(171, 'LANTURN', 'FINAL', 'WATER', 'ELECTRIC', NULL, NULL, 'Jhoto')," +
                "(172, 'PICHU', 'INITIAL', 'ELECTRIC', NULL, NULL, 'FRIENDSHIP', 'Jhoto')," +
                "(173, 'CLEFFA', 'INITIAL', 'FAIRY', NULL, NULL, 'FRIENDSHIP', 'Jhoto')," +
                "(174, 'IGGLYBUFF', 'INITIAL', 'NORMAL', 'FAIRY', NULL, 'FRIENDSHIP', 'Jhoto')," +
                "(175, 'TOGEPI', 'INITIAL', 'FAIRY', NULL, NULL, 'FRIENDSHIP', 'Jhoto')," +
                "(176, 'TOGETIC', 'MIDDLE', 'FAIRY', 'FLYING', NULL, 'ITEM', 'Jhoto')," +
                "(177, 'NATU', 'INITIAL', 'PSYCHIC', 'FLYING', NULL, NULL, 'Jhoto')," +
                "(178, 'XATU', 'FINAL', 'PSYCHIC', 'FLYING', NULL, NULL, 'Jhoto')," +
                "(179, 'MAREEP', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL, 'Jhoto')," +
                "(180, 'FLAAFFY', 'MIDDLE', 'ELECTRIC', NULL, NULL, NULL, 'Jhoto')," +
                "(181, 'AMPHAROS', 'FINAL', 'ELECTRIC', NULL, NULL, NULL, 'Jhoto')," +
                "(182, 'BELLOSSOM', 'FINAL', 'GRASS', NULL, NULL, 'ITEM', 'Jhoto')," +
                "(183, 'MARILL', 'MIDDLE', 'WATER', 'FAIRY', NULL, NULL, 'Jhoto')," +
                "(184, 'AZUMARILL', 'FINAL', 'WATER', 'FAIRY', NULL, NULL, 'Jhoto')," +
                "(185, 'SUDOWOODO', 'SINGLE', 'ROCK', NULL, NULL, NULL, 'Jhoto')," +
                "(186, 'POLITOED', 'FINAL', 'WATER', NULL, NULL, 'TRADE', 'Jhoto')," +
                "(187, 'HOPPIP', 'INITIAL', 'GRASS', 'FLYING', NULL, NULL, 'Jhoto')," +
                "(188, 'SKIPLOOM', 'MIDDLE', 'GRASS', 'FLYING', NULL, NULL, 'Jhoto')," +
                "(189, 'JUMPLUFF', 'FINAL', 'GRASS', 'FLYING', NULL, NULL, 'Jhoto')," +
                "(190, 'AIPOM', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Jhoto')," +
                "(191, 'SUNKERN', 'INITIAL', 'GRASS', NULL, NULL, NULL, 'Jhoto')," +
                "(192, 'SUNFLORA', 'FINAL', 'GRASS', NULL, NULL, 'ITEM', 'Jhoto')," +
                "(193, 'YANMA', 'INITIAL', 'BUG', 'FLYING', NULL, NULL, 'Jhoto')," +
                "(194, 'WOOPER', 'INITIAL', 'WATER', 'GROUND', NULL, NULL, 'Jhoto')," +
                "(195, 'QUAGSIRE', 'FINAL', 'WATER', 'GROUND', NULL, NULL, 'Jhoto')," +
                "(196, 'ESPEON', 'FINAL', 'PSYCHIC', NULL, NULL, 'FRIENDSHIP', 'Jhoto')," +
                "(197, 'UMBREON', 'FINAL', 'DARK', NULL, NULL, 'FRIENDSHIP', 'Jhoto')," +
                "(198, 'MURKROW', 'INITIAL', 'DARK', 'FLYING', NULL, NULL, 'Jhoto')," +
                "(199, 'SLOWKING', 'FINAL', 'WATER', 'PSYCHIC', NULL, 'TRADE', 'Jhoto')," +
                "(200, 'MISDREAVUS', 'INITIAL', 'GHOST', NULL, NULL, NULL, 'Jhoto')," +
                "(201, 'UNOWN', 'SINGLE', 'PSYCHIC', NULL, NULL, NULL, 'Jhoto')," +
                "(202, 'WOBBUFFET', 'MIDDLE', 'PSYCHIC', NULL, NULL, NULL, 'Jhoto')," +
                "(203, 'GIRAFARIG', 'INITIAL', 'NORMAL', 'PSYCHIC', NULL, NULL, 'Jhoto')," +
                "(204, 'PINECO', 'INITIAL', 'BUG', NULL, NULL, NULL, 'Jhoto')," +
                "(205, 'FORRETRESS', 'FINAL', 'BUG', 'STEEL', NULL, NULL, 'Jhoto')," +
                "(206, 'DUNSPARCE', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Jhoto')," +
                "(207, 'GLIGAR', 'INITIAL', 'GROUND', 'FLYING', NULL, NULL, 'Jhoto')," +
                "(208, 'STEELIX', 'FINAL', 'STEEL', 'GROUND', NULL, 'TRADE', 'Jhoto')," +
                "(209, 'SNUBBULL', 'INITIAL', 'FAIRY', NULL, NULL, NULL, 'Jhoto')," +
                "(210, 'GRANBULL', 'FINAL', 'FAIRY', NULL, NULL, NULL, 'Jhoto')," +
                "(211, 'QWILFISH', 'SINGLE', 'WATER', 'POISON', NULL, NULL, 'Jhoto')," +
                "(212, 'SCIZOR', 'FINAL', 'BUG', 'STEEL', NULL, 'TRADE', 'Jhoto')," +
                "(213, 'SHUCKLE', 'SINGLE', 'BUG', 'ROCK', NULL, NULL, 'Jhoto')," +
                "(214, 'HERACROSS', 'SINGLE', 'BUG', 'FIGHTING', NULL, NULL, 'Jhoto')," +
                "(215, 'SNEASEL', 'INITIAL', 'DARK', 'ICE', NULL, NULL, 'Jhoto')," +
                "(216, 'TEDDIURSA', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Jhoto')," +
                "(217, 'URSARING', 'MIDDLE', 'NORMAL', NULL, NULL, NULL, 'Jhoto')," +
                "(218, 'SLUGMA', 'INITIAL', 'FIRE', NULL, NULL, NULL, 'Jhoto')," +
                "(219, 'MAGCARGO', 'FINAL', 'FIRE', 'ROCK', NULL, NULL, 'Jhoto')," +
                "(220, 'SWINUB', 'INITIAL', 'ICE', 'GROUND', NULL, NULL, 'Jhoto')," +
                "(221, 'PILOSWINE', 'MIDDLE', 'ICE', 'GROUND', NULL, NULL, 'Jhoto')," +
                "(222, 'CORSOLA', 'SINGLE', 'WATER', 'ROCK', NULL, NULL, 'Jhoto')," +
                "(223, 'REMORAID', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Jhoto')," +
                "(224, 'OCTILLERY', 'FINAL', 'WATER', NULL, NULL, NULL, 'Jhoto')," +
                "(225, 'DELIBIRD', 'SINGLE', 'ICE', 'FLYING', NULL, NULL, 'Jhoto')," +
                "(226, 'MANTINE', 'FINAL', 'WATER', 'FLYING', NULL, NULL, 'Jhoto')," +
                "(227, 'SKARMORY', 'SINGLE', 'STEEL', 'FLYING', NULL, NULL, 'Jhoto')," +
                "(228, 'HOUNDOUR', 'INITIAL', 'DARK', 'FIRE', NULL, NULL, 'Jhoto')," +
                "(229, 'HOUNDOOM', 'FINAL', 'DARK', 'FIRE', NULL, NULL, 'Jhoto')," +
                "(230, 'KINGDRA', 'FINAL', 'WATER', 'DRAGON', NULL, 'TRADE', 'Jhoto')," +
                "(231, 'PHANPY', 'INITIAL', 'GROUND', NULL, NULL, NULL, 'Jhoto')," +
                "(232, 'DONPHAN', 'FINAL', 'GROUND', NULL, NULL, NULL, 'Jhoto')," +
                "(233, 'PORYGON2', 'MIDDLE', 'NORMAL', NULL, NULL, 'TRADE', 'Jhoto')," +
                "(234, 'STANTLER', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Jhoto')," + 
                "(235, 'SMEARGLE', 'SINGLE', 'NORMAL', NULL, NULL, NULL, 'Jhoto')," +
                "(236, 'TYROGUE', 'INITIAL', 'FIGHTING', NULL, NULL, NULL, 'Jhoto')," +
                "(237, 'HITMONTOP', 'FINAL', 'FIGHTING', NULL, NULL, NULL, 'Jhoto')," +
                "(238, 'SMOOCHUM', 'INITIAL', 'ICE', 'PSYCHIC', NULL, NULL, 'Jhoto')," +
                "(239, 'ELEKID', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL, 'Jhoto')," +
                "(240, 'MAGBY', 'INITIAL', 'FIRE', NULL, NULL, NULL, 'Jhoto')," +
                "(241, 'MILTANK', 'SINGLE', 'NORMAL', NULL, NULL, NULL, 'Jhoto')," +
                "(242, 'BLISSEY', 'FINAL', 'NORMAL', NULL, NULL, 'FRIENDSHIP', 'Jhoto')," +
                "(243, 'RAIKOU', 'SINGLE', 'ELECTRIC', NULL, 'LEGENDARY', NULL, 'Jhoto')," +
                "(244, 'ENTEI', 'SINGLE', 'FIRE', NULL, 'LEGENDARY', NULL, 'Jhoto')," +
                "(245, 'SUICUNE', 'SINGLE', 'WATER', NULL, 'LEGENDARY', NULL, 'Jhoto')," +
                "(246, 'LARVITAR', 'INITIAL', 'ROCK', 'GROUND', NULL, NULL, 'Jhoto')," +
                "(247, 'PUPITAR', 'MIDDLE', 'ROCK', 'GROUND', NULL, NULL, 'Jhoto')," +
                "(248, 'TYRANITAR', 'FINAL', 'ROCK', 'DARK', NULL, NULL, 'Jhoto')," +
                "(249, 'LUGIA', 'SINGLE', 'PSYCHIC', 'FLYING', 'LEGENDARY', NULL, 'Jhoto')," +
                "(250, 'HOOH', 'SINGLE', 'FIRE', 'FLYING', 'LEGENDARY', NULL, 'Jhoto')," +
                "(251, 'CELEBI', 'SINGLE', 'PSYCHIC', 'GRASS', 'LEGENDARY', NULL, 'Jhoto')," +
                "(252, 'TREECKO', 'INITIAL', 'GRASS', NULL, 'STARTER', NULL, 'Hoenn')," +
                "(253, 'GROVYLE', 'MIDDLE', 'GRASS', NULL, 'STARTER', NULL, 'Hoenn')," +
                "(254, 'SCEPTILE', 'FINAL', 'GRASS', NULL, 'STARTER', NULL, 'Hoenn')," +
                "(255, 'TORCHIC', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL, 'Hoenn')," +
                "(256, 'COMBUSKEN', 'MIDDLE', 'FIRE', 'FIGHTING', 'STARTER', NULL, 'Hoenn')," +
                "(257, 'BLAZIKEN', 'FINAL', 'FIRE', 'FIGHTING', 'STARTER', NULL, 'Hoenn')," +
                "(258, 'MUDKIP', 'INITIAL', 'WATER', NULL, 'STARTER', NULL, 'Hoenn')," +
                "(259, 'MARSHTOMP', 'MIDDLE', 'WATER', 'GROUND', 'STARTER', NULL, 'Hoenn')," +
                "(260, 'SWAMPERT', 'FINAL', 'WATER', 'GROUND', 'STARTER', NULL, 'Hoenn')," +
                "(261, 'POOCHYENA', 'INITIAL', 'DARK', NULL, NULL, NULL, 'Hoenn')," +
                "(262, 'MIGHTYENA', 'FINAL', 'DARK', NULL, NULL, NULL, 'Hoenn')," +
                "(263, 'ZIGZAGOON', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Hoenn')," +
                "(264, 'LINOONE', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Hoenn')," +
                "(265, 'WURMPLE', 'INITIAL', 'BUG', NULL, NULL, NULL, 'Hoenn')," +
                "(266, 'SILCOON', 'MIDDLE', 'BUG', NULL, NULL, NULL, 'Hoenn')," +
                "(267, 'BEAUTIFLY', 'FINAL', 'BUG', 'FLYING', NULL, NULL, 'Hoenn')," +
                "(268, 'CASCOON', 'MIDDLE', 'BUG', NULL, NULL, NULL, 'Hoenn')," +
                "(269, 'DUSTOX', 'FINAL', 'BUG', 'POISON', NULL, NULL, 'Hoenn')," +
                "(270, 'LOTAD', 'INITIAL', 'WATER', 'GRASS', NULL, NULL, 'Hoenn')," +
                "(271, 'LOMBRE', 'MIDDLE', 'WATER', 'GRASS', NULL, NULL, 'Hoenn')," +
                "(272, 'LUDICOLO', 'FINAL', 'WATER', 'GRASS', NULL, 'ITEM', 'Hoenn')," +
                "(273, 'SEEDOT', 'INITIAL', 'GRASS', NULL, NULL, NULL, 'Hoenn')," +
                "(274, 'NUZLEAF', 'MIDDLE', 'GRASS', 'DARK', NULL, NULL, 'Hoenn')," +
                "(275, 'SHIFTRY', 'FINAL', 'GRASS', 'DARK', NULL, 'ITEM', 'Hoenn')," +
                "(276, 'TAILLOW', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL, 'Hoenn')," +
                "(277, 'SWELLOW', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL, 'Hoenn')," +
                "(278, 'WINGULL', 'INITIAL', 'WATER', 'FLYING', NULL, NULL, 'Hoenn')," +
                "(279, 'PELIPPER', 'FINAL', 'WATER', 'FLYING', NULL, NULL, 'Hoenn')," +
                "(280, 'RALTS', 'INITIAL', 'PSYCHIC', 'FAIRY', NULL, NULL, 'Hoenn')," +
                "(281, 'KIRLIA', 'MIDDLE', 'PSYCHIC', 'FAIRY', NULL, NULL, 'Hoenn')," +
                "(282, 'GARDEVOIR', 'FINAL', 'PSYCHIC', 'FAIRY', NULL, NULL, 'Hoenn')," +
                "(283, 'SURSKIT', 'INITIAL', 'BUG', 'WATER', NULL, NULL, 'Hoenn')," +
                "(284, 'MASQUERAIN', 'FINAL', 'BUG', 'FLYING', NULL, NULL, 'Hoenn')," +
                "(285, 'SHROOMISH', 'INITIAL', 'GRASS', NULL, NULL, NULL, 'Hoenn')," +
                "(286, 'BRELOOM', 'FINAL', 'GRASS', 'FIGHTING', NULL, NULL, 'Hoenn')," +
                "(287, 'SLAKOTH', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Hoenn')," +
                "(288, 'VIGOROTH', 'MIDDLE', 'NORMAL', NULL, NULL, NULL, 'Hoenn')," +
                "(289, 'SLAKING', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Hoenn')," +
                "(290, 'NINCADA', 'INITIAL', 'BUG', 'GROUND', NULL, NULL, 'Hoenn')," +
                "(291, 'NINJASK', 'FINAL', 'BUG', 'FLYING', NULL, NULL, 'Hoenn')," +
                "(292, 'SHEDINJA', 'FINAL', 'BUG', 'GHOST', NULL, NULL, 'Hoenn')," +
                "(293, 'WHISMUR', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Hoenn')," +
                "(294, 'LOUDRED', 'MIDDLE', 'NORMAL', NULL, NULL, NULL, 'Hoenn')," +
                "(295, 'EXPLOUD', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Hoenn')," +
                "(296, 'MAKUHITA', 'INITIAL', 'FIGHTING', NULL, NULL, NULL, 'Hoenn')," +
                "(297, 'HARIYAMA', 'FINAL', 'FIGHTING', NULL, NULL, NULL, 'Hoenn')," +
                "(298, 'AZURILL', 'INITIAL', 'NORMAL', 'FAIRY', NULL, 'FRIENDSHIP', 'Hoenn')," +
                "(299, 'NOSEPASS', 'SINGLE', 'ROCK', NULL, NULL, NULL, 'Hoenn')," +
                "(300, 'SKITTY', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Hoenn')," +
                "(301, 'DELCATTY', 'FINAL', 'NORMAL', NULL, NULL, 'ITEM', 'Hoenn')," +
                "(302, 'SABLEYE', 'SINGLE', 'DARK', 'GHOST', NULL, NULL, 'Hoenn')," +
                "(303, 'MAWILE', 'SINGLE', 'STEEL', 'FAIRY', NULL, NULL, 'Hoenn')," +
                "(304, 'ARON', 'INITIAL', 'STEEL', 'ROCK', NULL, NULL, 'Hoenn')," +
                "(305, 'LAIRON', 'MIDDLE', 'STEEL', 'ROCK', NULL, NULL, 'Hoenn')," +
                "(306, 'AGGRON', 'FINAL', 'STEEL', 'ROCK', NULL, NULL, 'Hoenn')," +
                "(307, 'MEDITITE', 'INITIAL', 'FIGHTING', 'PSYCHIC', NULL, NULL, 'Hoenn')," +
                "(308, 'MEDICHAM', 'FINAL', 'FIGHTING', 'PSYCHIC', NULL, NULL, 'Hoenn')," +
                "(309, 'ELECTRIKE', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL, 'Hoenn')," +
                "(310, 'MANECTRIC', 'FINAL', 'ELECTRIC', NULL, NULL, NULL, 'Hoenn')," +
                "(311, 'PLUSLE', 'SINGLE', 'ELECTRIC', NULL, NULL, NULL, 'Hoenn')," +
                "(312, 'MINUN', 'SINGLE', 'ELECTRIC', NULL, NULL, NULL, 'Hoenn')," +
                "(313, 'VOLBEAT', 'SINGLE', 'BUG', NULL, NULL, NULL, 'Hoenn')," +
                "(314, 'ILLUMISE', 'SINGLE', 'BUG', NULL, NULL, NULL, 'Hoenn')," +
                "(315, 'ROSELIA', 'SINGLE', 'GRASS', 'POISON', NULL, NULL, 'Hoenn')," +
                "(316, 'GULPIN', 'INITIAL', 'POISON', NULL, NULL, NULL, 'Hoenn')," +
                "(317, 'SWALOT', 'FINAL', 'POISON', NULL, NULL, NULL, 'Hoenn')," +
                "(318, 'CARVANHA', 'INITIAL', 'WATER', 'DARK', NULL, NULL, 'Hoenn')," +
                "(319, 'SHARPEDO', 'FINAL', 'WATER', 'DARK', NULL, NULL, 'Hoenn')," +
                "(320, 'WAILMER', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Hoenn')," +
                "(321, 'WAILORD', 'FINAL', 'WATER', NULL, NULL, NULL, 'Hoenn')," +
                "(322, 'NUMEL', 'INITIAL', 'FIRE', 'GROUND', NULL, NULL, 'Hoenn')," +
                "(323, 'CAMERUPT', 'FINAL', 'FIRE', 'GROUND', NULL, NULL, 'Hoenn')," +
                "(324, 'TORKOAL', 'SINGLE', 'FIRE', NULL, NULL, NULL, 'Hoenn')," +
                "(325, 'SPOINK', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL, 'Hoenn')," +
                "(326, 'GRUMPIG', 'FINAL', 'PSYCHIC', NULL, NULL, NULL, 'Hoenn'), " +
                "(327, 'SPINDA', 'SINGLE', 'NORMAL', NULL, NULL, NULL, 'Hoenn')," +
                "(328, 'TRAPINCH', 'INITIAL', 'GROUND', NULL, NULL, NULL, 'Hoenn')," +
                "(329, 'VIBRAVA', 'MIDDLE', 'GROUND', 'DRAGON', NULL, NULL, 'Hoenn')," +
                "(330, 'FLYGON', 'FINAL', 'GROUND', 'DRAGON', NULL, NULL, 'Hoenn')," +
                "(331, 'CACNEA', 'INITIAL', 'GRASS', NULL, NULL, NULL, 'Hoenn')," +
                "(332, 'CACTURNE', 'FINAL', 'GRASS', 'DARK', NULL, NULL, 'Hoenn')," +
                "(333, 'SWABLU', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL, 'Hoenn')," +
                "(334, 'ALTARIA', 'FINAL', 'DRAGON', 'FLYING', NULL, NULL, 'Hoenn')," +
                "(335, 'ZANGOOSE', 'SINGLE', 'NORMAL', NULL, NULL, NULL, 'Hoenn')," +
                "(336, 'SEVIPER', 'SINGLE', 'POISON', NULL, NULL, NULL, 'Hoenn')," +
                "(337, 'LUNATONE', 'SINGLE', 'ROCK', 'PSYCHIC', NULL, NULL, 'Hoenn')," +
                "(338, 'SOLROCK', 'SINGLE', 'ROCK', 'PSYCHIC', NULL, NULL, 'Hoenn')," +
                "(339, 'BARBOACH', 'INITIAL', 'WATER', 'GROUND', NULL, NULL, 'Hoenn')," +
                "(340, 'WHISCASH', 'FINAL', 'WATER', 'GROUND', NULL, NULL, 'Hoenn')," +
                "(341, 'CORPHISH', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Hoenn')," +
                "(342, 'CRAWDAUNT', 'FINAL', 'WATER', 'DARK', NULL, NULL, 'Hoenn')," +
                "(343, 'BALTOY', 'INITIAL', 'GROUND', 'PSYCHIC', NULL, NULL, 'Hoenn')," +
                "(344, 'CLAYDOL', 'FINAL', 'GROUND', 'PSYCHIC', NULL, NULL, 'Hoenn')," +
                "(345, 'LILEEP', 'INITIAL', 'ROCK', 'GRASS', 'FOSSIL', NULL, 'Hoenn')," +
                "(346, 'CRADILY', 'FINAL', 'ROCK', 'GRASS', 'FOSSIL', NULL, 'Hoenn')," +
                "(347, 'ANORITH', 'INITIAL', 'ROCK', 'BUG', 'FOSSIL', NULL, 'Hoenn')," +
                "(348, 'ARMALDO', 'FINAL', 'ROCK', 'BUG', 'FOSSIL', NULL, 'Hoenn')," +
                "(349, 'FEEBAS', 'INITIAL', 'WATER', NULL, NULL, 'FRIENDSHIP', 'Hoenn')," +
                "(350, 'MILOTIC', 'FINAL', 'WATER', NULL, NULL, NULL, 'Hoenn')," +
                "(351, 'CASTFORM', 'SINGLE', 'NORMAL', NULL, NULL, NULL, 'Hoenn')," +
                "(352, 'KECLEON', 'SINGLE', 'NORMAL', NULL, NULL, NULL, 'Hoenn')," +
                "(353, 'SHUPPET', 'INITIAL', 'GHOST', NULL, NULL, NULL, 'Hoenn')," +
                "(354, 'BANETTE', 'FINAL', 'GHOST', NULL, NULL, NULL, 'Hoenn')," +
                "(355, 'DUSKULL', 'INITIAL', 'GHOST', NULL, NULL, NULL, 'Hoenn')," +
                "(356, 'DUSCLOPS', 'FINAL', 'GHOST', NULL, NULL, NULL, 'Hoenn')," +
                "(357, 'TROPIUS', 'SINGLE', 'GRASS', 'FLYING', NULL, NULL, 'Hoenn')," +
                "(358, 'CHIMECHO', 'SINGLE', 'PSYCHIC', NULL, NULL, NULL, 'Hoenn')," +
                "(359, 'ABSOL', 'SINGLE', 'DARK', NULL, NULL, NULL, 'Hoenn')," +
                "(360, 'WYNAUT', 'INITIAL', 'PSYCHIC', NULL, NULL, 'FRIENDSHIP', 'Hoenn')," +
                "(361, 'SNORUNT', 'INITIAL', 'ICE', NULL, NULL, NULL, 'Hoenn')," +
                "(362, 'GLALIE', 'FINAL', 'ICE', NULL, NULL, NULL, 'Hoenn')," +
                "(363, 'SPHEAL', 'INITIAL', 'ICE', 'WATER', NULL, NULL, 'Hoenn')," +
                "(364, 'SEALEO', 'MIDDLE', 'ICE', 'WATER', NULL, NULL, 'Hoenn')," +
                "(365, 'WALREIN', 'FINAL', 'ICE', 'WATER', NULL, NULL, 'Hoenn')," +
                "(366, 'CLAMPERL', 'INITIAL', 'WATER', NULL, NULL, 'ITEM', 'Hoenn')," +
                "(367, 'HUNTAIL', 'FINAL', 'WATER', NULL, NULL, 'ITEM', 'Hoenn')," +
                "(368, 'GOREBYSS', 'FINAL', 'WATER', NULL, NULL, 'ITEM', 'Hoenn')," +
                "(369, 'RELICANTH', 'SINGLE', 'WATER', 'ROCK', NULL, NULL, 'Hoenn')," +
                "(370, 'LUVDISC', 'SINGLE', 'WATER', NULL, NULL, NULL, 'Hoenn')," +
                "(371, 'BAGON', 'INITIAL', 'DRAGON', NULL, NULL, NULL, 'Hoenn')," +
                "(372, 'SHELGON', 'MIDDLE', 'DRAGON', NULL, NULL, NULL, 'Hoenn')," +
                "(373, 'SALAMENCE', 'FINAL', 'DRAGON', 'FLYING', NULL, NULL, 'Hoenn')," +
                "(374, 'BELDUM', 'INITIAL', 'STEEL', 'PSYCHIC', NULL, NULL, 'Hoenn')," +
                "(375, 'METANG', 'MIDDLE', 'STEEL', 'PSYCHIC', NULL, NULL, 'Hoenn')," +
                "(376, 'METAGROSS', 'FINAL', 'STEEL', 'PSYCHIC', NULL, NULL, 'Hoenn')," +
                "(377, 'REGIROCK', 'SINGLE', 'ROCK', NULL, 'LEGENDARY', NULL, 'Hoenn')," +
                "(378, 'REGICE', 'SINGLE', 'ICE', NULL, 'LEGENDARY', NULL, 'Hoenn')," +
                "(379, 'REGISTEEL', 'SINGLE', 'STEEL', NULL, 'LEGENDARY', NULL, 'Hoenn')," +
                "(380, 'LATIAS', 'SINGLE', 'DRAGON', 'PSYCHIC', 'LEGENDARY', NULL, 'Hoenn')," +
                "(381, 'LATIOS', 'SINGLE', 'DRAGON', 'PSYCHIC', 'LEGENDARY', NULL, 'Hoenn')," +
                "(382, 'KYOGRE', 'SINGLE', 'WATER', NULL, 'LEGENDARY', NULL, 'Hoenn')," +
                "(383, 'GROUDON', 'SINGLE', 'GROUND', NULL, 'LEGENDARY', NULL, 'Hoenn')," +
                "(384, 'RAYQUAZA', 'SINGLE', 'DRAGON', 'FLYING', 'LEGENDARY', NULL, 'Hoenn')," +
                "(385, 'JIRACHI', 'SINGLE', 'STEEL', 'PSYCHIC', 'LEGENDARY', NULL, 'Hoenn')," +
                "(386, 'DEOXYS', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL, 'Hoenn')," +
                "(387, 'TURTWIG', 'INITIAL', 'GRASS', NULL, 'STARTER', NULL, 'Sinnoh')," +
                "(388, 'GROTLE', 'MIDDLE', 'GRASS', NULL, 'STARTER', NULL, 'Sinnoh')," +
                "(389, 'TORTERRA', 'FINAL', 'GRASS', 'GROUND', 'STARTER', NULL, 'Sinnoh')," +
                "(390, 'CHIMCHAR', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL, 'Sinnoh')," +
                "(391, 'MONFERNO', 'MIDDLE', 'FIRE', 'FIGHTING', 'STARTER', NULL, 'Sinnoh')," +
                "(392, 'INFERNAPE', 'FINAL', 'FIRE', 'FIGHTING', 'STARTER', NULL, 'Sinnoh')," +
                "(393, 'PIPLUP', 'INITIAL', 'WATER', NULL, 'STARTER', NULL, 'Sinnoh')," +
                "(394, 'PRINPLUP', 'MIDDLE', 'WATER', NULL, 'STARTER', NULL, 'Sinnoh')," +
                "(395, 'EMPOLEON', 'FINAL', 'WATER', 'STEEL', 'STARTER', NULL, 'Sinnoh')," +
                "(396, 'STARLY', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL, 'Sinnoh')," +
                "(397, 'STARAVIA', 'MIDDLE', 'NORMAL', 'FLYING', NULL, NULL, 'Sinnoh')," +
                "(398, 'STARAPTOR', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL, 'Sinnoh')," +
                "(399, 'BIDOOF', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Sinnoh')," +
                "(400, 'BIBAREL', 'FINAL', 'NORMAL', 'WATER', NULL, NULL, 'Sinnoh')," +
                "(401, 'KRICKETOT', 'INITIAL', 'BUG', NULL, NULL, NULL, 'Sinnoh')," +
                "(402, 'KRICKETUNE', 'FINAL', 'BUG', NULL, NULL, NULL, 'Sinnoh')," +
                "(403, 'SHINX', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL, 'Sinnoh')," +
                "(404, 'LUXIO', 'MIDDLE', 'ELECTRIC', NULL, NULL, NULL, 'Sinnoh')," +
                "(405, 'LUXRAY', 'FINAL', 'ELECTRIC', NULL, NULL, NULL, 'Sinnoh')," +
                "(406, 'BUDEW', 'INITIAL', 'GRASS', 'POISON', NULL, 'FRIENDSHIP', 'Sinnoh')," +
                "(407, 'ROSERADE', 'FINAL', 'GRASS', 'POISON', NULL, 'ITEM', 'Sinnoh')," +
                "(408, 'CRANIDOS', 'INITIAL', 'ROCK', NULL, 'FOSSIL', NULL, 'Sinnoh')," +
                "(409, 'RAMPARDOS', 'FINAL', 'ROCK', NULL, 'FOSSIL', NULL, 'Sinnoh')," +
                "(410, 'SHIELDON', 'INITIAL', 'ROCK', 'STEEL', 'FOSSIL', NULL, 'Sinnoh')," +
                "(411, 'BASTIODON', 'FINAL', 'ROCK', 'STEEL', 'FOSSIL', NULL, 'Sinnoh')," +
                "(412, 'BURMY', 'INITIAL', 'BUG', NULL, NULL, NULL, 'Sinnoh')," +
                "(413, 'WORMADAM', 'FINAL', 'BUG', 'GRASS', NULL, NULL, 'Sinnoh')," +
                "(414, 'MOTHIM', 'FINAL', 'BUG', 'FLYING', NULL, NULL, 'Sinnoh')," +
                "(415, 'COMBEE', 'INITIAL', 'BUG', 'FLYING', NULL, NULL, 'Sinnoh')," +
                "(416, 'VESPIQUEN', 'FINAL', 'BUG', 'FLYING', NULL, NULL, 'Sinnoh')," +
                "(417, 'PACHIRISU', 'SINGLE', 'ELECTRIC', NULL, NULL, NULL, 'Sinnoh')," +
                "(418, 'BUIZEL', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Sinnoh')," +
                "(419, 'FLOATZEL', 'FINAL', 'WATER', NULL, NULL, NULL, 'Sinnoh')," +
                "(420, 'CHERUBI', 'INITIAL', 'GRASS', NULL, NULL, NULL, 'Sinnoh')," +
                "(421, 'CHERRIM', 'FINAL', 'GRASS', NULL, NULL, NULL, 'Sinnoh')," +
                "(422, 'SHELLIOS', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Sinnoh')," +
                "(423, 'GASTRODON', 'FINAL', 'WATER', 'GROUND', NULL, NULL, 'Sinnoh')," +
                "(424, 'AMBIPOM', 'FINAL', 'NORMAL', NULL, NULL, 'ITEM', 'Sinnoh')," +
                "(425, 'DRIFLOON', 'INITIAL', 'GHOST', 'FLYING', NULL, NULL, 'Sinnoh')," +
                "(426, 'DRIFBLIM', 'FINAL', 'GHOST', 'FLYING', NULL, NULL, 'Sinnoh')," +
                "(427, 'BUNEARY', 'INITIAL', 'NORMAL', NULL, NULL, 'FRIENDSHIP', 'Sinnoh')," +
                "(428, 'LOPUNNY', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Sinnoh')," +
                "(429, 'MISMAGIUS', 'FINAL', 'GHOST', NULL, NULL, 'ITEM', 'Sinnoh')," +
                "(430, 'HONCHKROW', 'FINAL', 'DARK', 'FLYING', NULL, 'ITEM', 'Sinnoh')," +
                "(431, 'GLAMEOW', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Sinnoh')," +
                "(432, 'PURUGLY', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Sinnoh')," +
                "(433, 'CHINGLING', 'INITIAL', 'PSYCHIC', NULL, NULL, 'FRIENDSHIP', 'Sinnoh')," +
                "(434, 'STUNKY', 'INITIAL', 'POISON', 'DARK', NULL, NULL, 'Sinnoh')," +
                "(435, 'SKUNTANK', 'FINAL', 'POISON', 'DARK', NULL, NULL, 'Sinnoh')," +
                "(436, 'BRONZOR', 'INITIAL', 'STEEL', 'PSYCHIC', NULL, NULL, 'Sinnoh')," +
                "(437, 'BRONZONG', 'FINAL', 'STEEL', 'PSYCHIC', NULL, NULL, 'Sinnoh')," +
                "(438, 'BONSLY', 'INITIAL', 'ROCK', NULL, NULL, 'ITEM', 'Sinnoh')," +
                "(439, 'MIME JR.', 'INITIAL', 'PSYCHIC', 'FAIRY', NULL, 'ITEM', 'Sinnoh')," +
                "(440, 'HAPPINY', 'INITIAL', 'NORMAL', NULL, NULL, 'ITEM', 'Sinnoh')," +
                "(441, 'CHATOT', 'SINGLE', 'NORMAL', 'FLYING', NULL, NULL, 'Sinnoh')," +
                "(442, 'SPIRITOMB', 'SINGLE', 'GHOST', 'DARK', NULL, NULL, 'Sinnoh')," +
                "(443, 'GIBLE', 'INITIAL', 'DRAGON', 'GROUND', NULL, NULL, 'Sinnoh')," +
                "(444, 'GABITE', 'MIDDLE', 'DRAGON', 'GROUND', NULL, NULL, 'Sinnoh')," +
                "(445, 'GARCHOMP', 'FINAL', 'DRAGON', 'GROUND', NULL, NULL, 'Sinnoh')," +
                "(446, 'MUNCHLAX', 'INITIAL', 'NORMAL', NULL, NULL, 'FRIENDSHIP', 'Sinnoh')," +
                "(447, 'RIOLU', 'INITIAL', 'FIGHTING', NULL, NULL, 'FRIENDSHIP', 'Sinnoh')," +
                "(448, 'LUCARIO', 'FINAL', 'FIGHTING', 'STEEL', NULL, NULL, 'Sinnoh')," +
                "(449, 'HIPPOPOTAS', 'INITIAL', 'GROUND', NULL, NULL, NULL, 'Sinnoh')," +
                "(450, 'HIPPOWDON', 'FINAL', 'GROUND', NULL, NULL, NULL, 'Sinnoh')," +
                "(451, 'SKORUPI', 'INITIAL', 'POISON', 'BUG', NULL, NULL, 'Sinnoh')," +
                "(452, 'DRAPION', 'FINAL', 'POISON', 'DARK', NULL, NULL, 'Sinnoh')," +
                "(453, 'CROAGUNK', 'INITIAL', 'POISON', 'FIGHTING', NULL, NULL, 'Sinnoh')," +
                "(454, 'TOXICROAK', 'FINAL', 'POISON', 'FIGHTING', NULL, NULL, 'Sinnoh')," +
                "(455, 'CARNIVINE', 'SINGLE', 'GRASS', NULL, NULL, NULL, 'Sinnoh')," +
                "(456, 'FINNEON', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Sinnoh')," +
                "(457, 'LUMINEON', 'FINAL', 'WATER', NULL, NULL, NULL, 'Sinnoh')," +
                "(458, 'MANTYKE', 'INITIAL', 'WATER', 'FLYING', NULL, 'ITEM', 'Sinnoh')," +
                "(459, 'SNOVER', 'INITIAL', 'GRASS', 'ICE', NULL, NULL, 'Sinnoh')," +
                "(460, 'ABOMASNOW', 'FINAL', 'GRASS', 'ICE', NULL, NULL, 'Sinnoh')," +
                "(461, 'WEAVILE', 'FINAL', 'DARK', 'ICE', NULL, 'ITEM', 'Sinnoh')," +
                "(462, 'MAGNEZONE', 'FINAL', 'ELECTRIC', 'STEEL', NULL, 'ITEM', 'Sinnoh')," +
                "(463, 'LICKILICKY', 'FINAL', 'NORMAL', NULL, NULL, 'ITEM', 'Sinnoh')," +
                "(464, 'RHYPERIOR', 'FINAL', 'GROUND', 'ROCK', NULL, 'ITEM', 'Sinnoh')," +
                "(465, 'TANGROWTH', 'FINAL', 'GRASS', NULL, NULL, 'ITEM', 'Sinnoh')," +
                "(466, 'ELECTIVIRE', 'FINAL', 'ELECTRIC', NULL, NULL, 'ITEM', 'Sinnoh')," +
                "(467, 'MAGMORTAR', 'FINAL', 'FIRE', NULL, NULL, 'ITEM', 'Sinnoh')," +
                "(468, 'TOGEKISS', 'FINAL', 'FAIRY', 'FLYING', NULL, 'ITEM', 'Sinnoh')," +
                "(469, 'YANMEGA', 'FINAL', 'BUG', 'FLYING', NULL, 'ITEM', 'Sinnoh')," +
                "(470, 'LEAFEON', 'FINAL', 'GRASS', NULL, NULL, 'ITEM', 'Sinnoh')," +
                "(471, 'GLACEON', 'FINAL', 'ICE', NULL, NULL, 'ITEM', 'Sinnoh')," +
                "(472, 'GLISCOR', 'FINAL', 'GROUND', 'FLYING', NULL, 'ITEM', 'Sinnoh')," +
                "(473, 'MAMOSWINE', 'FINAL', 'ICE', 'GROUND', NULL, 'ITEM', 'Sinnoh')," +
                "(474, 'PORYGON-Z', 'FINAL', 'NORMAL', NULL, NULL, 'ITEM', 'Sinnoh')," +
                "(475, 'GALLADE', 'FINAL', 'PSYCHIC', 'FIGHTING', NULL, 'ITEM', 'Sinnoh')," +
                "(476, 'PROBOPASS', 'FINAL', 'ROCK', 'STEEL', NULL, 'ITEM', 'Sinnoh')," +
                "(477, 'DUSKNOIR', 'FINAL', 'GHOST', NULL, NULL, 'ITEM', 'Sinnoh')," +
                "(478, 'FROSLASS', 'FINAL', 'ICE', 'GHOST', NULL, 'ITEM', 'Sinnoh')," +
                "(479, 'ROTOM', 'SINGLE', 'ELECTRIC', 'GHOST', NULL, NULL, 'Sinnoh')," +
                "(480, 'UXIE', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL, 'Sinnoh')," +
                "(481, 'MESPRIT', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL, 'Sinnoh')," +
                "(482, 'AZELF', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL, 'Sinnoh')," +
                "(483, 'DIALGA', 'SINGLE', 'STEEL', 'DRAGON', 'LEGENDARY', NULL, 'Sinnoh')," +
                "(484, 'PALKIA', 'SINGLE', 'WATER', 'DRAGON', 'LEGENDARY', NULL, 'Sinnoh')," +
                "(485, 'HEATRAN', 'SINGLE', 'FIRE', 'STEEL', 'LEGENDARY', NULL, 'Sinnoh')," +
                "(486, 'REGIGIGAS', 'SINGLE', 'NORMAL', NULL, 'LEGENDARY', NULL, 'Sinnoh')," +
                "(487, 'GIRATINA', 'SINGLE', 'GHOST', 'DRAGON', 'LEGENDARY', NULL, 'Sinnoh')," +
                "(488, 'CRESSELIA', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL, 'Sinnoh')," +
                "(489, 'PHIONE', 'SINGLE', 'WATER', NULL, 'LEGENDARY', NULL, 'Sinnoh')," +
                "(490, 'MANAPHY', 'SINGLE', 'WATER', NULL, 'LEGENDARY', NULL, 'Sinnoh')," +
                "(491, 'DARKRAI', 'SINGLE', 'DARK', NULL, 'LEGENDARY', NULL, 'Sinnoh')," +
                "(492, 'SHAYMIN', 'SINGLE', 'GRASS', NULL, 'LEGENDARY', NULL, 'Sinnoh')," +
                "(493, 'ARCEUS', 'SINGLE', 'NORMAL', NULL, 'LEGENDARY', NULL, 'Sinnoh')," +
                "(494, 'VICTINI', 'SINGLE', 'PSYCHIC', 'FIRE', 'LEGENDARY', NULL, 'Unova')," +
                "(495, 'SNIVY', 'INITIAL', 'GRASS', NULL, 'STARTER', NULL, 'Unova')," +
                "(496, 'SERVINE', 'MIDDLE', 'GRASS', NULL, 'STARTER', NULL, 'Unova')," +
                "(497, 'SERPERIOR', 'FINAL', 'GRASS', NULL, 'STARTER', NULL, 'Unova')," +
                "(498, 'TEPIG', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL, 'Unova')," +
                "(499, 'PIGNITE', 'MIDDLE', 'FIRE', 'FIGHTING', 'STARTER', NULL, 'Unova')," +
                "(500, 'EMBOAR', 'FINAL', 'FIRE', 'FIGHTING', 'STARTER', NULL, 'Unova')," +
                "(501, 'OSHAWOTT', 'INITIAL', 'WATER', NULL, 'STARTER', NULL, 'Unova')," +
                "(502, 'DEWOTT', 'MIDDLE', 'WATER', NULL, 'STARTER', NULL, 'Unova')," +
                "(503, 'SAMUROTT', 'FINAL', 'WATER', NULL, 'STARTER', NULL, 'Unova')," +
                "(504, 'PATRAT', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Unova')," +
                "(505, 'WATCHOG', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Unova')," +
                "(506, 'LILLIPUP', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Unova')," +
                "(507, 'HERDIER', 'MIDDLE', 'NORMAL', NULL, NULL, NULL, 'Unova')," +
                "(508, 'STOUTLAND', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Unova')," +
                "(509, 'PURRLOIN', 'INITIAL', 'DARK', NULL, NULL, NULL, 'Unova')," +
                "(510, 'LIEPARD', 'FINAL', 'DARK', NULL, NULL, NULL, 'Unova')," +
                "(511, 'PANSAGE', 'INITIAL', 'GRASS', NULL, NULL, NULL, 'Unova')," +
                "(512, 'SIMISAGE', 'FINAL', 'GRASS', NULL, NULL, 'ITEM', 'Unova')," +
                "(513, 'PANSEAR', 'INITIAL', 'FIRE', NULL, NULL, NULL, 'Unova')," +
                "(514, 'SIMISEAR', 'FINAL', 'FIRE', NULL, NULL, 'ITEM', 'Unova')," +
                "(515, 'PANPOUR', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Unova')," +
                "(516, 'SIMIPOUR', 'FINAL', 'WATER', NULL, NULL, 'ITEM', 'Unova')," +
                "(517, 'MUNNA', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL, 'Unova')," +
                "(518, 'MUSHARNA', 'FINAL', 'PSYCHIC', NULL, NULL, 'ITEM', 'Unova')," +
                "(519, 'PIDOVE', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL, 'Unova')," +
                "(520, 'TRANQUILL', 'MIDDLE', 'NORMAL', 'FLYING', NULL, NULL, 'Unova')," +
                "(521, 'UNFEZANT', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL, 'Unova')," +
                "(522, 'BLITZLE', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL, 'Unova')," +
                "(523, 'ZEBSTRIKA', 'FINAL', 'ELECTRIC', NULL, NULL, NULL, 'Unova')," +
                "(524, 'ROGGENROLA', 'INITIAL', 'ROCK', NULL, NULL, NULL, 'Unova')," +
                "(525, 'BOLDORE', 'MIDDLE', 'ROCK', NULL, NULL, NULL, 'Unova')," +
                "(526, 'GIGALITH', 'FINAL', 'ROCK', NULL, NULL, 'TRADE', 'Unova')," +
                "(527, 'WOOBAT', 'INITIAL', 'PSYCHIC', 'FLYING', NULL, NULL, 'Unova')," +
                "(528, 'SWOOBAT', 'FINAL', 'PSYCHIC', 'FLYING', NULL, 'FRIENDSHIP', 'Unova')," +
                "(529, 'DRILBUR', 'INITIAL', 'GROUND', NULL, NULL, NULL, 'Unova')," +
                "(530, 'EXCADRILL', 'FINAL', 'GROUND', 'STEEL', NULL, NULL, 'Unova')," +
                "(531, 'AUDINO', 'SINGLE', 'NORMAL', NULL, NULL, NULL, 'Unova')," +
                "(532, 'TIMBURR', 'INITIAL', 'FIGHTING', NULL, NULL, NULL, 'Unova')," +
                "(533, 'GURDURR', 'MIDDLE', 'FIGHTING', NULL, NULL, 'TRADE', 'Unova')," +
                "(534, 'CONKELDURR', 'FINAL', 'FIGHTING', NULL, NULL, NULL, 'Unova')," +
                "(535, 'TYMPOLE', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Unova')," +
                "(536, 'PALPITOAD', 'MIDDLE', 'WATER', 'GROUND', NULL, NULL, 'Unova')," +
                "(537, 'SEISMITOAD', 'FINAL', 'WATER', 'GROUND', NULL, NULL, 'Unova')," +
                "(538, 'THROH', 'SINGLE', 'FIGHTING', NULL, NULL, NULL, 'Unova')," +
                "(539, 'SAWK', 'SINGLE', 'FIGHTING', NULL, NULL, NULL, 'Unova')," +
                "(540, 'SEWADDLE', 'INITIAL', 'BUG', 'GRASS', NULL, NULL, 'Unova')," +
                "(541, 'SWADLOON', 'MIDDLE', 'BUG', 'GRASS', NULL, NULL, 'Unova')," +
                "(542, 'LEAVANNY', 'FINAL', 'BUG', 'GRASS', NULL, 'FRIENDSHIP', 'Unova')," +
                "(543, 'VENIPEDE', 'INITIAL', 'BUG', 'POISON', NULL, NULL, 'Unova')," +
                "(544, 'WHIRLIPEDE', 'MIDDLE', 'BUG', 'POISON', NULL, NULL, 'Unova')," +
                "(545, 'SCOLIPEDE', 'FINAL', 'BUG', 'POISON', NULL, NULL, 'Unova')," +
                "(546, 'COTTONEE', 'INITIAL', 'GRASS', 'FAIRY', NULL, NULL, 'Unova')," +
                "(547, 'WHIMSICOTT', 'FINAL', 'GRASS', 'FAIRY', NULL, 'ITEM', 'Unova')," +
                "(548, 'PETILIL', 'INITIAL', 'GRASS', NULL, NULL, NULL, 'Unova')," +
                "(549, 'LILLIGANT', 'FINAL', 'GRASS', NULL, NULL, 'ITEM', 'Unova')," +
                "(550, 'BASCULIN', 'SINGLE', 'WATER', NULL, NULL, NULL, 'Unova')," +
                "(551, 'SANDILE', 'INITIAL', 'GROUND', 'DARK', NULL, NULL, 'Unova')," +
                "(552, 'KROKOROK', 'MIDDLE', 'GROUND', 'DARK', NULL, NULL, 'Unova')," +
                "(553, 'KROOKODILE', 'FINAL', 'GROUND', 'DARK', NULL, NULL, 'Unova')," +
                "(554, 'DARUMAKA', 'INITIAL', 'FIRE', NULL, NULL, NULL, 'Unova')," +
                "(555, 'DARMANITAN', 'FINAL', 'FIRE', NULL, NULL, NULL, 'Unova')," +
                "(556, 'MARACTUS', 'SINGLE', 'GRASS', NULL, NULL, NULL, 'Unova')," +
                "(557, 'DWEBBLE', 'INITIAL', 'BUG', 'ROCK', NULL, NULL, 'Unova')," +
                "(558, 'CRUSTLE', 'FINAL', 'BUG', 'ROCK', NULL, NULL, 'Unova')," +
                "(559, 'SCRAGGY', 'INITIAL', 'DARK', 'FIGHTING', NULL, NULL, 'Unova')," +
                "(560, 'SCRAFTY', 'FINAL', 'DARK', 'FIGHTING', NULL, NULL, 'Unova')," +
                "(561, 'SIGILYPH', 'SINGLE', 'PSYCHIC', 'FLYING', NULL, NULL, 'Unova')," +
                "(562, 'YAMASK', 'INITIAL', 'GHOST', NULL, NULL, NULL, 'Unova')," +
                "(563, 'COFAGRIGUS', 'FINAL', 'GHOST', NULL, NULL, NULL, 'Unova')," +
                "(564, 'TIRTOUGA', 'INITIAL', 'WATER', 'ROCK', 'FOSSIL', NULL, 'Unova')," +
                "(565, 'CARRACOSTA', 'FINAL', 'WATER', 'ROCK', 'FOSSIL', NULL, 'Unova')," +
                "(566, 'ARCHEN', 'INITIAL', 'ROCK', 'FLYING', 'FOSSIL', NULL, 'Unova')," +
                "(567, 'ARCHEOPS', 'FINAL', 'ROCK', 'FLYING', 'FOSSIL', NULL, 'Unova')," +
                "(568, 'TRUBBISH', 'INITIAL', 'POISON', NULL, NULL, NULL, 'Unova')," +
                "(569, 'GARBODOR', 'FINAL', 'POISON', NULL, NULL, NULL, 'Unova')," + 
                "(570, 'ZORUA', 'INITIAL', 'DARK', NULL, NULL, NULL, 'Unova')," +
                "(571, 'ZOROARK', 'FINAL', 'DARK', NULL, NULL, NULL, 'Unova')," +
                "(572, 'MINCCINO', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Unova')," +
                "(573, 'CINCCINO', 'FINAL', 'NORMAL', NULL, NULL, 'ITEM', 'Unova')," +
                "(574, 'GOTHITA', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL, 'Unova')," +
                "(575, 'GOTHORITA', 'MIDDLE', 'PSYCHIC', NULL, NULL, NULL, 'Unova')," +
                "(576, 'GOTHITELLE', 'FINAL', 'PSYCHIC', NULL, NULL, NULL, 'Unova')," +
                "(577, 'SOLOSIS', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL, 'Unova')," +
                "(578, 'DUOSION', 'MIDDLE', 'PSYCHIC', NULL, NULL, NULL, 'Unova')," +
                "(579, 'REUNICLUS', 'FINAL', 'PSYCHIC', NULL, NULL, NULL, 'Unova')," +
                "(580, 'DUCKLETT', 'INITIAL', 'WATER', 'FLYING', NULL, NULL, 'Unova')," +
                "(581, 'SWANNA', 'FINAL', 'WATER', 'FLYING', NULL, NULL, 'Unova')," +
                "(582, 'VANILLITE', 'INITIAL', 'ICE', NULL, NULL, NULL, 'Unova')," +
                "(583, 'VANILLISH', 'MIDDLE', 'ICE', NULL, NULL, NULL, 'Unova')," +
                "(584, 'VANILLUXE', 'FINAL', 'ICE', NULL, NULL, NULL, 'Unova')," +
                "(585, 'DEERLING', 'INITIAL', 'NORMAL', 'GRASS', NULL, NULL, 'Unova')," +
                "(586, 'SAWSBUCK', 'FINAL', 'NORMAL', 'GRASS', NULL, NULL, 'Unova')," +
                "(587, 'EMOLGA', 'SINGLE', 'ELECTRIC', 'FLYING', NULL, NULL, 'Unova')," +
                "(588, 'KARRABLAST', 'INITIAL', 'BUG', NULL, NULL, NULL, 'Unova')," +
                "(589, 'ESCAVALIER', 'FINAL', 'BUG', 'STEEL', NULL, 'TRADE', 'Unova')," +
                "(590, 'FOONGUS', 'INITIAL', 'GRASS', 'POISON', NULL, NULL, 'Unova')," +
                "(591, 'AMOONGUSS', 'FINAL', 'GRASS', 'POISON', NULL, NULL, 'Unova')," +
                "(592, 'FRILLISH', 'INITIAL', 'WATER', 'GHOST', NULL, NULL, 'Unova')," +
                "(593, 'JELLICENT', 'FINAL', 'WATER', 'GHOST', NULL, NULL, 'Unova')," +
                "(594, 'ALOMOMOLA', 'SINGLE', 'WATER', NULL, NULL, NULL, 'Unova')," +
                "(595, 'JOLTIK', 'INITIAL', 'BUG', 'ELECTRIC', NULL, NULL, 'Unova')," +
                "(596, 'GALVANTULA', 'FINAL', 'BUG', 'ELECTRIC', NULL, NULL, 'Unova')," +
                "(597, 'FERROSEED', 'INITIAL', 'GRASS', 'STEEL', NULL, NULL, 'Unova')," +
                "(598, 'FERROTHORN', 'FINAL', 'GRASS', 'STEEL', NULL, NULL, 'Unova')," +
                "(599, 'KLINK', 'INITIAL', 'STEEL', NULL, NULL, NULL, 'Unova')," +
                "(600, 'KLANG', 'MIDDLE', 'STEEL', NULL, NULL, NULL, 'Unova')," +
                "(601, 'KLINKLANG', 'FINAL', 'STEEL', NULL, NULL, NULL, 'Unova')," +
                "(602, 'TYNAMO', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL, 'Unova')," +
                "(603, 'EELEKTRIK', 'MIDDLE', 'ELECTRIC', NULL, NULL, NULL, 'Unova')," +
                "(604, 'EELEKTROSS', 'FINAL', 'ELECTRIC', NULL, NULL, 'ITEM', 'Unova')," +
                "(605, 'ELGYEM', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL, 'Unova')," +
                "(606, 'BEHEEYEM', 'FINAL', 'PSYCHIC', NULL, NULL, NULL, 'Unova')," +
                "(607, 'LITWICK', 'INITIAL', 'GHOST', 'FIRE', NULL, NULL, 'Unova')," +
                "(608, 'LAMPENT', 'MIDDLE', 'GHOST', 'FIRE', NULL, NULL, 'Unova')," +
                "(609, 'CHANDELURE', 'FINAL', 'GHOST', 'FIRE', NULL, 'ITEM', 'Unova')," +
                "(610, 'AXEW', 'INITIAL', 'DRAGON', NULL, NULL, NULL, 'Unova')," +
                "(611, 'FRAXURE', 'MIDDLE', 'DRAGON', NULL, NULL, NULL, 'Unova')," +
                "(612, 'HAXORUS', 'FINAL', 'DRAGON', NULL, NULL, NULL, 'Unova')," +
                "(613, 'CUBCHOO', 'INITIAL', 'ICE', NULL, NULL, NULL, 'Unova')," +
                "(614, 'BEARTIC', 'FINAL', 'ICE', NULL, NULL, NULL, 'Unova')," +
                "(615, 'CRYOGONAL', 'SINGLE', 'ICE', NULL, NULL, NULL, 'Unova')," +
                "(616, 'SHELMET', 'INITIAL', 'BUG', NULL, NULL, NULL, 'Unova')," +
                "(617, 'ACCELGOR', 'FINAL', 'BUG', NULL, NULL, 'TRADE', 'Unova')," +
                "(618, 'STUNFISK', 'SINGLE', 'GROUND', 'ELECTRIC', NULL, NULL, 'Unova')," +
                "(619, 'MIENFOO', 'INITIAL', 'FIGHTING', NULL, NULL, NULL, 'Unova')," +
                "(620, 'MIENSHAO', 'FINAL', 'FIGHTING', NULL, NULL, NULL, 'Unova')," +
                "(621, 'DRUDDIGON', 'SINGLE', 'DRAGON', NULL, NULL, NULL, 'Unova')," +
                "(622, 'GOLETT', 'INITIAL', 'GROUND', 'GHOST', NULL, NULL, 'Unova')," +
                "(623, 'GOLURK', 'FINAL', 'GROUND', 'GHOST', NULL, NULL, 'Unova')," +
                "(624, 'PAWNIARD', 'INITIAL', 'DARK', 'STEEL', NULL, NULL, 'Unova')," +
                "(625, 'BISHARP', 'FINAL', 'DARK', 'STEEL', NULL, NULL, 'Unova')," +
                "(626, 'BOUFFALANT', 'SINGLE', 'NORMAL', NULL, NULL, NULL, 'Unova')," +
                "(627, 'RUFFLET', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL, 'Unova')," +
                "(628, 'BRAVIARY', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL, 'Unova')," +
                "(629, 'VULLABY', 'INITIAL', 'DARK', 'FLYING', NULL, NULL, 'Unova')," +
                "(630, 'MANDIBUZZ', 'FINAL', 'DARK', 'FLYING', NULL, NULL, 'Unova')," +
                "(631, 'HEATMOR', 'SINGLE', 'FIRE', NULL, NULL, NULL, 'Unova')," +
                "(632, 'DURANT', 'SINGLE', 'BUG', 'STEEL', NULL, NULL, 'Unova')," +
                "(633, 'DEINO', 'INITIAL', 'DARK', 'DRAGON', NULL, NULL, 'Unova')," +
                "(634, 'ZWEILOUS', 'MIDDLE', 'DARK', 'DRAGON', NULL, NULL, 'Unova')," +
                "(635, 'HYDREIGON', 'FINAL', 'DARK', 'DRAGON', NULL, NULL, 'Unova')," +
                "(636, 'LARVESTA', 'INITIAL', 'BUG', 'FIRE', NULL, NULL, 'Unova')," +
                "(637, 'VOLCARONA', 'FINAL', 'BUG', 'FIRE', NULL, NULL, 'Unova')," +
                "(638, 'COBALION', 'SINGLE', 'STEEL', 'FIGHTING', 'LEGENDARY', NULL, 'Unova')," +
                "(639, 'TERRAKION', 'SINGLE', 'ROCK', 'FIGHTING', 'LEGENDARY', NULL, 'Unova')," +
                "(640, 'VIRIZION', 'SINGLE', 'GRASS', 'FIGHTING', 'LEGENDARY', NULL, 'Unova')," +
                "(641, 'TORNADUS', 'SINGLE', 'FLYING', NULL, 'LEGENDARY', NULL, 'Unova')," +
                "(642, 'THUNDURUS', 'SINGLE', 'ELECTRIC', 'FLYING', 'LEGENDARY', NULL, 'Unova')," +
                "(643, 'RESHIRAM', 'SINGLE', 'DRAGON', 'FIRE', 'LEGENDARY', NULL, 'Unova')," +
                "(644, 'ZEKROM', 'SINGLE', 'DRAGON', 'ELECTRIC', 'LEGENDARY', NULL, 'Unova')," +
                "(645, 'LANDORUS', 'SINGLE', 'GROUND', 'FLYING', 'LEGENDARY', NULL, 'Unova')," +
                "(646, 'KYUREM', 'SINGLE', 'DRAGON', 'ICE', 'LEGENDARY', NULL, 'Unova')," +
                "(647, 'KELDEO', 'SINGLE', 'WATER', 'FIGHTING', 'LEGENDARY', NULL, 'Unova')," +
                "(648, 'MELOETTA', 'SINGLE', 'NORMAL', 'PSYCHIC', 'LEGENDARY', NULL, 'Unova')," +
                "(649, 'GENESECT', 'SINGLE', 'BUG', 'STEEL', 'LEGENDARY', NULL, 'Unova')," +
                "(650, 'CHESPIN', 'INITIAL', 'GRASS', NULL, 'STARTER', NULL, 'Kalos')," +
                "(651, 'QUILLADIN', 'MIDDLE', 'GRASS', NULL, 'STARTER', NULL, 'Kalos')," +
                "(652, 'CHESNAUGHT', 'FINAL', 'GRASS', 'FIGHTING', 'STARTER', NULL, 'Kalos')," +
                "(653, 'FENNEKIN', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL, 'Kalos')," +
                "(654, 'BRAIXEN', 'MIDDLE', 'FIRE', NULL, 'STARTER', NULL, 'Kalos')," +
                "(655, 'DELPHOX', 'FINAL', 'FIRE', 'PSYCHIC', 'STARTER', NULL, 'Kalos')," +
                "(656, 'FROAKIE', 'INITIAL', 'WATER', NULL, 'STARTER', NULL, 'Kalos')," +
                "(657, 'FROGADIER', 'MIDDLE', 'WATER', NULL, 'STARTER', NULL, 'Kalos')," +
                "(658, 'GRENINJA', 'FINAL', 'WATER', 'DARK', 'STARTER', NULL, 'Kalos')," +
                "(659, 'BUNNELBY', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Kalos')," +
                "(660, 'DIGGERSBY', 'FINAL', 'NORMAL', 'GROUND', NULL, NULL, 'Kalos')," +
                "(661, 'FLETCHLING', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL, 'Kalos')," +
                "(662, 'FLETCHINDER', 'MIDDLE', 'FIRE', 'FLYING', NULL, NULL, 'Kalos')," +
                "(663, 'TALONFLAME', 'FINAL', 'FIRE', 'FLYING', NULL, NULL, 'Kalos')," +
                "(664, 'SCATTERBUG', 'INITIAL', 'BUG', NULL, NULL, NULL, 'Kalos')," +
                "(665, 'SPEWPA', 'MIDDLE', 'BUG', NULL, NULL, NULL, 'Kalos')," +
                "(666, 'VIVILLON', 'FINAL', 'BUG', 'FLYING', NULL, NULL, 'Kalos')," +
                "(667, 'LITLEO', 'INITIAL', 'FIRE', 'NORMAL', NULL, NULL, 'Kalos')," +
                "(668, 'PYROAR', 'FINAL', 'FIRE', 'NORMAL', NULL, NULL, 'Kalos'),"  +
                "(669, 'FLABEBE', 'INITIAL', 'FAIRY', NULL, NULL, NULL, 'Kalos')," +
                "(670, 'FLOETTE', 'MIDDLE', 'FAIRY', NULL, NULL, NULL, 'Kalos')," +
                "(671, 'FLORGES', 'FINAL', 'FAIRY', NULL, NULL, NULL, 'Kalos')," +
                "(672, 'SKIDDO', 'INITIAL', 'GRASS', NULL, NULL, NULL, 'Kalos')," +
                "(673, 'GOGOAT', 'FINAL', 'GRASS', NULL, NULL, NULL, 'Kalos')," +
                "(674, 'PANCHAM', 'INITIAL', 'FIGHTING', NULL, NULL, NULL, 'Kalos')," +
                "(675, 'PANGORO', 'FINAL', 'FIGHTING', 'DARK', NULL, NULL, 'Kalos')," +
                "(676, 'FURFROU', 'SINGLE', 'NORMAL', NULL, NULL, NULL, 'Kalos')," +
                "(677, 'ESPURR', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL, 'Kalos')," +
                "(678, 'MEOWSTIC', 'FINAL', 'PSYCHIC', NULL, NULL, NULL, 'Kalos')," +
                "(679, 'HONEDGE', 'INITIAL', 'STEEL', 'GHOST', NULL, NULL, 'Kalos')," +
                "(680, 'DOUBLADE', 'MIDDLE', 'STEEL', 'GHOST', NULL, NULL, 'Kalos')," +
                "(681, 'AEGISLASH', 'FINAL', 'STEEL', 'GHOST', NULL, 'ITEM', 'Kalos')," +
                "(682, 'SPRITZEE', 'INITIAL', 'FAIRY', NULL, NULL, NULL, 'Kalos')," +
                "(683, 'AROMATISSE', 'FINAL', 'FAIRY', NULL, NULL, 'TRADE', 'Kalos')," +
                "(684, 'SWIRLIX', 'INITIAL', 'FAIRY', NULL, NULL, NULL, 'Kalos')," +
                "(685, 'SLURPUFF', 'FINAL', 'FAIRY', NULL, NULL, 'TRADE', 'Kalos')," +
                "(686, 'INKAY', 'INITIAL', 'DARK', 'PSYCHIC', NULL, NULL, 'Kalos')," +
                "(687, 'MALAMAR', 'FINAL', 'DARK', 'PSYCHIC', NULL, NULL, 'Kalos')," +
                "(688, 'BINACLE', 'INITIAL', 'ROCK', 'WATER', NULL, NULL, 'Kalos')," +
                "(689, 'BARBARACLE', 'FINAL', 'ROCK', 'WATER', NULL, NULL, 'Kalos')," +
                "(690, 'SKRELP', 'INITIAL', 'POISON', 'WATER', NULL, NULL, 'Kalos')," +
                "(691, 'DRAGALGE', 'FINAL', 'POISON', 'DRAGON', NULL, NULL, 'Kalos')," +
                "(692, 'CLAUNCHER', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Kalos')," +
                "(693, 'CLAWITZER', 'FINAL', 'WATER', NULL, NULL, NULL, 'Kalos')," +
                "(694, 'HELIOPTILE', 'INITIAL', 'ELECTRIC', 'NORMAL', NULL, NULL, 'Kalos')," +
                "(695, 'HELIOLISK', 'FINAL', 'ELECTRIC', 'NORMAL', NULL, 'ITEM', 'Kalos')," +
                "(696, 'TYRUNT', 'INITIAL', 'ROCK', 'DRAGON', 'FOSSIL', NULL, 'Kalos')," +
                "(697, 'TYRANTRUM', 'FINAL', 'ROCK', 'DRAGON', NULL, NULL, 'Kalos')," +
                "(698, 'AMAURA', 'INITIAL', 'ROCK', 'ICE', 'FOSSIL', NULL, 'Kalos')," +
                "(699, 'AURORUS', 'FINAL', 'ROCK', 'ICE', NULL, NULL, 'Kalos')," +
                "(700, 'SYLVEON', 'FINAL', 'FAIRY', NULL, NULL, 'FRIENDSHIP', 'Kalos')," +
                "(701, 'HAWLUCHA', 'SINGLE', 'FIGHTING', 'FLYING', NULL, NULL, 'Kalos')," +
                "(702, 'DEDENNE', 'SINGLE', 'ELECTRIC', 'FAIRY', NULL, NULL, 'Kalos')," +
                "(703, 'CARBINK', 'SINGLE', 'ROCK', 'FAIRY', NULL, NULL, 'Kalos')," +
                "(704, 'GOOMY', 'INITIAL', 'DRAGON', NULL, NULL, NULL, 'Kalos')," +
                "(705, 'SLIGGOO', 'MIDDLE', 'DRAGON', NULL, NULL, NULL, 'Kalos')," +
                "(706, 'GOODRA', 'FINAL', 'DRAGON', NULL, NULL, NULL, 'Kalos')," +
                "(707, 'KLEFKI', 'SINGLE', 'STEEL', 'FAIRY', NULL, NULL, 'Kalos')," +
                "(708, 'PHANTUMP', 'INITIAL', 'GHOST', 'GRASS', NULL, 'TRADE', 'Kalos')," +
                "(709, 'TREVENANT', 'FINAL', 'GHOST', 'GRASS', NULL, NULL, 'Kalos')," +
                "(710, 'PUMPKABOO', 'INITIAL', 'GHOST', 'GRASS', NULL, NULL, 'Kalos')," +
                "(711, 'GOURGEIST', 'FINAL', 'GHOST', 'GRASS', NULL, NULL, 'Kalos')," +
                "(712, 'BERGMITE', 'INITIAL', 'ICE', NULL, NULL, NULL, 'Kalos')," +
                "(713, 'AVALUGG', 'FINAL', 'ICE', NULL, NULL, NULL, 'Kalos')," +
                "(714, 'NOIBAT', 'INITIAL', 'FLYING', 'DRAGON', NULL, NULL, 'Kalos')," +
                "(715, 'NOIVERN', 'FINAL', 'FLYING', 'DRAGON', NULL, NULL, 'Kalos')," +
                "(716, 'XERNEAS', 'SINGLE', 'FAIRY', NULL, 'LEGENDARY', NULL, 'Kalos')," +
                "(717, 'YVELTAL', 'SINGLE', 'DARK', 'FLYING', 'LEGENDARY', NULL, 'Kalos')," +
                "(718, 'ZYGARDE', 'SINGLE', 'DRAGON', 'GROUND', 'LEGENDARY', NULL, 'Kalos')," +
                "(719, 'DIANCIE', 'SINGLE', 'ROCK', 'FAIRY', 'LEGENDARY', NULL, 'Kalos')," +
                "(720, 'HOOPA', 'SINGLE', 'PSYCHIC', 'GHOST', 'LEGENDARY', NULL, 'Kalos')," +
                "(721, 'VOLCANION', 'SINGLE', 'FIRE', 'WATER', 'LEGENDARY', NULL, 'Kalos')," +
                "(722, 'ROWLET', 'INITIAL', 'GRASS', 'FLYING', 'STARTER', NULL, 'Alola')," +
                "(723, 'DARTRIX', 'MIDDLE', 'GRASS', 'FLYING', NULL, NULL, 'Alola')," +
                "(724, 'DECIDUEYE', 'FINAL', 'GRASS', 'GHOST', NULL, NULL, 'Alola')," +
                "(725, 'LITTEN', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL, 'Alola')," +
                "(726, 'TORRACAT', 'MIDDLE', 'FIRE', NULL, NULL, NULL, 'Alola')," +
                "(727, 'INCINEROAR', 'FINAL', 'FIRE', 'DARK', NULL, NULL, 'Alola')," +
                "(728, 'POPPLIO', 'INITIAL', 'WATER', NULL, 'STARTER', NULL, 'Alola')," +
                "(729, 'BRIONNE', 'MIDDLE', 'WATER', NULL, NULL, NULL, 'Alola')," +
                "(730, 'PRIMARINA', 'FINAL', 'WATER', 'FAIRY', NULL, NULL, 'Alola')," +
                "(731, 'PIKIPEK', 'INITIAL', 'NORMAL', 'FLYING', NULL, NULL, 'Alola')," +
                "(732, 'TRUMBEAK', 'MIDDLE', 'NORMAL', 'FLYING', NULL, NULL, 'Alola')," +
                "(733, 'TOUCANNON', 'FINAL', 'NORMAL', 'FLYING', NULL, NULL, 'Alola')," +
                "(734, 'YUNGOOS', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Alola')," +
                "(735, 'GUMSHOOS', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Alola')," +
                "(736, 'GRUBBIN', 'INITIAL', 'BUG', NULL, NULL, NULL, 'Alola')," +
                "(737, 'CHARJABUG', 'MIDDLE', 'BUG', 'ELECTRIC', NULL, NULL, 'Alola')," +
                "(738, 'VIKAVOLT', 'FINAL', 'BUG', 'ELECTRIC', NULL, 'ITEM', 'Alola')," +
                "(739, 'CRABRAWLER', 'INITIAL', 'FIGHTING', NULL, NULL, NULL, 'Alola')," +
                "(740, 'CRABOMINABLE', 'FINAL', 'FIGHTING', 'ICE', NULL, 'ITEM', 'Alola')," +
                "(741, 'ORICORIO', 'SINGLE', 'FIRE', 'FLYING', NULL, NULL, 'Alola')," +
                "(742, 'CUTIEFLY', 'INITIAL', 'BUG', 'FAIRY', NULL, NULL, 'Alola')," +
                "(743, 'RIBOMBEE', 'FINAL', 'BUG', 'FAIRY', NULL, NULL, 'Alola')," +
                "(744, 'ROCKRUFF', 'INITIAL', 'ROCK', NULL, NULL, NULL, 'Alola')," +
                "(745, 'LYCANROC', 'FINAL', 'ROCK', NULL, NULL, NULL, 'Alola')," +
                "(746, 'WISHIWASHI', 'SINGLE', 'WATER', NULL, NULL, NULL, 'Alola')," +
                "(747, 'MAREANIE', 'INITIAL', 'POISON', 'WATER', NULL, NULL, 'Alola')," +
                "(748, 'TOXAPEX', 'FINAL', 'POISON', 'WATER', NULL, NULL, 'Alola')," +
                "(749, 'MUDBRAY', 'INITIAL', 'GROUND', NULL, NULL, NULL, 'Alola')," +
                "(750, 'MUDSDALE', 'FINAL', 'GROUND', NULL, NULL, NULL, 'Alola')," +
                "(751, 'DEWPIDER', 'INITIAL', 'WATER', 'BUG', NULL, NULL, 'Alola')," +
                "(752, 'ARAQUANID', 'FINAL', 'WATER', 'BUG', NULL, NULL, 'Alola')," +
                "(753, 'FOMANTIS', 'INITIAL', 'GRASS', NULL, NULL, NULL, 'Alola')," +
                "(754, 'LURANTIS', 'FINAL', 'GRASS', NULL, NULL, NULL, 'Alola')," +
                "(755, 'MORELULL', 'INITIAL', 'GRASS', 'FAIRY', NULL, NULL, 'Alola')," +
                "(756, 'SHIINOTIC', 'FINAL', 'GRASS', 'FAIRY', NULL, NULL, 'Alola')," +
                "(757, 'SALANDIT', 'INITIAL', 'POISON', 'FIRE', NULL, NULL, 'Alola')," +
                "(758, 'SALAZZLE', 'FINAL', 'POISON', 'FIRE', NULL, NULL, 'Alola')," +
                "(759, 'STUFFUL', 'INITIAL', 'NORMAL', 'FIGHTING', NULL, NULL, 'Alola')," +
                "(760, 'BEWEAR', 'FINAL', 'NORMAL', 'FIGHTING', NULL, NULL, 'Alola')," +
                "(761, 'BOUNSWEET', 'INITIAL', 'GRASS', NULL, NULL, NULL, 'Alola')," +
                "(762, 'STEENEE', 'MIDDLE', 'GRASS', NULL, NULL, NULL, 'Alola')," +
                "(763, 'TSAREENA', 'FINAL', 'GRASS', NULL, NULL, NULL, 'Alola')," +
                "(764, 'COMFEY', 'SINGLE', 'FAIRY', NULL, NULL, NULL, 'Alola')," +
                "(765, 'ORANGURU', 'SINGLE', 'NORMAL', 'PSYCHIC', NULL, NULL, 'Alola')," +
                "(766, 'PASSIMIAN', 'SINGLE', 'FIGHTING', NULL, NULL, NULL, 'Alola')," +
                "(767, 'WIMPOD', 'INITIAL', 'BUG', 'WATER', NULL, NULL, 'Alola')," +
                "(768, 'GOLISOPOD', 'FINAL', 'BUG', 'WATER', NULL, NULL, 'Alola')," +
                "(769, 'SANDYGAST', 'INITIAL', 'GHOST', 'GROUND', NULL, NULL, 'Alola')," +
                "(770, 'PALOSSAND', 'FINAL', 'GHOST', 'GROUND', NULL, NULL, 'Alola')," +
                "(771, 'PYUKUMUKU', 'SINGLE', 'WATER', NULL, NULL, NULL, 'Alola')," +
                "(772, 'TYPE: NULL', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Alola')," +
                "(773, 'SILVALLY', 'FINAL', 'NORMAL', NULL, NULL, 'ITEM', 'Alola')," +
                "(774, 'MINIOR', 'SINGLE', 'ROCK', 'FLYING', NULL, NULL, 'Alola')," +
                "(775, 'KOMALA', 'SINGLE', 'NORMAL', NULL, NULL, NULL, 'Alola')," +
                "(776, 'TURTONATOR', 'SINGLE', 'FIRE', 'DRAGON', NULL, NULL, 'Alola')," +
                "(777, 'TOGEDEMARU', 'SINGLE', 'ELECTRIC', 'STEEL', NULL, NULL, 'Alola')," +
                "(778, 'MIMIKYU', 'SINGLE', 'GHOST', 'FAIRY', NULL, NULL, 'Alola')," +
                "(779, 'BRUXISH', 'SINGLE', 'WATER', 'PSYCHIC', NULL, NULL, 'Alola')," +
                "(780, 'DRAMPA', 'SINGLE', 'NORMAL', 'DRAGON', NULL, NULL, 'Alola')," +
                "(781, 'DHELMISE', 'SINGLE', 'GHOST', 'GRASS', NULL, NULL, 'Alola')," +
                "(782, 'JANGMO-O', 'INITIAL', 'DRAGON', NULL, NULL, NULL, 'Alola')," +
                "(783, 'HAKAMO-O', 'MIDDLE', 'DRAGON', 'FIGHTING', NULL, NULL, 'Alola')," +
                "(784, 'KOMMO-O', 'FINAL', 'DRAGON', 'FIGHTING', NULL, NULL, 'Alola')," +
                "(785, 'TAPU KOKO', 'SINGLE', 'ELECTRIC', 'FAIRY', 'LEGENDARY', NULL, 'Alola')," +
                "(786, 'TAPU LELE', 'SINGLE', 'PSYCHIC', 'FAIRY', 'LEGENDARY', NULL, 'Alola')," +
                "(787, 'TAPU BULU', 'SINGLE', 'GRASS', 'FAIRY', 'LEGENDARY', NULL, 'Alola')," +
                "(788, 'TAPU FINI', 'SINGLE', 'WATER', 'FAIRY', 'LEGENDARY', NULL, 'Alola')," +
                "(789, 'COSMOG', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL, 'Alola')," +
                "(790, 'COSMOEM', 'MIDDLE', 'PSYCHIC', NULL, NULL, NULL, 'Alola')," +
                "(791, 'SOLGALEO', 'FINAL', 'PSYCHIC', 'STEEL', 'LEGENDARY', NULL, 'Alola')," +
                "(792, 'LUNALA', 'FINAL', 'PSYCHIC', 'GHOST', 'LEGENDARY', NULL, 'Alola')," +
                "(793, 'NIHILEGO', 'SINGLE', 'ROCK', 'POISON', 'ULTRA BEAST', NULL, 'Alola')," +
                "(794, 'BUZZWOLE', 'SINGLE', 'BUG', 'FIGHTING', 'ULTRA BEAST', NULL, 'Alola')," +
                "(795, 'PHEROMOSA', 'SINGLE', 'BUG', 'FIGHTING', 'ULTRA BEAST', NULL, 'Alola')," +
                "(796, 'XURKITREE', 'SINGLE', 'ELECTRIC', NULL, 'ULTRA BEAST', NULL, 'Alola')," +
                "(797, 'CELESTEELA', 'SINGLE', 'STEEL', 'FLYING', 'ULTRA BEAST', NULL, 'Alola')," +
                "(798, 'KARTANA', 'SINGLE', 'GRASS', 'STEEL', 'ULTRA BEAST', NULL, 'Alola')," +
                "(799, 'GUZZLORD', 'SINGLE', 'DARK', 'DRAGON', 'ULTRA BEAST', NULL, 'Alola')," +
                "(800, 'NECROZMA', 'SINGLE', 'PSYCHIC', NULL, 'LEGENDARY', NULL, 'Alola')," +
                "(801, 'MAGEARNA', 'SINGLE', 'STEEL', 'FAIRY', 'MYTHICAL', NULL, 'Alola')," +
                "(802, 'MARSHADOW', 'SINGLE', 'FIGHTING', 'GHOST', 'MYTHICAL', NULL, 'Alola')," +
                "(803, 'POIPOLE', 'INITIAL', 'POISON', NULL, 'ULTRA BEAST', NULL, 'Alola')," +
                "(804, 'NAGANADEL', 'FINAL', 'POISON', 'DRAGON', 'ULTRA BEAST', NULL, 'Alola')," +
                "(805, 'STAKATAKA', 'SINGLE', 'ROCK', 'STEEL', 'ULTRA BEAST', NULL, 'Alola')," +
                "(806, 'BLACEPHALON', 'SINGLE', 'FIRE', 'GHOST', 'ULTRA BEAST', NULL, 'Alola')," +
                "(807, 'ZERAORA', 'SINGLE', 'ELECTRIC', NULL, 'MYTHICAL', NULL, 'Alola')," +
                "(808, 'MELTAN', 'SINGLE', 'STEEL', NULL, 'LEGENDARY', NULL, 'Alola')," +
                "(809, 'MELMETAL', 'FINAL', 'STEEL', NULL, 'LEGENDARY', NULL, 'Alola')," +
                "(810, 'GROOKEY', 'INITIAL', 'GRASS', NULL, 'STARTER', NULL, 'Galar')," +
                "(811, 'THWACKEY', 'MIDDLE', 'GRASS', NULL, 'STARTER', NULL, 'Galar')," +
                "(812, 'RILLABOOM', 'FINAL', 'GRASS', NULL, 'STARTER', NULL, 'Galar')," +
                "(813, 'SCORBUNNY', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL, 'Galar')," +
                "(814, 'RABOOT', 'MIDDLE', 'FIRE', NULL, 'STARTER', NULL, 'Galar')," +
                "(815, 'CINDERACE', 'FINAL', 'FIRE', NULL, 'STARTER', NULL, 'Galar')," +
                "(816, 'SOBBLE', 'INITIAL', 'WATER', NULL, 'STARTER', NULL, 'Galar')," +
                "(817, 'DRIZZILE', 'MIDDLE', 'WATER', NULL, 'STARTER', NULL, 'Galar')," +
                "(818, 'INTELEON', 'FINAL', 'WATER', NULL, 'STARTER', NULL, 'Galar')," +
                "(819, 'SKWOVET', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Galar')," +
                "(820, 'GREEDENT', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Galar')," +
                "(821, 'ROOKIDEE', 'INITIAL', 'FLYING', NULL, NULL, NULL, 'Galar')," +
                "(822, 'CORVISQUIRE', 'MIDDLE', 'FLYING', NULL, NULL, NULL, 'Galar')," +
                "(823, 'CORVIKNIGHT', 'FINAL', 'FLYING', 'STEEL', NULL, NULL, 'Galar')," +
                "(824, 'BLIPBUG', 'INITIAL', 'BUG', NULL, NULL, NULL, 'Galar')," +
                "(825, 'DOTTLER', 'MIDDLE', 'BUG', 'PSYCHIC', NULL, NULL, 'Galar')," +
                "(826, 'ORBEETLE', 'FINAL', 'BUG', 'PSYCHIC', NULL, NULL, 'Galar')," +
                "(827, 'NICKIT', 'INITIAL', 'DARK', NULL, NULL, NULL, 'Galar')," +
                "(828, 'THIEVUL', 'FINAL', 'DARK', NULL, NULL, NULL, 'Galar')," +
                "(829, 'GOSSIFLEUR', 'INITIAL', 'GRASS', NULL, NULL, NULL, 'Galar')," +
                "(830, 'ELDEGOSS', 'FINAL', 'GRASS', NULL, NULL, NULL, 'Galar')," +
                "(831, 'WOOLOO', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Galar')," +
                "(832, 'DUBWOOL', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Galar')," +
                "(833, 'CHEWTLE', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Galar')," +
                "(834, 'DREDNAW', 'FINAL', 'WATER', 'ROCK', NULL, NULL, 'Galar')," +
                "(835, 'YAMPER', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL, 'Galar')," +
                "(836, 'BOLTUND', 'FINAL', 'ELECTRIC', NULL, NULL, NULL, 'Galar')," +
                "(837, 'ROLYCOLY', 'INITIAL', 'ROCK', NULL, NULL, NULL, 'Galar')," +
                "(838, 'CARKOL', 'MIDDLE', 'ROCK', 'FIRE', NULL, NULL, 'Galar')," +
                "(839, 'COALOSSAL', 'FINAL', 'ROCK', 'FIRE', NULL, NULL, 'Galar')," +
                "(840, 'APPLIN', 'INITIAL', 'GRASS', 'DRAGON', NULL, NULL, 'Galar')," +
                "(841, 'FLAPPLE', 'FINAL', 'GRASS', 'DRAGON', NULL, 'ITEM', 'Galar')," +
                "(842, 'APPLETON', 'FINAL', 'GRASS', 'DRAGON', NULL, 'ITEM', 'Galar')," +
                "(843, 'SILICOBRA', 'INITIAL', 'GROUND', NULL, NULL, NULL, 'Galar')," +
                "(844, 'SANDACONDA', 'FINAL', 'GROUND', NULL, NULL, NULL, 'Galar')," +
                "(845, 'CRAMORANT', 'SINGLE', 'FLYING', 'WATER', NULL, NULL, 'Galar')," +
                "(846, 'ARROKUDA', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Galar')," +
                "(847, 'BARRASKEWDA', 'FINAL', 'WATER', NULL, NULL, NULL, 'Galar')," +
                "(848, 'TOXEL', 'INITIAL', 'ELECTRIC', 'POISON', NULL, NULL, 'Galar')," +
                "(849, 'TOXTRICITY', 'FINAL', 'ELECTRIC', 'POISON', NULL, NULL, 'Galar')," +
                "(850, 'SIZZLIPEDE', 'INITIAL', 'FIRE', 'BUG', NULL, NULL, 'Galar')," +
                "(851, 'CENTISKORCH', 'FINAL', 'FIRE', 'BUG', NULL, NULL, 'Galar')," +
                "(852, 'CLOBBOPUS', 'INITIAL', 'FIGHTING', NULL, NULL, NULL, 'Galar')," +
                "(853, 'GRAPPLOCT', 'FINAL', 'FIGHTING', NULL, NULL, NULL, 'Galar')," +
                "(854, 'SINISTEA', 'INITIAL', 'GHOST', NULL, NULL, NULL, 'Galar')," +
                "(855, 'POLTEAGEIST', 'FINAL', 'GHOST', NULL, NULL, 'ITEM', 'Galar')," +
                "(856, 'HATENNA', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL, 'Galar')," +
                "(857, 'HATTREM', 'MIDDLE', 'PSYCHIC', NULL, NULL, NULL, 'Galar')," +
                "(858, 'HATTERENE', 'FINAL', 'PSYCHIC', 'FAIRY', NULL, NULL, 'Galar')," +
                "(859, 'IMPIDIMP', 'INITIAL', 'DARK', 'FAIRY', NULL, NULL, 'Galar')," +
                "(860, 'MORGREM', 'MIDDLE', 'DARK', 'FAIRY', NULL, NULL, 'Galar')," +
                "(861, 'GRIMMSNARL', 'FINAL', 'DARK', 'FAIRY', NULL, NULL, 'Galar')," +
                "(862, 'OBSTAGOON', 'FINAL', 'DARK', 'NORMAL', NULL, NULL, 'Galar')," +
                "(863, 'PERRSERKER', 'FINAL', 'STEEL', NULL, NULL, NULL, 'Galar')," +
                "(864, 'CURSOLA', 'FINAL', 'GHOST', NULL, NULL, NULL, 'Galar')," +
                "(865, 'SIRFETCHD', 'FINAL', 'FIGHTING', NULL, NULL, 'ITEM', 'Galar')," +
                "(866, 'MR_RIME', 'FINAL', 'ICE', 'PSYCHIC', NULL, NULL, 'Galar')," +
                "(867, 'RUNERIGUS', 'FINAL', 'GROUND', 'GHOST', NULL, 'ITEM', 'Galar')," +
                "(868, 'MILCERY', 'INITIAL', 'FAIRY', NULL, NULL, 'ITEM', 'Galar')," +
                "(869, 'ALCREMIE', 'FINAL', 'FAIRY', NULL, NULL, NULL, 'Galar')," +
                "(870, 'FALINKS', 'SINGLE', 'FIGHTING', NULL, NULL, NULL, 'Galar')," +
                "(871, 'PINCURCHIN', 'SINGLE', 'ELECTRIC', NULL, NULL, NULL, 'Galar')," +
                "(872, 'SNOM', 'INITIAL', 'ICE', 'BUG', NULL, NULL, 'Galar')," +
                "(873, 'FROSMOTH', 'FINAL', 'ICE', 'BUG', NULL, 'FRIENDSHIP', 'Galar')," +
                "(874, 'STONJOURNER', 'SINGLE', 'ROCK', NULL, NULL, NULL, 'Galar')," +
                "(875, 'EISCUE', 'SINGLE', 'ICE', NULL, NULL, NULL, 'Galar')," +
                "(876, 'INDEEDEE', 'SINGLE', 'PSYCHIC', 'NORMAL', NULL, NULL, 'Galar')," +
                "(877, 'MORPEKO', 'SINGLE', 'ELECTRIC', 'DARK', NULL, NULL, 'Galar')," +
                "(878, 'CUFANT', 'INITIAL', 'STEEL', NULL, NULL, NULL, 'Galar')," +
                "(879, 'COPPERAJAH', 'FINAL', 'STEEL', NULL, NULL, NULL, 'Galar')," +
                "(880, 'DRACOZOLT', 'FINAL', 'ELECTRIC', 'DRAGON', 'FOSSIL', NULL, 'Galar')," +
                "(881, 'ARCTOZOLT', 'FINAL', 'ELECTRIC', 'ICE', 'FOSSIL', NULL, 'Galar')," +
                "(882, 'DRACOVISH', 'FINAL', 'WATER', 'DRAGON', 'FOSSIL', NULL, 'Galar')," +
                "(883, 'ARCTOVISH', 'FINAL', 'WATER', 'ICE', 'FOSSIL', NULL, 'Galar')," +
                "(884, 'DURALUDON', 'INITIAL', 'STEEL', 'DRAGON', NULL, NULL, 'Galar')," +
                "(885, 'DREEPY', 'INITIAL', 'DRAGON', 'GHOST', NULL, NULL, 'Galar')," +
                "(886, 'DRAKLOAK', 'MIDDLE', 'DRAGON', 'GHOST', NULL, NULL, 'Galar')," +
                "(887, 'DRAGAPULT', 'FINAL', 'DRAGON', 'GHOST', NULL, NULL, 'Galar')," +
                "(888, 'ZACIAN', 'SINGLE', 'FAIRY', 'STEEL', 'LEGENDARY', NULL, 'Galar')," +
                "(889, 'ZAMAZENTA', 'SINGLE', 'FIGHTING', 'STEEL', 'LEGENDARY', NULL, 'Galar')," +
                "(890, 'ETERNATUS', 'SINGLE', 'POISON', 'DRAGON', 'LEGENDARY', NULL, 'Galar')," +
                "(891, 'KUBFU', 'INITIAL', 'FIGHTING', NULL, 'LEGENDARY', NULL, 'Galar')," +
                "(892, 'URSHIFU', 'FINAL', 'FIGHTING', 'DARK', 'LEGENDARY', NULL, 'Galar')," +
                "(893, 'ZARUDE', 'SINGLE', 'DARK', 'GRASS', 'LEGENDARY', NULL, 'Galar')," +
                "(894, 'REGIELEKI', 'SINGLE', 'ELECTRIC', NULL, 'LEGENDARY', NULL, 'Galar')," +
                "(895, 'REGIDRAGO', 'SINGLE', 'DRAGON', NULL, 'LEGENDARY', NULL, 'Galar')," +
                "(896, 'GLASTRIER', 'SINGLE', 'ICE', NULL, 'LEGENDARY', NULL, 'Galar')," +
                "(897, 'SPECTRIER', 'SINGLE', 'GHOST', NULL, 'LEGENDARY', NULL, 'Galar')," +
                "(898, 'CALYREX', 'SINGLE', 'PSYCHIC', 'GRASS', 'LEGENDARY', NULL, 'Galar')," +
                "(899, 'WYRDEER', 'FINAL', 'NORMAL', 'PSYCHIC', NULL, NULL, 'Galar')," +
                "(900, 'KLEAVOR', 'FINAL', 'BUG', 'ROCK', NULL, NULL, 'Galar')," +
                "(901, 'URSALUNA', 'FINAL', 'NORMAL', 'GROUND', NULL, NULL, 'Galar')," +
                "(902, 'BASCULEGION', 'FINAL', 'WATER', 'GHOST', NULL, NULL, 'Galar')," +
                "(903, 'SNEASLER', 'FINAL', 'FIGHTING', 'POISON', NULL, NULL, 'Galar')," +
                "(904, 'OVERQWIL', 'FINAL', 'DARK', 'POISON', NULL, NULL, 'Galar')," +
                "(905, 'ENAMORUS', 'SINGLE', 'FAIRY', 'FLYING', 'LEGENDARY', NULL, 'Galar')," +
                "(906, 'SPRIGATITO', 'INITIAL', 'GRASS', NULL, 'STARTER', NULL, 'Paldea')," +
                "(907, 'FLORAGATO', 'MIDDLE', 'GRASS', NULL, 'STARTER', NULL, 'Paldea')," +
                "(908, 'MEOWSCARADA', 'FINAL', 'GRASS', 'DARK', 'STARTER', NULL, 'Paldea')," +
                "(909, 'FUECOCO', 'INITIAL', 'FIRE', NULL, 'STARTER', NULL, 'Paldea')," +
                "(910, 'CROCALOR', 'MIDDLE', 'FIRE', NULL, 'STARTER', NULL, 'Paldea')," +
                "(911, 'SKELEDIRGE', 'FINAL', 'FIRE', 'GHOST', 'STARTER', NULL, 'Paldea')," +
                "(912, 'QUAXLY', 'INITIAL', 'WATER', NULL, 'STARTER', NULL, 'Paldea')," +
                "(913, 'QUAXWELL', 'MIDDLE', 'WATER', NULL, 'STARTER', NULL, 'Paldea')," +
                "(914, 'QUAQUAVAL', 'FINAL', 'WATER', 'FIGHTING', 'STARTER', NULL, 'Paldea')," +
                "(915, 'LECHONK', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Paldea')," +
                "(916, 'OINKOLOGNE', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Paldea')," +
                "(917, 'TAROUNTULA', 'INITIAL', 'BUG', NULL, NULL, NULL, 'Paldea')," +
                "(918, 'SPIDOPS', 'FINAL', 'BUG', NULL, NULL, NULL, 'Paldea')," +
                "(919, 'NYMBLE', 'INITIAL', 'BUG', NULL, NULL, NULL, 'Paldea')," +
                "(920, 'LOKIX', 'FINAL', 'BUG', 'DARK', NULL, NULL, 'Paldea')," +
                "(921, 'PAWMI', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL, 'Paldea')," +
                "(922, 'PAWMO', 'MIDDLE', 'ELECTRIC', 'FIGHTING', NULL, NULL, 'Paldea')," +
                "(923, 'PAWMOT', 'FINAL', 'ELECTRIC', 'FIGHTING', NULL, NULL, 'Paldea')," +
                "(924, 'TANDEMAUS', 'INITIAL', 'NORMAL', NULL, NULL, NULL, 'Paldea')," +
                "(925, 'MAUSHOLD', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Paldea')," +
                "(926, 'FIDDOUGH', 'INITIAL', 'FAIRY', NULL, NULL, NULL, 'Paldea')," +
                "(927, 'DACHSBUN', 'FINAL', 'FAIRY', NULL, NULL, NULL, 'Paldea')," +
                "(928, 'SMOLIV', 'INITIAL', 'GRASS', 'NORMAL', NULL, NULL, 'Paldea')," +
                "(929, 'DOLLIV', 'MIDDLE', 'GRASS', 'NORMAL', NULL, NULL, 'Paldea')," +
                "(930, 'ARBOLIVA', 'FINAL', 'GRASS', 'NORMAL', NULL, NULL, 'Paldea')," +
                "(931, 'SQUAWKABILLY', 'SINGLE', 'NORMAL', 'FLYING', NULL, NULL, 'Paldea')," +
                "(932, 'NACLI', 'INITIAL', 'ROCK', NULL, NULL, NULL, 'Paldea')," +
                "(933, 'NACLSTACK', 'MIDDLE', 'ROCK', NULL, NULL, NULL, 'Paldea')," +
                "(934, 'GARGANACL', 'FINAL', 'ROCK', NULL, NULL, NULL, 'Paldea')," +
                "(935, 'CHARCADET', 'INITIAL', 'FIRE', NULL, NULL, NULL, 'Paldea')," +
                "(936, 'ARMAROUGE', 'FINAL', 'FIRE', 'PSYCHIC', NULL, 'ITEM', 'Paldea')," +
                "(937, 'CERULEDGE', 'FINAL', 'FIRE', 'GHOST', NULL, 'ITEM', 'Paldea')," +
                "(938, 'TADBULB', 'INITIAL', 'ELECTRIC', NULL, NULL, NULL, 'Paldea')," +
                "(939, 'BELLIBOLT', 'FINAL', 'ELECTRIC', NULL, NULL, 'ITEM', 'Paldea')," +
                "(940, 'WATTREL', 'INITIAL', 'ELECTRIC', 'FLYING', NULL, NULL, 'Paldea')," +
                "(941, 'KILOWATTREL', 'FINAL', 'ELECTRIC', 'FLYING', NULL, NULL, 'Paldea')," +
                "(942, 'MASCHIFF', 'INITIAL', 'DARK', NULL, NULL, NULL, 'Paldea')," +
                "(943, 'MABOSTIFF', 'FINAL', 'DARK', NULL, NULL, NULL, 'Paldea')," +
                "(944, 'SHROODLE', 'INITIAL', 'POISON', 'NORMAL', NULL, NULL, 'Paldea')," +
                "(945, 'GRAFAIAI', 'FINAL', 'POISON', 'NORMAL', NULL, NULL, 'Paldea')," +
                "(946, 'BRAMBLIN', 'INITIAL', 'GRASS', 'GHOST', NULL, NULL, 'Paldea')," +
                "(947, 'BRAMBLEGHAST', 'FINAL', 'GRASS', 'GHOST', NULL, NULL, 'Paldea')," +
                "(948, 'TOEDSCOOL', 'INITIAL', 'GROUND', 'GRASS', NULL, NULL, 'Paldea')," +
                "(949, 'TOEDSCRUEL', 'FINAL', 'GROUND', 'GRASS', NULL, NULL, 'Paldea')," +
                "(950, 'KLAWFF', 'SINGLE', 'ROCK', NULL, NULL, NULL, 'Paldea')," +
                "(951, 'CAPSAKID', 'INITIAL', 'GRASS', NULL, NULL, NULL, 'Paldea')," +
                "(952, 'SCOVILLAIN', 'FINAL', 'GRASS', 'FIRE', NULL, 'ITEM', 'Paldea')," +
                "(953, 'RELLOR', 'INITIAL', 'BUG', NULL, NULL, NULL, 'Paldea')," +
                "(954, 'RABSCA', 'FINAL', 'BUG', 'PSYCHIC', NULL, NULL, 'Paldea')," +
                "(955, 'FLITTLE', 'INITIAL', 'PSYCHIC', NULL, NULL, NULL, 'Paldea')," +
                "(956, 'ESPATHRA', 'FINAL', 'PSYCHIC', NULL, NULL, NULL, 'Paldea')," +
                "(957, 'TINKATINK', 'INITIAL', 'FAIRY', 'STEEL', NULL, NULL, 'Paldea')," +
                "(958, 'TINKATUFF', 'MIDDLE', 'FAIRY', 'STEEL', NULL, NULL, 'Paldea')," +
                "(959, 'TINKATON', 'FINAL', 'FAIRY', 'STEEL', NULL, NULL, 'Paldea')," +
                "(960, 'WIGLETT', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Paldea')," +
                "(961, 'WUGTRIO', 'FINAL', 'WATER', NULL, NULL, NULL, 'Paldea')," +
                "(962, 'BOMBIRDIER', 'SINGLE', 'FLYING', 'DARK', NULL, NULL, 'Paldea')," +
                "(963, 'FINIZEN', 'INITIAL', 'WATER', NULL, NULL, NULL, 'Paldea')," +
                "(964, 'PALAFIN', 'FINAL', 'WATER', NULL, NULL, 'FRIENDSHIP', 'Paldea')," +
                "(965, 'VAROOM', 'INITIAL', 'STEEL', 'POISON', NULL, NULL, 'Paldea')," +
                "(966, 'REVAVROOM', 'FINAL', 'STEEL', 'POISON', NULL, NULL, 'Paldea')," +
                "(967, 'CYCLOZAR', 'SINGLE', 'DRAGON', 'NORMAL', NULL, NULL, 'Paldea')," +
                "(968, 'ORTHWORM', 'SINGLE', 'STEEL', NULL, NULL, NULL, 'Paldea')," +
                "(969, 'GLIMMET', 'INITIAL', 'ROCK', 'POISON', NULL, NULL, 'Paldea')," +
                "(970, 'GLIMMORA', 'FINAL', 'ROCK', 'POISON', NULL, NULL, 'Paldea')," +
                "(971, 'GREAVARD', 'INITIAL', 'GHOST', NULL, NULL, NULL, 'Paldea')," +
                "(972, 'HOUNDSTONE', 'FINAL', 'GHOST', NULL, NULL, NULL, 'Paldea')," +
                "(973, 'FLAMIGO', 'SINGLE', 'FLYING', 'FIGHTING', NULL, NULL, 'Paldea')," +
                "(974, 'CETODDLE', 'INITIAL', 'ICE', NULL, NULL, NULL, 'Paldea')," +
                "(975, 'CETITAN', 'FINAL', 'ICE', NULL, NULL, 'ITEM', 'Paldea')," +
                "(976, 'VELUZA', 'SINGLE', 'WATER', 'PSYCHIC', NULL, NULL, 'Paldea')," +
                "(977, 'DONDOZO', 'SINGLE', 'WATER', NULL, NULL, NULL, 'Paldea')," +
                "(978, 'TATSUGIRI', 'SINGLE', 'DRAGON', 'WATER', NULL, NULL, 'Paldea')," +
                "(979, 'ANNIHILAPE', 'FINAL', 'FIGHTING', 'GHOST', NULL, NULL, 'Paldea')," +
                "(980, 'CLODSIRE', 'FINAL', 'POISON', 'GROUND', NULL, NULL, 'Paldea')," +
                "(981, 'FARIGIRAF', 'FINAL', 'NORMAL', 'PSYCHIC', NULL, NULL, 'Paldea')," +
                "(982, 'DUDUNSPARCE', 'FINAL', 'NORMAL', NULL, NULL, NULL, 'Paldea')," +
                "(983, 'KINGAMBIT', 'FINAL', 'DARK', 'STEEL', NULL, NULL, 'Paldea')," +
                "(984, 'GREAT TUSK', 'SINGLE', 'GROUND', 'FIGHTING', NULL, NULL, 'Paldea')," +
                "(985, 'SCREAM TAIL', 'SINGLE', 'FAIRY', 'PSYCHIC', NULL, NULL, 'Paldea')," +
                "(986, 'BRUTE BONNET', 'SINGLE', 'GRASS', 'DARK', NULL, NULL, 'Paldea')," +
                "(987, 'FLUTTER MANE', 'SINGLE', 'GHOST', 'FAIRY', NULL, NULL, 'Paldea')," +
                "(988, 'SLITHER WING', 'SINGLE', 'BUG', 'FIGHTING', NULL, NULL, 'Paldea')," +
                "(989, 'SANDY SHOCKS', 'SINGLE', 'ELECTRIC', 'GROUND', 'PARADOX', NULL, 'Paldea')," +
                "(990, 'IRON TREADS', 'SINGLE', 'GROUND', 'STEEL', 'PARADOX', NULL, 'Paldea')," +
                "(991, 'IRON BUNDLE', 'SINGLE', 'ICE', 'WATER', 'PARADOX', NULL, 'Paldea')," +
                "(992, 'IRON HANDS', 'SINGLE', 'FIGHTING', 'ELECTRIC', 'PARADOX', NULL, 'Paldea')," +
                "(993, 'IRON JUGULIS', 'SINGLE', 'DARK', 'FLYING', 'PARADOX', NULL, 'Paldea')," +
                "(994, 'IRON MOTH', 'SINGLE', 'FIRE', 'POISON', 'PARADOX', NULL, 'Paldea')," +
                "(995, 'IRON THORNS', 'SINGLE', 'ROCK', 'ELECTRIC', 'PARADOX', NULL, 'Paldea')," +
                "(996, 'FRIGIBAX', 'INITIAL', 'DRAGON', 'ICE', NULL, NULL, 'Paldea')," +
                "(997, 'ARCTIBAX', 'MIDDLE', 'DRAGON', 'ICE', NULL, NULL, 'Paldea')," +
                "(998, 'BAXCALIBUR', 'FINAL', 'DRAGON', 'ICE', NULL, NULL, 'Paldea')," +
                "(999, 'GIMMIGHOUL', 'INITIAL', 'GHOST', NULL, NULL, NULL, 'Paldea')," +
                "(1000, 'GHOLDENGO', 'FINAL', 'GHOST', 'STEEL', NULL, NULL, 'Paldea')," +
                "(1001, 'WO-CHIEN', 'SINGLE', 'DARK', 'GRASS', 'LEGENDARY', NULL, 'Paldea')," +
                "(1002, 'CHIEN-PAO', 'SINGLE', 'DARK', 'ICE', 'LEGENDARY', NULL, 'Paldea')," +
                "(1003, 'TING-LU', 'SINGLE', 'DARK', 'GROUND', 'LEGENDARY', NULL, 'Paldea')," +
                "(1004, 'CHI-YU', 'SINGLE', 'DARK', 'FIRE', 'LEGENDARY', NULL, 'Paldea')," +
                "(1005, 'ROARING MOON', 'SINGLE', 'DRAGON', 'DARK', 'PARADOX', NULL, 'Paldea')," +
                "(1006, 'IRON VALIANT', 'SINGLE', 'FAIRY', 'FIGHTING', 'PARADOX', NULL, 'Paldea')," +
                "(1007, 'KORAIDON', 'SINGLE', 'FIGHTING', 'DRAGON', 'LEGENDARY', NULL, 'Paldea')," +
                "(1008, 'MIRAIDON', 'SINGLE', 'ELECTRIC', 'DRAGON', 'LEGENDARY', NULL, 'Paldea')," +
                "(1009, 'WALKING WAKE', 'SINGLE', 'WATER', 'DRAGON', 'PARADOX', NULL, 'Paldea')," +
                "(1010, 'IRON LEAVES', 'SINGLE', 'GRASS', 'PSYCHIC', 'PARADOX', NULL, 'Paldea')," +
                "(1011, 'DIPPLIN', 'MIDDLE', 'GRASS', 'DRAGON', NULL, NULL, 'Paldea')," +
                "(1012, 'POLTCHAGEIST', 'INITIAL', 'GRASS', 'GHOST', NULL, NULL, 'Paldea')," +
                "(1013, 'SINISTCHA', 'FINAL', 'GRASS', 'GHOST', NULL, 'ITEM', 'Paldea')," +
                "(1014, 'OKIDOGI', 'SINGLE', 'POISON', 'FIGHTING', 'LEGENDARY', NULL, 'Paldea')," +
                "(1015, 'MUNKIDORI', 'SINGLE', 'POISON', 'PSYCHIC', 'LEGENDARY', NULL, 'Paldea')," +
                "(1016, 'FEZANDIPITI', 'SINGLE', 'POISON', 'FAIRY', 'LEGENDARY', NULL, 'Paldea')," +
                "(1017, 'OGERPON', 'SINGLE', 'GRASS', NULL, 'LEGENDARY', NULL, 'Paldea')," +
                "(1018, 'ARCHALUDON', 'FINAL', 'STEEL', 'DRAGON', NULL, 'ITEM', 'Paldea')," +
                "(1019, 'HYDRAPPLE', 'FINAL', 'GRASS', 'DRAGON', NULL, NULL, 'Paldea')," +
                "(1020, 'GOUGING FIRE', 'SINGLE', 'FIRE', 'DRAGON', 'PARADOX', NULL, 'Paldea')," +
                "(1021, 'RAGING BOLT', 'SINGLE', 'ELECTRIC', 'DRAGON', 'PARADOX', NULL, 'Paldea')," +
                "(1022, 'IRON BOULDER', 'SINGLE', 'ROCK', 'PSYCHIC', 'PARADOX', NULL, 'Paldea')," +
                "(1023, 'IRON CROWN', 'SINGLE', 'STEEL', 'PSYCHIC', 'PARADOX', NULL, 'Paldea')," +
                "(1024, 'TERAPAGOS', 'SINGLE', 'NORMAL', NULL, 'LEGENDARY', NULL, 'Paldea')," +
                "(1025, 'PECHARUNT', 'SINGLE', 'POISON', 'GHOST', 'LEGENDARY', NULL, 'Paldea');"

            )
            console.log("Datos cargados con exito")
        } else {
            console.log("La tabla Pokemon ya existe");
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
