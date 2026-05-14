import { useState, useEffect } from 'react';
import axios from 'axios';
import MedicoComponent from './MedicoComponent';
import CitaComponent from './CitaComponent';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [ci, setCi] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  
  const navigate = useNavigate();
  // Recuperamos el rol y nombre del usuario logueado
  const rol = localStorage.getItem('rol');
  const usuarioActivo = localStorage.getItem('usuario');

  const cargarPacientes = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/api/pacientes');
      setPacientes(respuesta.data);
    } catch (error) { console.error('Error:', error); }
  };

  useEffect(() => {
    // Si alguien intenta entrar al dashboard sin token, lo sacamos
    if (!localStorage.getItem('token')) {
        navigate('/');
    }
    cargarPacientes();
  }, []);

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/');
  };

  // ... (Tus funciones guardarPaciente, iniciarEdicion y borrarPaciente se quedan igual)

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Sistema Clínica Bolivia</h1>
        <div style={{ textAlign: 'right' }}>
            <p>Bienvenido: <strong>{usuarioActivo}</strong> ({rol})</p>
            <button onClick={cerrarSesion} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Cerrar Sesión</button>
        </div>
      </div>
      
      {/* SECCIÓN PACIENTES */}
      <h2>{editandoId ? 'Editar Paciente' : 'Registro de Pacientes'}</h2>
      <form onSubmit={guardarPaciente} style={{ marginBottom: '30px' }}>
        <input type="text" placeholder="CI" value={ci} onChange={(e) => setCi(e.target.value)} required />
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
        <button type="submit">{editandoId ? 'Actualizar' : 'Guardar'}</button>
      </form>

      <h2>Pacientes Registrados</h2>
      <ul>
        {pacientes.map((p) => (
          <li key={p.id_paciente} style={{ marginBottom: '10px' }}>
            {p.nombre} {p.apellido} - CI: {p.ci}
            <button onClick={() => iniciarEdicion(p)} style={{ marginLeft: '10px' }}>Editar</button>
            
            {/* 🛡️ PROTECCIÓN POR ROL: Solo el admin ve el botón borrar */}
            {rol === 'admin' && (
                <button onClick={() => borrarPaciente(p.id_paciente)} style={{ marginLeft: '5px', color: 'red' }}>Borrar</button>
            )}
          </li>
        ))}
      </ul>

      <hr style={{ margin: '40px 0', border: '2px solid #333' }} />
      <MedicoComponent />
      <hr style={{ margin: '40px 0', border: '2px solid #333' }} />
      <CitaComponent />
    </div>
  );
}

export default Dashboard;