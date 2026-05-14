import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './componentes/Login';
import Dashboard from './Dashboard'; // El código que ya tenías, ahora en un archivo separado

function App() {
  return (
    <Router>
      <Routes>
        {/* La primera pantalla siempre será el Login */}
        <Route path="/" element={<Login />} />
        
        {/* Solo se entra aquí tras un login exitoso */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Si escriben cualquier otra cosa, al Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;