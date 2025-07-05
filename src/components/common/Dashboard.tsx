import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
        <h1>Dashboard</h1>
        <p>Bienvenido al sistema de matrícula.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 32 }}>
          <button onClick={() => navigate('/subjects/new')}>Crear Materia</button>
          <button onClick={() => navigate('/enrollment')}>Realizar Inscripción</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
