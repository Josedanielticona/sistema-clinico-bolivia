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
    } catch (error) { console.error(error); }
  };

  useEffect(() => { cargarMedicos(); }, []);

  const guardarMedico = async (e) => {
    e.preventDefault();
    const datos = { nombre, apellido, especialidad, nro_matricula };
    try {
      if (editandoId) {
        await axios.put(`http://localhost:3000/api/medicos/${editandoId}`, datos);
      } else {
        await axios.post('http://localhost:3000/api/medicos', datos);
      }
      setNombre(''); setApellido(''); setEspecialidad(''); setNroMatricula('');
      setEditandoId(null);
      cargarMedicos();
    } catch (error) { alert('Error al guardar médico'); }
  };

  const estilos = {
    card: { backgroundColor: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '30px' },
    input: { padding: '10px', marginRight: '10px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', marginBottom: '10px' },
    btnOro: { backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
    tabla: { width: '100%', borderCollapse: 'collapse', marginTop: '15px' },
    td: { padding: '12px', borderBottom: '1px solid #eee', color: '#333' }
  };

  return (
    <div style={estilos.card}>
      <h2 style={{ marginTop: 0, color: '#333', borderLeft: '5px solid #d4af37', paddingLeft: '15px' }}>
        👨‍⚕️ Gestión de Médicos
      </h2>
      <form onSubmit={guardarMedico} style={{ marginTop: '20px' }}>
        <input style={estilos.input} type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input style={estilos.input} type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
        <input style={estilos.input} type="text" placeholder="Especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required />
        <input style={estilos.input} type="text" placeholder="Nro Matrícula" value={nro_matricula} onChange={(e) => setNroMatricula(e.target.value)} required />
        <button type="submit" style={estilos.btnOro}>{editandoId ? 'Actualizar' : 'Guardar Médico'}</button>
      </form>

      <table style={estilos.tabla}>
        <thead>
          <tr style={{ textAlign: 'left', color: '#555' }}>
            <th style={{ padding: '12px' }}>Nombre</th>
            <th style={{ padding: '12px' }}>Especialidad</th>
            <th style={{ padding: '12px' }}>Matrícula</th>
          </tr>
        </thead>
        <tbody>
          {medicos.map((m) => (
            <tr key={m.id_medico}>
              <td style={estilos.td}>{m.nombre} {m.apellido}</td>
              <td style={estilos.td}>{m.especialidad}</td>
              <td style={estilos.td}>{m.nro_matricula}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicoComponent;