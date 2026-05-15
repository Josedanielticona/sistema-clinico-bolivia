const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // No puede haber dos usuarios iguales
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        // ACTUALIZADO: Añadimos 'medico' a la lista de permitidos
        type: DataTypes.ENUM('admin', 'funcionario', 'medico'), 
        defaultValue: 'funcionario'
    }
}, {
    tableName: 'usuarios', // Asegura que use el nombre de tabla correcto
    timestamps: false      // Desactiva si no usas createdAt/updatedAt
});

module.exports = Usuario;