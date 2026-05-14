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
    try {
      const resP = await axios.get('http://localhost:3000/api/pacientes');
      const resM = await axios.get('http://localhost:3000/api/medicos');
      const resC = await axios.get('http://localhost:3000/api/citas');
      setPacientes(resP.data);
      setMedicos(resM.data);
      setCitas(resC.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  const agendarCita = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/citas', { pacienteId, medicoId, fecha, motivo });
      alert('✅ Cita Agendada');
      setPacienteId(''); setMedicoId(''); setFecha(''); setMotivo('');
      cargarDatos();
    } catch (error) { alert('Error al agendar'); }
  };

  const estilos = {
    card: { backgroundColor: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '30px' },
    select: { padding: '10px', marginRight: '10px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fff', outline: 'none' },
    input: { padding: '10px', marginRight: '10px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' },
    btnOro: { backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
    contenedorLista: { marginTop: '15px', backgroundColor: '#fafafa', borderRadius: '10px', padding: '5px 15px' },
    itemCita: { padding: '15px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    textoPrincipal: { color: '#333', fontSize: '15px' },
    badgeMotivo: { backgroundColor: '#d4af37', color: '#000', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }
  };

  return (
    <div style={estilos.card}>
      <h2 style={{ marginTop: 0, color: '#333', borderLeft: '5px solid #d4af37', paddingLeft: '15px' }}>
        📅 Gestión de Citas
      </h2>
      
      <form onSubmit={agendarCita} style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <select style={estilos.select} value={pacienteId} onChange={(e) => setPacienteId(e.target.value)} required>
          <option value="">Seleccionar Paciente</option>
          {pacientes.map(p => <option key={p.id_paciente} value={p.id_paciente}>{p.nombre} {p.apellido}</option>)}
        </select>

        <select style={estilos.select} value={medicoId} onChange={(e) => setMedicoId(e.target.value)} required>
          <option value="">Seleccionar Médico</option>
          {medicos.map(m => <option key={m.id_medico} value={m.id_medico}>{m.nombre} {m.apellido}</option>)}
        </select>

        <input style={estilos.input} type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        <input style={estilos.input} type="text" placeholder="Motivo (ej. Consulta, Cirugía)" value={motivo} onChange={(e) => setMotivo(e.target.value)} required />
        
        <button type="submit" style={estilos.btnOro}>Agendar Cita</button>
      </form>

      <h3 style={{ color: '#000', marginTop: '35px', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
        📋 Próximas Citas Programadas
      </h3>

      <div style={estilos.contenedorLista}>
        {citas.length > 0 ? citas.map(c => (
          <div key={c.id_cita} style={estilos.itemCita}>
            <span style={estilos.textoPrincipal}>
              <strong style={{ color: '#000', fontSize: '16px' }}>
                {new Date(c.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </strong>
              <span style={{ margin: '0 12px', color: '#ccc' }}>|</span>
              <span style={{ fontWeight: '600' }}>{c.Paciente?.nombre}</span> con el 
              <span style={{ color: '#b8860b', fontWeight: 'bold' }}> Dr. {c.Medico?.nombre}</span>
            </span>
            <span style={estilos.badgeMotivo}>
              {c.motivo ? c.motivo.toUpperCase() : 'CONSULTA'}
            </span>
          </div>
        )) : (
          <p style={{ padding: '20px', textAlign: 'center', color: '#999' }}>No hay citas agendadas actualmente.</p>
        )}
      </div>
    </div>
  );
}

export default CitaComponent;