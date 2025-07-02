const db = require("aa-sqlite");
const path = require("path")

async function CrearBaseSiNoExiste() {
    try {
        await db.open(path.resolve(__dirname, "../../.data/Emantecate.db"));
        console.log("Base de datos abierta correctamente");
        
        let res = null;
        let existe = false;

        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'Rellenos' ", 
            []
        )

        if (res.contar > 0) {
            existe = true
        }
        else {
            existe = false
        }

        if (!existe) {
            await db.run(
                "CREATE TABLE Rellenos (" +
                "IDRelleno INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "Nombre STRING NOT NULL, " +
                "Activo BOOLEAN DEFAULT TRUE);"
            );
            console.log("Tabla Rellenos creada con éxito");
        } else {
            console.log("La tabla Rellenos ya existe");
        }

        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'Productos' ",
            []
        )

        if (res.contar > 0) {
            existe = true
        }
        else {
            existe = false
        }

        if(!existe){
            await db.run(
                "CREATE TABLE Productos(" +
                "IDProducto INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "Nombre STRING NOT NULL, " +
                "Descripcion STRING NOT NULL, " +
                "Precio DECIMAL(10,2) NOT NULL, " +
                "Imagen STRING NOT NULL, " +
                "Stock INTEGER NOT NULL DEFAULT 0, " +
                "Activo BOOLEAN DEFAULT TRUE, " +
                "Destacado BOOLEAN DEFAULT FALSE, " +
                "IDRelleno INTEGER, FOREIGN KEY(IDRelleno) REFERENCES Rellenos(IDRelleno));"
            )
            console.log("Tabla Productos creada con exito!")
        }else{
            console.log("La tabla Productos ya existe")
        }

        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'Admin' ",
            []
        )

        if (res.contar > 0) {
            existe = true
        }
        else {
            existe = false
        }

        if(!existe){
            await db.run(
                "CREATE TABLE Admin(" +
                "Usuario STRING PRIMARY KEY , " +
                "Contraseña STRING NOT NULL);"
            )
            console.log("Tabla Admin creada con exito!")
        }else{
            console.log("La tabla Admin ya existe")
        }
    } catch (error) {
        console.error("Error al crear la base de datos o acceder a ella:", error);
    }
}

CrearBaseSiNoExiste();
