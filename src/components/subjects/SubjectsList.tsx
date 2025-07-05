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

  if (loading) return <p>Cargando materias...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Materias</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Código</th>
            <th>Cupo</th>
            <th>Inscritos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(subject => (
            <tr key={subject.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td>{subject.name}</td>
              <td>{subject.code}</td>
              <td>{subject.description}</td>
              <td>{subject.location}</td>
              <td>
                <button onClick={() => navigate(`/subjects/${subject.id}`)}>Ver Detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectsList;
