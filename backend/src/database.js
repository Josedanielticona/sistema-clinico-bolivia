const { Sequelize } = require('sequelize');

// Conexión a la base de datos de tu clínica
const sequelize = new Sequelize('clinica_bolivia', 'postgres', 'jose123', {
  host: 'db',
  dialect: 'postgres',
  logging: false, 
});

// Función para probar si el backend "habla" con la base de datos
async function probarConexion() {
  try {
    await sequelize.authenticate();
    console.log('✅ ¡Conexión exitosa! El sistema ya está unido a PostgreSQL.');
    
    // ESTA LÍNEA ES LA QUE CREA LAS TABLAS:
    await sequelize.sync({ alter: true }); 
    console.log('📂 Tablas sincronizadas correctamente.');

  } catch (error) {
    console.error('❌ Error de conexión:', error);
  }
}

probarConexion();

module.exports = sequelize;