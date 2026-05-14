const express = require('express');
const cors = require('cors');
const sequelize = require('./database');

// IMPORTACIÓN DE MODELOS
const Paciente = require('./modelos/Paciente');
const Medico = require('./modelos/Medico');
const Cita = require('./modelos/Cita');
const Usuario = require('./modelos/Usuario'); // <-- NUEVO MODELO PARA EL LOGIN

// --- CONFIGURACIÓN DE RELACIONES ---
// Relaciones existentes
Paciente.hasMany(Cita, { foreignKey: 'pacienteId' });
Cita.belongsTo(Paciente, { foreignKey: 'pacienteId' });

Medico.hasMany(Cita, { foreignKey: 'medicoId' });
Cita.belongsTo(Medico, { foreignKey: 'medicoId' });

// Nota: No necesitamos relacionar Usuario con los demás por ahora, 
// ya que el usuario es quien opera el sistema.
// ------------------------------------

// IMPORTACIÓN DE RUTAS
const pacienteRutas = require('./rutas/pacienteRutas');
const medicoRutas = require('./rutas/medicoRutas');
const citaRutas = require('./rutas/citaRutas');
const authRutas = require('./rutas/authRutas'); // <-- NUEVAS RUTAS DE AUTENTICACIÓN

const app = express();

// Configuración básica
app.use(cors());
app.use(express.json());

// CONEXIÓN DE RUTAS
app.use('/api/pacientes', pacienteRutas);
app.use('/api/medicos', medicoRutas);
app.use('/api/citas', citaRutas);
app.use('/api/auth', authRutas); // <-- ACTIVACIÓN DE RUTAS PARA LOGIN/REGISTRO

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('🏥 Servidor de la Clínica Bolivia funcionando correctamente con Seguridad JWT');
});

// FUNCIÓN DE INICIO
async function iniciarProyecto() {
    try {
        // Autenticar conexión
        await sequelize.authenticate();
        console.log('✅ Conexión a PostgreSQL exitosa.');

        // Sincronizar tablas (incluyendo la nueva tabla Usuarios)
        await sequelize.sync({ alter: true });
        console.log('📂 Todas las tablas (Pacientes, Médicos, Citas, Usuarios) sincronizadas.');

        // Encender el servidor
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ ERROR AL INICIAR:', error.message);
    }
}

iniciarProyecto();