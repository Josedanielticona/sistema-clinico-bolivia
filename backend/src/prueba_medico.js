const Medico = require('./modelos/Medico');

async function registrarMedicoPrueba() {
    try {
        const medico = await Medico.create({
            nombre: "Dr. Ricardo Villagomez",
            especialidad: "Cardiología",
            licencia: "MS-45678-LP"
        });
        console.log('✅ Médico registrado con éxito:', medico.toJSON());
    } catch (error) {
        console.error('❌ Error al registrar médico:', error);
    }
}

registrarMedicoPrueba();