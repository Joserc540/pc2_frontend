import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSubjectById } from '../../api/services';
import { SubjectRead } from '../../types';

const SubjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [subject, setSubject] = useState<SubjectRead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getSubjectById(id)
      .then(setSubject)
      .catch(() => setError('Error al cargar la materia'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center text-indigo-600 mt-8">Cargando materia...</p>;
  if (error) return <p className="text-center text-red-600 mt-8">{error}</p>;
  if (!subject) return <p className="text-center text-gray-600 mt-8">No se encontró la materia.</p>;

  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Detalle de Materia</h2>
      <p className="mb-2"><span className="font-semibold">Nombre:</span> {subject.name}</p>
      <p className="mb-2"><span className="font-semibold">Código:</span> {subject.code}</p>
      <p className="mb-2"><span className="font-semibold">Inscritos:</span> {subject.description}</p>
      <p className="mb-2"><span className="font-semibold">Descripción:</span> {subject.location}</p>
    </div>
  );
};

export default SubjectDetails;
