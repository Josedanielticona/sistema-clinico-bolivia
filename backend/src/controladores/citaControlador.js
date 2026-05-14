const Cita = require('../modelos/Cita');

exports.crearCita = async (req, res) => {
    try {
        const nuevaCita = await Cita.create(req.body);
        res.status(201).json({ mensaje: '✅ Cita programada', data: nuevaCita });
    } catch (error) {
        res.status(500).json({ mensaje: '❌ Error al programar cita', error: error.message });
    }
};