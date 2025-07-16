const express = require("express");
const router = express.Router();
const db = require("../modules/Emantecate_init.js")
const { Op } = require("sequelize");
const authenticateToken = require("../middleware/auth.js")
const upload = require("../middleware/upload.js")

router.use(express.json());

//Consultar todos los productos
router.get("/api/Emantecate", async (req, res) => {
    try {
        const productos = await db.Productos.findAll({
            include: {
                model: db.Rellenos,
                as: 'Relleno', 
                attributes: ["Nombre"]
            },
            order: [["Stock", "ASC"]],
            attributes: ['IDProducto', 'Nombre', 'Descripcion', 'Precio', 'Imagen', 'Stock', 'Activo', 'Destacado', 'IDRelleno']
        });

        if (!productos || productos.length === 0) {
            return res.status(404).json({ error: "No se encontraron productos" });
        }

        return res.status(200).json(productos);
        
    } catch (err) {
        console.error("Error al obtener los Productos:", err.message);
        return res.status(500).json({ error: "Error al obtener los Productos" });
    }
});

//Consultar un producto por ID
router.get("/api/Emantecate/:id", async (req, res) => {
    try {
        const producto = await db.Productos.findByPk(req.params.id, {
            include: {
                model: db.Rellenos,
                as: 'Relleno',
                attributes: ["Nombre"]
            },
            attributes: ['IDProducto', 'Nombre', 'Descripcion', 'Precio', 'Imagen', 'Stock', 'Activo', 'Destacado', 'IDRelleno']
        });

        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        return res.status(200).json(producto);
        
    } catch (err) {
        console.error("Error al obtener el producto:", err.message);
        return res.status(500).json({ error: "Error al obtener el producto" });
    }
});

//Agregar un producto
router.post("/api/Emantecate", authenticateToken, upload.single("Imagen"), async (req, res) => {
    try {
        const { Nombre, Descripcion, Precio, Stock, Activo, Destacado, IDRelleno } = req.body;
    
        if (!Nombre || !Descripcion || !Precio ) {
            return res.status(400).json({ error: "Faltan datos requeridos" });
        } 
        
        const imagenNombre = req.file ? req.file.filename : null;

        const nuevoProducto = await db.Productos.create({
            Nombre,
            Descripcion,
            Precio,
            Imagen: imagenNombre,
            Stock: Stock ? parseInt(Stock) : 0,
            Activo: Activo !== undefined ? Activo : true,
            Destacado: Destacado !== undefined ? Destacado : false, 
            IDRelleno: IDRelleno ? parseInt(IDRelleno) : null 
        });
    
        return res.status(201).json(nuevoProducto);
        
    } catch (err) {
        console.error("Error al agregar el producto:", err.message);
        return res.status(500).json({error: "Error al agregar el producto"});
    }
});

//Actualizar un producto 
router.put("/api/Emantecate/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre, Descripcion, Precio, Imagen, Stock, Activo, Destacado, IDRelleno } = req.body;

        const producto = await db.Productos.findByPk(id, {
            include: {
                model: db.Rellenos,
                as: 'Relleno', 
                attributes: ["Nombre"]
            }
        });

        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        await producto.update({
            Nombre,
            Descripcion,
            Precio,
            Imagen,
            Stock: Stock ? parseInt(Stock) : producto.Stock,
            Activo: Activo !== undefined ? Activo : producto.Activo,
            Destacado: Destacado !== undefined ? Destacado : producto.Destacado,
            IDRelleno: IDRelleno ? parseInt(IDRelleno) : null 
        });

        return res.status(200).json(producto);
    } catch (err) {
        console.error("Error al actualizar el producto:", err.message);
        return res.status(500).json({ error: "Error al actualizar el producto" });
    }
});

// Baja lógica 
router.patch("/api/Emantecate/:id/baja", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
    
        const producto = await db.Productos.findByPk(id);
    
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
    
        await producto.update({ 
            Activo: false
        });
    
        return res.status(200).json({ message: "Producto dado de baja con éxito" });
        
    } catch (err) {
        console.error("Error al dar de baja el producto:", err.message);
        return res.status(500).json({ error: "Error al dar de baja el producto" });
    }
});

// Reactivar un producto
router.patch("/api/Emantecate/:id/activar", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
    
        const producto = await db.Productos.findByPk(id);
    
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
    
        await producto.update({ 
            Activo: true
        });
    
        return res.status(200).json({ message: "Producto reactivado con éxito" });
        
    } catch (err) {
        console.error("Error al dar de baja el producto:", err.message);
        return res.status(500).json({ error: "Error al dar de baja el producto" });
    }
});

// Eliminación física
router.delete("/api/Emantecate/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
    
        const producto = await db.Productos.findByPk(id);
    
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
    
        await producto.destroy();
    
        return res.status(200).json({ message: "Producto eliminado con éxito" });
        
    } catch (err) {
        console.error("Error al eliminar el producto:", err.message);
        return res.status(500).json({ error: "Error al eliminar el producto" });
    }
});

module.exports = router;