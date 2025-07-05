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

  if (loading) return <p>Cargando materia...</p>;
  if (error) return <p>{error}</p>;
  if (!subject) return <p>No se encontró la materia.</p>;

  return (
    <div>
      <h2>Detalle de Materia</h2>
      <p><strong>Nombre:</strong> {subject.name}</p>
      <p><strong>Código:</strong> {subject.code}</p>
      <p><strong>Inscritos:</strong> {subject.description}</p>
      <p><strong>Descripción:</strong> {subject.location}</p>
    </div>
  );
};

export default SubjectDetails;
