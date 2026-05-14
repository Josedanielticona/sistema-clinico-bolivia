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
  const rol = localStorage.getItem('rol');
  const usuarioActivo = localStorage.getItem('usuario');

  const cargarPacientes = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/api/pacientes');
      setPacientes(respuesta.data);
    } catch (error) { console.error('Error al cargar pacientes:', error); }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
        navigate('/');
    }
    cargarPacientes();
  }, []);

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/');
  };

  const guardarPaciente = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await axios.put(`http://localhost:3000/api/pacientes/${editandoId}`, { ci, nombre, apellido });
        alert('✅ Paciente actualizado');
        setEditandoId(null);
      } else {
        await axios.post('http://localhost:3000/api/pacientes', { ci, nombre, apellido });
        alert('✅ Paciente registrado');
      }
      setCi(''); setNombre(''); setApellido('');
      cargarPacientes();
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error al guardar');
    }
  };

  const iniciarEdicion = (paciente) => {
    setEditandoId(paciente.id_paciente);
    setCi(paciente.ci);
    setNombre(paciente.nombre);
    setApellido(paciente.apellido);
  };

  const borrarPaciente = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar a este paciente?")) {
      try {
        await axios.delete(`http://localhost:3000/api/pacientes/${id}`);
        cargarPacientes();
      } catch (error) {
        alert('Error al eliminar');
      }
    }
  };

  // --- ESTILOS REUTILIZABLES ---
  const estilos = {
    contenedor: { padding: '30px', backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#000', color: '#d4af37', padding: '15px 30px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', marginBottom: '30px' },
    card: { backgroundColor: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '30px' },
    input: { padding: '10px 15px', marginRight: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' },
    btnOro: { backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' },
    btnCerrar: { backgroundColor: 'transparent', color: '#d4af37', border: '1px solid #d4af37', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
    tabla: { width: '100%', borderCollapse: 'collapse', marginTop: '15px' },
    th: { textAlign: 'left', borderBottom: '2px solid #eee', padding: '12px', color: '#555' },
    td: { padding: '12px', borderBottom: '1px solid #eee', color: '#333' },
    btnAccion: { padding: '6px 12px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', marginRight: '5px' }
  };

  return (
    <div style={estilos.contenedor}>
      {/* HEADER */}
      <div style={estilos.header}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>🏥 Clínica Bolivia</h1>
        <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: '14px' }}>Usuario: <span style={{color:'#fff'}}>{usuarioActivo}</span> ({rol})</p>
            <button onClick={cerrarSesion} style={estilos.btnCerrar}>Cerrar Sesión</button>
        </div>
      </div>
      
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* FORMULARIO */}
        <div style={estilos.card}>
          <h2 style={{ marginTop: 0, color: '#333', borderLeft: '5px solid #d4af37', paddingLeft: '15px' }}>
            {editandoId ? '📝 Editar Paciente' : '👤 Registro de Pacientes'}
          </h2>
          <form onSubmit={guardarPaciente} style={{ marginTop: '20px' }}>
            <input type="text" placeholder="C.I." value={ci} onChange={(e) => setCi(e.target.value)} style={estilos.input} required />
            <input type="text" placeholder="Nombres" value={nombre} onChange={(e) => setNombre(e.target.value)} style={estilos.input} required />
            <input type="text" placeholder="Apellidos" value={apellido} onChange={(e) => setApellido(e.target.value)} style={estilos.input} required />
            <button type="submit" style={estilos.btnOro}>{editandoId ? 'Actualizar' : 'Guardar Datos'}</button>
          </form>
        </div>

        {/* TABLA DE PACIENTES */}
        <div style={estilos.card}>
          <h2 style={{ marginTop: 0, color: '#333' }}>📋 Pacientes Registrados</h2>
          <table style={estilos.tabla}>
            <thead>
              <tr>
                <th style={estilos.th}>C.I.</th>
                <th style={estilos.th}>Nombre Completo</th>
                <th style={estilos.th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((p) => (
                <tr key={p.id_paciente}>
                  <td style={estilos.td}>{p.ci}</td>
                  <td style={estilos.td}>{p.nombre} {p.apellido}</td>
                  <td style={estilos.td}>
                    <button onClick={() => iniciarEdicion(p)} style={{ ...estilos.btnAccion, backgroundColor: '#e2e2e2' }}>Editar</button>
                    {rol === 'admin' && (
                        <button onClick={() => borrarPaciente(p.id_paciente)} style={{ ...estilos.btnAccion, backgroundColor: '#ff4d4d', color: '#fff' }}>Borrar</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr style={{ margin: '40px 0', border: '0', borderTop: '2px solid #ddd' }} />
        
        {/* OTROS COMPONENTES */}
        <div style={{opacity: '0.9'}}><MedicoComponent /></div>
        <hr style={{ margin: '40px 0', border: '0', borderTop: '2px solid #ddd' }} />
        <div style={{opacity: '0.9'}}><CitaComponent /></div>
      </div>
    </div>
  );
}

export default Dashboard;