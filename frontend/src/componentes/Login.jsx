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
        setError('');
        try {
            const respuesta = await axios.post('http://localhost:3000/api/auth/login', {
                username,
                password
            });
            
            localStorage.setItem('token', respuesta.data.token);
            localStorage.setItem('rol', respuesta.data.rol);
            localStorage.setItem('usuario', respuesta.data.username);

            navigate('/dashboard');
        } catch (err) {
            setError('❌ Usuario o contraseña incorrectos');
        }
    };

    const estilos = {
        contenedor: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f2f5', // El mismo gris claro del Dashboard
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        tarjeta: {
            backgroundColor: '#ffffff', // Tarjeta blanca
            padding: '50px 40px',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', // Sombra suave
            borderTop: '6px solid #d4af37', // Detalle dorado arriba
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center'
        },
        titulo: {
            color: '#1a1a1a',
            fontSize: '26px',
            margin: '10px 0 5px 0',
            fontWeight: 'bold',
        },
        subtitulo: {
            color: '#d4af37',
            fontSize: '14px',
            marginBottom: '35px',
            fontWeight: '600',
            letterSpacing: '1px'
        },
        input: {
            width: '100%',
            padding: '12px 15px',
            margin: '10px 0',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            color: '#333',
            borderRadius: '8px',
            boxSizing: 'border-box',
            fontSize: '15px',
            outline: 'none',
        },
        boton: {
            width: '100%',
            padding: '14px',
            backgroundColor: '#d4af37',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '15px',
            cursor: 'pointer',
            marginTop: '20px',
            transition: '0.3s',
            boxShadow: '0 4px 10px rgba(212, 175, 55, 0.2)'
        },
        error: {
            color: '#ff4d4d',
            fontSize: '13px',
            marginTop: '15px'
        }
    };

    return (
        <div style={estilos.contenedor}>
            <div style={estilos.tarjeta}>
                <span style={{fontSize: '50px'}}>🏥</span>
                <h1 style={estilos.titulo}>CLÍNICA BOLIVIA</h1>
                <p style={estilos.subtitulo}>PANEL DE CONTROL</p>
                
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
                    
                    {error && <p style={estilos.error}>{error}</p>}
                    
                    <button 
                        type="submit" 
                        style={estilos.boton}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#b8860b'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#d4af37'}
                    >
                        INGRESAR
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;