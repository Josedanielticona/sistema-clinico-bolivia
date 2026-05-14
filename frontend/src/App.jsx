import { useState, useEffect } from 'react';
import axios from 'axios';
import MedicoComponent from './MedicoComponent';
import CitaComponent from './CitaComponent'; // Importamos el componente de citas

function App() {
  const [ci, setCi] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const cargarPacientes = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/api/pacientes');
      setPacientes(respuesta.data);
    } catch (error) {
      console.error('Error al cargar pacientes:', error);
    }
  };

  useEffect(() => {
    cargarPacientes();
  }, []);

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
      alert('❌ Error al guardar paciente');
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

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sistema Clínica Bolivia</h1>
      
      {/* SECCIÓN PACIENTES */}
      <h2>{editandoId ? 'Editar Paciente' : 'Registro de Pacientes'}</h2>
      <form onSubmit={guardarPaciente} style={{ marginBottom: '30px' }}>
        <input type="text" placeholder="CI" value={ci} onChange={(e) => setCi(e.target.value)} required />
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
        <button type="submit">{editandoId ? 'Actualizar' : 'Guardar'}</button>
        {editandoId && <button type="button" onClick={() => { setEditandoId(null); setCi(''); setNombre(''); setApellido(''); }}>Cancelar</button>}
      </form>

      <h2>Pacientes Registrados</h2>
      <ul>
        {pacientes.map((p) => (
          <li key={p.id_paciente} style={{ marginBottom: '10px' }}>
            {p.nombre} {p.apellido} - CI: {p.ci}
            <button onClick={() => iniciarEdicion(p)} style={{ marginLeft: '10px' }}>Editar</button>
            <button onClick={() => borrarPaciente(p.id_paciente)} style={{ marginLeft: '5px', color: 'red' }}>Borrar</button>
          </li>
        ))}
      </ul>

      <hr style={{ margin: '40px 0', border: '2px solid #333' }} />

      {/* COMPONENTES DE MÉDICOS Y CITAS */}
      <MedicoComponent />
      
      <hr style={{ margin: '40px 0', border: '2px solid #333' }} />
      
      <CitaComponent />
    </div>
  );
}

export default App;