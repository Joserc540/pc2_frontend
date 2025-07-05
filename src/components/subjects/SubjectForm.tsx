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
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto mt-8 space-y-4"
    >
      <h2 className="text-xl font-bold text-indigo-700 mb-4">Crear Materia</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={handleChange(setName)}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <input
        type="text"
        placeholder="Código"
        value={code}
        onChange={handleChange(setCode)}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <input
        type="number"
        placeholder="Máximo de estudiantes"
        value={maxStudents}
        onChange={e => { setMaxStudents(Number(e.target.value)); setError(''); setSuccess(''); }}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      {loading && <div className="text-blue-600 text-sm">Creando materia...</div>}
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded transition"
      >
        Crear
      </button>
    </form>
  );
};

export default SubjectForm;
