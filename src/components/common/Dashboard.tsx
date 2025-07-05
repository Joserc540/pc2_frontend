import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-12 text-center bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Dashboard</h1>
        <p className="mb-8 text-gray-600">Bienvenido al sistema de matrícula.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
          <button
            onClick={() => navigate('/subjects/new')}
            className="py-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded transition"
          >
            Crear Materia
          </button>
          <button
            onClick={() => navigate('/enrollment')}
            className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition"
          >
            Realizar Inscripción
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
