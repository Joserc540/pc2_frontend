import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents, getSubjects, createEnrollment, getEnrollmentsBySubject } from '../../api/services';
import { StudentRead, SubjectRead, EnrollmentCreate } from '../../types';

const EnrollmentForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [students, setStudents] = useState<StudentRead[]>([]);
  const [subjects, setSubjects] = useState<SubjectRead[]>([]);
  const [studentId, setStudentId] = useState<number | undefined>();
  const [subjectId, setSubjectId] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [studentEnrollments, setStudentEnrollments] = useState<number[]>([]);
  const [subjectOccupancy, setSubjectOccupancy] = useState<{ [key: number]: number }>({});
  const [subjectMax, setSubjectMax] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Promise.all([getStudents(), getSubjects()])
      .then(([studentsData, subjectsData]) => {
        setStudents(studentsData);
        setSubjects(subjectsData);
        // Guardar max_students por materia
        const max: { [key: number]: number } = {};
        subjectsData.forEach(s => { max[s.id] = s.max_students; });
        setSubjectMax(max);
      })
      .catch(() => setError('Error cargando datos'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (studentId) {
      // Obtener materias en las que ya está inscrito el estudiante
      Promise.all(subjects.map(s => getEnrollmentsBySubject(s.id)))
        .then(results => {
          const enrolledSubjects = results
            .map((enrollments, idx) => enrollments.some(e => e.student_id === studentId) ? subjects[idx].id : null)
            .filter(Boolean) as number[];
          setStudentEnrollments(enrolledSubjects);
        });
    }
  }, [studentId, subjects]);

  useEffect(() => {
    // Obtener ocupación de cada materia
    Promise.all(subjects.map(s => getEnrollmentsBySubject(s.id)))
      .then(results => {
        const occ: { [key: number]: number } = {};
        subjects.forEach((s, idx) => {
          occ[s.id] = results[idx].length;
        });
        setSubjectOccupancy(occ);
      });
  }, [subjects]);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleStudentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStudentId(Number(e.target.value));
    setError(null);
    setSuccess(null);
  };

  const handleSubjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubjectId(Number(e.target.value));
    setError(null);
    setSuccess(null);
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    if (!studentId || !subjectId) {
      setError('Selecciona estudiante y materia');
      setLoading(false);
      return;
    }
    // Validación: máximo 2 materias
    if (studentEnrollments.length >= 2) {
      setError('El estudiante ya está inscrito en el máximo de 2 materias.');
      setLoading(false);
      return;
    }
    // Validación: evitar duplicados
    if (studentEnrollments.includes(subjectId)) {
      setError('El estudiante ya está inscrito en esta materia.');
      setLoading(false);
      return;
    }
    // Validación: cupos disponibles
    const subject = subjects.find(s => s.id === subjectId);
    if (subject && subjectOccupancy[subjectId] >= subject.max_students) {
      setError('No hay cupos disponibles en esta materia.');
      setLoading(false);
      return;
    }
    try {
      const enrollment: EnrollmentCreate = { student_id: studentId, subject_id: subjectId };
      await createEnrollment(enrollment);
      setSuccess('Inscripción exitosa');
      setTimeout(() => navigate('/enrollment/success'), 1000);
    } catch (e) {
      setError('Ocurrió un error al inscribir');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Matrícula</h2>
      {loading && <div className="text-blue-600 text-sm mb-4">Cargando...</div>}
      {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
      {success && <div className="text-green-600 text-sm mb-4">{success}</div>}
      {step === 1 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Selecciona un estudiante:</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={studentId || ''}
            onChange={handleStudentSelect}
          >
            <option value="">-- Selecciona --</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>
            ))}
          </select>
          <button
            className="mt-4 w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded transition"
            onClick={nextStep}
            disabled={!studentId}
          >
            Siguiente
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Selecciona una materia:</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={subjectId || ''}
            onChange={handleSubjectSelect}
          >
            <option value="">-- Selecciona --</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({subjectOccupancy[s.id] || 0}/{subjectMax[s.id]})
              </option>
            ))}
          </select>
          <div className="flex justify-between mt-4">
            <button
              className="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded transition"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded transition"
              onClick={nextStep}
              disabled={!subjectId}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Confirmación</h3>
          <p className="mb-4">
            Está a punto de inscribir a{' '}
            <span className="font-bold">{students.find(s => s.id === studentId)?.first_name} {students.find(s => s.id === studentId)?.last_name}</span>{' '}
            en la materia{' '}
            <span className="font-bold">{subjects.find(s => s.id === subjectId)?.name}</span>.
          </p>
          <div className="flex justify-between">
            <button
              className="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded transition"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition"
              onClick={handleConfirm}
              disabled={loading}
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentForm;
