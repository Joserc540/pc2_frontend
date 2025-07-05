import React, { useState, useEffect } from 'react';
import { createSubject, getSubjects } from '../../api/services';
import { SubjectCreate, SubjectRead } from '../../types';

const SubjectForm: React.FC = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [maxStudents, setMaxStudents] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<SubjectRead[]>([]);

  useEffect(() => {
    getSubjects().then(setSubjects).catch(() => setSubjects([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!name || !code || maxStudents <= 0) {
      setError('Todos los campos son obligatorios y el máximo de estudiantes debe ser mayor a 0');
      return;
    }
    if (subjects.some(s => s.code === code)) {
      setError('El código de materia ya existe');
      return;
    }
    setLoading(true);
    try {
      const newSubject: SubjectCreate = { name, code, max_students: maxStudents };
      await createSubject(newSubject);
      setSuccess('Materia creada exitosamente');
      setName('');
      setCode('');
      setMaxStudents(0);
      setSubjects(await getSubjects());
    } catch (e) {
      setError('Error al crear la materia');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (setter: (v: any) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setError('');
    setSuccess('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Crear Materia</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={handleChange(setName)}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <input
        type="text"
        placeholder="Código"
        value={code}
        onChange={handleChange(setCode)}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <input
        type="number"
        placeholder="Máximo de estudiantes"
        value={maxStudents}
        onChange={e => { setMaxStudents(Number(e.target.value)); setError(''); setSuccess(''); }}
        style={{ width: '100%', marginBottom: 8 }}
      />
      {loading && <div style={{ color: 'blue', marginBottom: 8 }}>Creando materia...</div>}
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
      <button type="submit" disabled={loading}>Crear</button>
    </form>
  );
};

export default SubjectForm;
