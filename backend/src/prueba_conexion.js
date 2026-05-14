const Paciente = require('./modelos/Paciente');
const Medico = require('./modelos/Medico');
const Cita = require('./modelos/Cita');

async function probarRelaciones() {
    try {
        // 1. Creamos datos de prueba
        const paciente = await Paciente.create({ nombre: 'Juan Perez' });
        const medico = await Medico.create({ nombre: 'Dra. Ana Lopez', especialidad: 'Pediatría', licencia: '123' });

        // 2. Creamos la cita vinculándolos (aquí usamos los IDs que se generaron)
        const cita = await Cita.create({
            fecha: new Date(),
            motivo: 'Consulta de control',
            estado: 'Pendiente',
            pacienteId: paciente.id, // Vinculando ID del paciente
            medicoId: medico.id      // Vinculando ID del médico
        });

        console.log('✅ Cita creada exitosamente con relaciones:', cita.toJSON());
    } catch (error) {
        console.error('❌ Error al probar relaciones:', error);
    }
}

probarRelaciones();