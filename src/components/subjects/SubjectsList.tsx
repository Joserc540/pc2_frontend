import React, { useEffect, useState } from 'react';
import { getSubjects } from '../../api/services';
import { useNavigate } from 'react-router-dom';
import { SubjectRead } from '../../types';

const SubjectsList: React.FC = () => {
  const [subjects, setSubjects] = useState<SubjectRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getSubjects()
      .then(setSubjects)
      .catch(() => setError('Error al cargar las materias'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-indigo-600 mt-8">Cargando materias...</p>;
  if (error) return <p className="text-center text-red-600 mt-8">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Lista de Materias</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded">
          <thead>
            <tr className="bg-indigo-100">
              <th className="py-2 px-4 text-left">Nombre</th>
              <th className="py-2 px-4 text-left">Código</th>
              <th className="py-2 px-4 text-left">Cupo</th>
              <th className="py-2 px-4 text-left">Inscritos</th>
              <th className="py-2 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map(subject => (
              <tr key={subject.id} className="border-b hover:bg-indigo-50">
                <td className="py-2 px-4">{subject.name}</td>
                <td className="py-2 px-4">{subject.code}</td>
                <td className="py-2 px-4">{subject.description}</td>
                <td className="py-2 px-4">{subject.location}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => navigate(`/subjects/${subject.id}`)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded transition"
                  >
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectsList;
