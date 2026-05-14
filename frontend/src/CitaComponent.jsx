import { useState, useEffect } from 'react';
import axios from 'axios';

function CitaComponent() {
  const [pacienteId, setPacienteId] = useState('');
  const [medicoId, setMedicoId] = useState('');
  const [fecha, setFecha] = useState('');
  const [motivo, setMotivo] = useState('');
  
  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);

  const cargarDatos = async () => {
    // 1. Cargamos Pacientes (Independiente)
    try {
      const res = await axios.get('http://localhost:3000/api/pacientes');
      setPacientes(res.data);
    } catch (error) { console.error('Error cargando pacientes:', error); }

    // 2. Cargamos Médicos (Independiente)
    try {
      const res = await axios.get('http://localhost:3000/api/medicos');
      setMedicos(res.data);
    } catch (error) { console.error('Error cargando médicos:', error); }

    // 3. Cargamos Citas (Independiente)
    try {
      const res = await axios.get('http://localhost:3000/api/citas');
      setCitas(res.data);
    } catch (error) { console.error('Error cargando citas:', error); }
  };

  useEffect(() => { cargarDatos(); }, []);

  const agendarCita = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/citas', { pacienteId, medicoId, fecha, motivo });
      alert('✅ Cita agendada exitosamente');
      setPacienteId(''); setMedicoId(''); setFecha(''); setMotivo('');
      cargarDatos();
    } catch (error) { 
      console.error(error);
      alert('❌ Error al agendar: Revisa que el backend esté corriendo'); 
    }
  };

  return (
    <div className="card-pro" style={{ marginTop: '30px' }}>
      <h2 style={{ color: '#D4AF37' }}>Gestión de Citas</h2>
      <form onSubmit={agendarCita} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <select value={pacienteId} onChange={(e) => setPacienteId(e.target.value)} required>
          <option value="">Seleccionar Paciente</option>
          {pacientes.map(p => <option key={p.id_paciente} value={p.id_paciente}>{p.nombre} {p.apellido}</option>)}
        </select>

        <select value={medicoId} onChange={(e) => setMedicoId(e.target.value)} required>
          <option value="">Seleccionar Médico</option>
          {medicos.map(m => <option key={m.id_medico} value={m.id_medico}>{m.nombre} {m.apellido}</option>)}
        </select>

        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        <input type="text" placeholder="Motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
        <button type="submit">Agendar Cita</button>
      </form>

      <h3 style={{ color: '#D4AF37' }}>Citas Programadas</h3>
      <ul>
        {citas.map(c => (
          <li key={c.id_cita} style={{ marginBottom: '8px' }}>
            <strong>{c.fecha}</strong> - {c.Paciente?.nombre} con Dr. {c.Medico?.apellido}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CitaComponent;