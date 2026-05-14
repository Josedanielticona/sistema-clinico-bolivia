const Usuario = require('../modelos/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Función para REGISTRAR nuevos usuarios
exports.registrar = async (req, res) => {
    try {
        const { username, password, rol } = req.body;
        
        // Encriptamos la contraseña (10 niveles de seguridad)
        const passwordHash = await bcrypt.hash(password, 10);
        
        const nuevoUsuario = await Usuario.create({
            username,
            password: passwordHash,
            rol
        });
        
        res.status(201).json({ mensaje: 'Usuario creado con éxito', usuario: nuevoUsuario.username });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

// Función para LOGIN
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Buscamos si el usuario existe
        const usuario = await Usuario.findOne({ where: { username } });
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        
        // Comparamos la contraseña enviada con la de la BD
        const esValida = await bcrypt.compare(password, usuario.password);
        if (!esValida) return res.status(401).json({ error: 'Contraseña incorrecta' });
        
        // Si todo está bien, creamos el TOKEN (la llave digital)
        const token = jwt.sign(
            { id: usuario.id_usuario, rol: usuario.rol }, 
            'CLAVE_SECRETA_SUPER_SEGURA', // En producción esto va en .env
            { expiresIn: '8h' }
        );
        
        res.json({ token, rol: usuario.rol, username: usuario.username });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};