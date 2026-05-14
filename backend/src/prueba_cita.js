const Cita = require('./modelos/Cita');

async function registrarCitaPrueba() {
    try {
        const cita = await Cita.create({
            fecha: new Date(), // Pone la fecha de hoy automáticamente
            motivo: "Consulta general de control",
            estado: "Pendiente"
        });
        console.log('✅ Cita programada con éxito:', cita.toJSON());
    } catch (error) {
        console.error('❌ Error al programar cita:', error);
    }
}

registrarCitaPrueba();