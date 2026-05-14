const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Cita = sequelize.define('Cita', {
    id_cita: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    fecha: { type: DataTypes.DATE, allowNull: false },
    motivo: { type: DataTypes.TEXT },
    estado: { type: DataTypes.STRING, defaultValue: 'Pendiente' },
    
    // --- AQUÍ ESTABA EL PROBLEMA ---
    // Agregamos explícitamente los campos para las llaves foráneas
    pacienteId: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    medicoId: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }
});

module.exports = Cita;