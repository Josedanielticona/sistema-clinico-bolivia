const Usuario = require('../modelos/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Función para REGISTRAR nuevos usuarios
exports.registrar = async (req, res) => {
    try {
        const { username, password, rol } = req.body;

        // Validación básica
        if (!username || !password) {
            return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
        }
        
        // Encriptamos la contraseña
        const passwordHash = await bcrypt.hash(password, 10);
        
        // Intentamos crear el usuario en la BD
        const nuevoUsuario = await Usuario.create({
            username,
            password: passwordHash,
            rol: rol || 'funcionario' // Si no envías rol, por defecto es funcionario
        });
        
        console.log(`✅ Usuario ${username} registrado con rol: ${nuevoUsuario.rol}`);
        
        res.status(201).json({ 
            mensaje: 'Usuario creado con éxito', 
            usuario: nuevoUsuario.username,
            rol: nuevoUsuario.rol 
        });

    } catch (error) {
        // ESTO ES CLAVE: Ver el error real en la terminal de VS Code
        console.error("❌ ERROR AL REGISTRAR:", error.message);
        
        // Si el error es porque el usuario ya existe
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'El nombre de usuario ya existe' });
        }

        res.status(500).json({ 
            error: 'Error al registrar usuario',
            detalle: error.message // Te enviará el error real a Thunder Client
        });
    }
};

// Función para LOGIN
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const usuario = await Usuario.findOne({ where: { username } });
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        
        const esValida = await bcrypt.compare(password, usuario.password);
        if (!esValida) return res.status(401).json({ error: 'Contraseña incorrecta' });
        
        const token = jwt.sign(
            { id: usuario.id_usuario, rol: usuario.rol }, 
            'CLAVE_SECRETA_SUPER_SEGURA', 
            { expiresIn: '8h' }
        );
        
        console.log(`🔑 Login exitoso: ${username} (${usuario.rol})`);
        
        res.json({ token, rol: usuario.rol, username: usuario.username });
    } catch (error) {
        console.error("❌ ERROR EN LOGIN:", error.message);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};