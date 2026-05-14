const Medico = require('../modelos/Medico');

exports.crearMedico = async (req, res) => {
    try {
        const nuevoMedico = await Medico.create(req.body);
        res.status(201).json({ mensaje: '✅ Médico registrado', data: nuevoMedico });
    } catch (error) {
        res.status(500).json({ mensaje: '❌ Error al registrar médico', error: error.message });
    }
};

exports.obtenerMedicos = async (req, res) => {
    const medicos = await Medico.findAll();
    res.json(medicos);
};