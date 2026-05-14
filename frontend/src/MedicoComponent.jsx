import { useState, useEffect } from 'react';
import axios from 'axios';

function MedicoComponent() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [nro_matricula, setNroMatricula] = useState('');
  
  const [medicos, setMedicos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const cargarMedicos = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/api/medicos');
      setMedicos(respuesta.data);
    } catch (error) {
      console.error('Error al cargar médicos:', error);
    }
  };

  useEffect(() => {
    cargarMedicos();
  }, []);

  const guardarMedico = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await axios.put(`http://localhost:3000/api/medicos/${editandoId}`, { nombre, apellido, especialidad, nro_matricula });
        alert('✅ Médico actualizado');
        setEditandoId(null);
      } else {
        await axios.post('http://localhost:3000/api/medicos', { nombre, apellido, especialidad, nro_matricula });
        alert('✅ Médico registrado');
      }
      setNombre(''); setApellido(''); setEspecialidad(''); setNroMatricula('');
      cargarMedicos();
    } catch (error) {
      alert('❌ Error al guardar médico');
    }
  };

  const iniciarEdicion = (m) => {
    setEditandoId(m.id_medico);
    setNombre(m.nombre);
    setApellido(m.apellido);
    setEspecialidad(m.especialidad);
    setNroMatricula(m.nro_matricula);
  };

  const borrarMedico = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar a este médico?")) {
      await axios.delete(`http://localhost:3000/api/medicos/${id}`);
      cargarMedicos();
    }
  };

  return (
    <div style={{ border: '2px solid #333', padding: '20px', marginTop: '30px', borderRadius: '10px' }}>
      <h2>Gestión de Médicos</h2>
      <form onSubmit={guardarMedico} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
        <input type="text" placeholder="Especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required />
        <input type="text" placeholder="Nro Matrícula" value={nro_matricula} onChange={(e) => setNroMatricula(e.target.value)} required />
        <button type="submit">{editandoId ? 'Actualizar' : 'Guardar Médico'}</button>
      </form>

      <h3>Lista de Médicos</h3>
      <ul>
        {medicos.map((m) => (
          <li key={m.id_medico} style={{ marginBottom: '8px' }}>
            {m.nombre} {m.apellido} - **{m.especialidad}** (Mat: {m.nro_matricula})
            <button onClick={() => iniciarEdicion(m)} style={{ marginLeft: '10px' }}>Editar</button>
            <button onClick={() => borrarMedico(m.id_medico)} style={{ marginLeft: '5px', color: 'red' }}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedicoComponent;