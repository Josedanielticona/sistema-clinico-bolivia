const express = require('express');
const router = express.Router();
const Paciente = require('../modelos/Paciente');

// GET: Listar todos los pacientes
router.get('/', async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener pacientes' });
    }
});

// POST: Registrar un nuevo paciente
router.post('/', async (req, res) => {
    try {
        const { ci, nombre, apellido } = req.body;
        const nuevoPaciente = await Paciente.create({ ci, nombre, apellido });
        res.json(nuevoPaciente);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar paciente' });
    }
});

// DELETE: Eliminar un paciente por ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await Paciente.destroy({ 
            where: { id_paciente: id } 
        });
        
        if (eliminado) {
            res.json({ message: 'Paciente eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Paciente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar paciente' });
    }
});

// PUT: Actualizar un paciente por ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { ci, nombre, apellido } = req.body;
        
        // --- AÑADE ESTOS LOGS PARA DEPURAR ---
        console.log("DEBUG - ID recibido:", id);
        console.log("DEBUG - Datos recibidos:", { ci, nombre, apellido });
        // ------------------------------------

        const resultado = await Paciente.update(
            { ci, nombre, apellido }, 
            { where: { id_paciente: id } }
        );
        
        console.log("DEBUG - Resultado de Sequelize:", resultado); // Ver cuántas filas se afectaron

        if (resultado[0] > 0) {
            res.json({ message: 'Paciente actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'No se realizaron cambios o no existe' });
        }
    } catch (error) {
        console.error("DEBUG - Error en DB:", error);
        res.status(500).json({ error: 'Error al actualizar paciente' });
    }
});

module.exports = router;