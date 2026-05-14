const Paciente = require('./modelos/Paciente');

async function crearPacientePrueba() {
    try {
        const nuevoPaciente = await Paciente.create({
            ci: '6945671-LP', // Un CI de ejemplo de La Paz
            nombre: 'Jose Daniel',
            apellido: 'Ticona Gutierrez',
            fecha_nacimiento: '1999-12-03',
            genero: 'M',
            telefono: '73046365',
            direccion: 'Calle Bernardino Condori 4054, El Alto, La Paz'
        });

        console.log('✅ ¡Paciente registrado con éxito en la base de datos!');
        console.log('Datos guardados:', nuevoPaciente.toJSON());
    } catch (error) {
        console.error('❌ Error al registrar paciente:', error);
    }
}

crearPacientePrueba();