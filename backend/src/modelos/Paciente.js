const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importamos la conexión que probamos ayer

const Paciente = sequelize.define('Paciente', {
    // Definimos las columnas tal cual están en la base de datos
    id_paciente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ci: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY
    },
    genero: {
        type: DataTypes.CHAR(1)
    },
    telefono: {
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'pacientes', // Nombre exacto de la tabla en Postgres
    timestamps: false       // Para que no busque las columnas createdAt/updatedAt
});

module.exports = Paciente;