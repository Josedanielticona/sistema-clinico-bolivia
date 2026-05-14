const express = require('express');
const router = express.Router();
const Cita = require('../modelos/Cita');
const Paciente = require('../modelos/Paciente');
const Medico = require('../modelos/Medico');

// GET: Listar citas (incluyendo datos de paciente y médico para que se vea bonito)
router.get('/', async (req, res) => {
    try {
        const citas = await Cita.findAll({
            include: [Paciente, Medico] // Esto trae los nombres automáticamente
        });
        res.json(citas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener citas' });
    }
});

// POST: Crear una cita
router.post('/', async (req, res) => {
    try {
        const { pacienteId, medicoId, fecha, motivo } = req.body;
        console.log("Datos recibidos para cita:", { pacienteId, medicoId, fecha, motivo }); // LOG DE DEPURACIÓN
        
        const nuevaCita = await Cita.create({ pacienteId, medicoId, fecha, motivo });
        res.json(nuevaCita);
    } catch (error) {
        console.error("ERROR DETALLADO EN EL BACKEND:", error); // ESTO NOS DIRÁ QUÉ PASA
        res.status(500).json({ error: error.message }); // Enviamos el error real al frontend
    }
});

// DELETE: Cancelar una cita
router.delete('/:id', async (req, res) => {
    try {
        await Cita.destroy({ where: { id_cita: req.params.id } });
        res.json({ message: 'Cita cancelada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al cancelar cita' });
    }
});

module.exports = router;