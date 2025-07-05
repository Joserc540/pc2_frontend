import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('apiKey');
    navigate('/login');
  };
  return (
    <nav style={{ display: 'flex', gap: 16, padding: 16, background: '#f5f5f5' }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/subjects">Materias</Link>
      <Link to="/enrollment">Matrícula</Link>
      <button onClick={handleLogout} style={{ marginLeft: 'auto' }}>Salir</button>
    </nav>
  );
};

export default Navbar;
