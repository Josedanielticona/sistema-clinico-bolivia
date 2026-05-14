const express = require('express');
const cors = require('cors');
const sequelize = require('./database');

// IMPORTACIÓN DE MODELOS
const Paciente = require('./modelos/Paciente');
const Medico = require('./modelos/Medico');
const Cita = require('./modelos/Cita');

// --- CONFIGURACIÓN DE RELACIONES ---
// Un Paciente tiene muchas Citas, una Cita pertenece a un Paciente
Paciente.hasMany(Cita, { foreignKey: 'pacienteId' });
Cita.belongsTo(Paciente, { foreignKey: 'pacienteId' });

// Un Médico tiene muchas Citas, una Cita pertenece a un Médico
Medico.hasMany(Cita, { foreignKey: 'medicoId' });
Cita.belongsTo(Medico, { foreignKey: 'medicoId' });
// ------------------------------------

// IMPORTACIÓN DE RUTAS
const pacienteRutas = require('./rutas/pacienteRutas');
const medicoRutas = require('./rutas/medicoRutas');
const citaRutas = require('./rutas/citaRutas');

const app = express();

// Configuración básica
app.use(cors());
app.use(express.json());

// CONEXIÓN DE RUTAS
app.use('/api/pacientes', pacienteRutas);
app.use('/api/medicos', medicoRutas);
app.use('/api/citas', citaRutas);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('🏥 Servidor de la Clínica Bolivia funcionando correctamente');
});

// FUNCIÓN DE INICIO
async function iniciarProyecto() {
    try {
        // Autenticar conexión
        await sequelize.authenticate();
        console.log('✅ Conexión a PostgreSQL exitosa.');

        // Sincronizar tablas y aplicar relaciones (creará las columnas pacienteId y medicoId)
        await sequelize.sync({ alter: true });
        console.log('📂 Todas las tablas (Pacientes, Médicos, Citas) y sus relaciones han sido sincronizadas.');

        // Encender el servidor
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ ERROR DETALLADO:', error.name);
        console.error('❌ MENSAJE:', error.message);
        console.error('❌ DETALLE TECNICO:', error);
    }
}

iniciarProyecto();