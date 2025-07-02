const express = require("express");
const router = express.Router();
const db = require("../modules/Emantecate_init.js")
const { Op } = require("sequelize");

router.use(express.json());

// Consultar todos los rellenos (activos e inactivos)
router.get("/api/Emantecate/rellenos", async (req, res) => {
    try {
        const rellenos = await db.Rellenos.findAll({
            order: [["IDRelleno", "ASC"]],
            attributes: ['IDRelleno', 'Nombre', 'Activo']
        });

        if (!rellenos || rellenos.length === 0) {
            return res.status(404).json({ error: "No se encontraron rellenos" });
        }

        return res.status(200).json(rellenos);
        
    } catch (err) {
        console.error("Error al obtener los Rellenos:", err.message);
        return res.status(500).json({ error: "Error al obtener los Rellenos" });
    }
});

// Consultar solo rellenos activos
router.get("/api/Emantecate/rellenos/activos", async (req, res) => {
    try {
        const rellenos = await db.Rellenos.findAll({
            where: { Activo: true },
            order: [["IDRelleno", "ASC"]],
            attributes: ['IDRelleno', 'Nombre']
        });

        return res.status(200).json(rellenos);
        
    } catch (err) {
        console.error("Error al obtener rellenos activos:", err.message);
        return res.status(500).json({ error: "Error al obtener rellenos activos" });
    }
});

// Registrar un nuevo relleno
router.post("/api/Emantecate/rellenos", async (req, res) => {
    try {
        const { Nombre } = req.body;

        if (!Nombre || Nombre.trim() === "") {
            return res.status(400).json({ error: "El nombre del relleno es obligatorio" });
        }

        // Verificar si el relleno ya existe
        const existeRelleno = await db.Rellenos.findOne({ where: { Nombre } });
        if (existeRelleno) {
            return res.status(409).json({ error: "Este relleno ya existe" });
        }

        const nuevoRelleno = await db.Rellenos.create({ 
            Nombre,
            Activo: true 
        });

        return res.status(201).json(nuevoRelleno);
        
    } catch (err) {
        console.error("Error al registrar el Relleno:", err.message);
        return res.status(500).json({ error: "Error al registrar el Relleno" });
    }
});

// Actualizar un relleno existente
router.put("/api/Emantecate/rellenos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre } = req.body;

        if (!Nombre || Nombre.trim() === "") {
            return res.status(400).json({ error: "El nombre del relleno es obligatorio" });
        }

        const relleno = await db.Rellenos.findByPk(id);

        if (!relleno) {
            return res.status(404).json({ error: "Relleno no encontrado" });
        }

        // Verificar si el nuevo nombre ya existe en otro relleno
        const existeNombre = await db.Rellenos.findOne({ 
            where: { 
                Nombre,
                IDRelleno: { [Op.ne]: id } // Excluir el relleno actual
            } 
        });
        
        if (existeNombre) {
            return res.status(409).json({ error: "Este nombre de relleno ya está en uso" });
        }

        await relleno.update({ Nombre });

        return res.status(200).json(relleno);
        
    } catch (err) {
        console.error("Error al actualizar el Relleno:", err.message);
        return res.status(500).json({ error: "Error al actualizar el Relleno" });
    }
});

// Baja lógica de un relleno
router.patch("/api/Emantecate/rellenos/:id/baja", async (req, res) => {
    try {
        const { id } = req.params;
    
        const relleno = await db.Rellenos.findByPk(id);
    
        if (!relleno) {
            return res.status(404).json({ error: "Relleno no encontrado" });
        }

        if (!relleno.Activo) {
            return res.status(400).json({ error: "El relleno ya está inactivo" });
        }
    
        await relleno.update({ 
            Activo: false
        });
    
        return res.status(200).json({ message: "Relleno dado de baja con éxito" });
        
    } catch (err) {
        console.error("Error al dar de baja el relleno:", err.message);
        return res.status(500).json({ error: "Error al dar de baja el relleno" });
    }
});

// Reactivar un relleno
router.patch("/api/Emantecate/rellenos/:id/activar", async (req, res) => {
    try {
        const { id } = req.params;
    
        const relleno = await db.Rellenos.findByPk(id);
    
        if (!relleno) {
            return res.status(404).json({ error: "Relleno no encontrado" });
        }

        if (relleno.Activo) {
            return res.status(400).json({ error: "El relleno ya está activo" });
        }
    
        await relleno.update({ 
            Activo: true
        });
    
        return res.status(200).json({ message: "Relleno reactivado con éxito" });
        
    } catch (err) {
        console.error("Error al reactivar el relleno:", err.message);
        return res.status(500).json({ error: "Error al reactivar el relleno" });
    }
});


// Baja fisica de un relleno
router.delete("/api/Emantecate/rellenos/:id", async (req, res) => {
    try {
        const { id } = req.params;
    
        const relleno = await db.Rellenos.findByPk(id);
    
        if (!relleno) {
            return res.status(404).json({ error: "Relleno no encontrado" });
        }
    
        await relleno.destroy();
    
        return res.status(200).json({ message: "Relleno eliminado permanentemente" });
        
    } catch (err) {
        console.error("Error al eliminar el relleno:", err.message);
        return res.status(500).json({ error: "Error al eliminar el relleno" });
    }
});

module.exports = router;