const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Medico = sequelize.define('Medico', {
    id_medico: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    especialidad: { type: DataTypes.STRING, allowNull: false },
    nro_matricula: { type: DataTypes.STRING, unique: true, allowNull: false }
}, {
    tableName: 'medicos',
    timestamps: false
});

module.exports = Medico;