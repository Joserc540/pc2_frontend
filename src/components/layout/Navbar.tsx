import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('apiKey');
    navigate('/login');
  };
  return (
    <nav className="flex items-center gap-6 px-6 py-4 bg-indigo-600 shadow text-white">
      <Link to="/dashboard" className="font-bold hover:underline">Dashboard</Link>
      <Link to="/subjects" className="hover:underline">Materias</Link>
      <Link to="/enrollment" className="hover:underline">Matrícula</Link>
      <button
        onClick={handleLogout}
        className="ml-auto bg-red-500 hover:bg-red-600 px-4 py-1 rounded font-semibold transition"
      >
        Salir
      </button>
    </nav>
  );
};

export default Navbar;
