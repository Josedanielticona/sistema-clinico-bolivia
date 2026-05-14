const Paciente = require('../modelos/Paciente');

// Función para obtener todos los pacientes
exports.obtenerPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener pacientes' });
    }
};

// Función para crear un nuevo paciente
exports.crearPaciente = async (req, res) => {
    try {
        const nuevoPaciente = await Paciente.create(req.body);
        res.status(201).json(nuevoPaciente);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el paciente', error });
    }
};