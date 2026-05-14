import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.post('http://localhost:3000/api/auth/login', {
                username,
                password
            });
            
            // Guardamos el token y el rol en el almacenamiento local del navegador
            localStorage.setItem('token', respuesta.data.token);
            localStorage.setItem('rol', respuesta.data.rol);
            localStorage.setItem('usuario', respuesta.data.username);

            // Redirigimos al dashboard principal
            navigate('/dashboard');
        } catch (err) {
            setError('Credenciales incorrectas o error en el servidor');
        }
    };

    const estilos = {
        contenedor: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000', // Negro puro
            fontFamily: 'Segoe UI, sans-serif'
        },
        tarjeta: {
            backgroundColor: '#1a1a1a',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)', // Brillo dorado sutil
            border: '1px solid #d4af37', // Borde dorado
            width: '350px',
            textAlign: 'center'
        },
        input: {
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            backgroundColor: '#333',
            border: '1px solid #444',
            color: '#fff',
            borderRadius: '5px',
            boxSizing: 'border-box'
        },
        boton: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#d4af37', // Dorado
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '20px',
            transition: '0.3s'
        }
    };

    return (
        <div style={estilos.contenedor}>
            <div style={estilos.tarjeta}>
                <h2 style={{ color: '#d4af37', marginBottom: '20px' }}>🏥 Clínica Bolivia</h2>
                <h4 style={{ color: '#fff' }}>Iniciar Sesión</h4>
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Usuario" 
                        style={estilos.input}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        style={estilos.input}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p style={{ color: '#ff4d4d', fontSize: '12px' }}>{error}</p>}
                    <button type="submit" style={estilos.boton}>INGRESAR</button>
                </form>
            </div>
        </div>
    );
};

export default Login;