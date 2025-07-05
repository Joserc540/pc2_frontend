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
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h2>Matrícula (Multi-paso)</h2>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div>
        {step === 1 && (
          <div>
            <p>Paso 1: Selecciona un estudiante</p>
            <select value={studentId ?? ''} onChange={handleStudentSelect} style={{ width: '100%', marginBottom: 8 }}>
              <option value="">Selecciona...</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>
              ))}
            </select>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button disabled>Anterior</button>
              <button disabled={!studentId} onClick={nextStep}>Siguiente</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <p>Paso 2: Selecciona una materia</p>
            <select value={subjectId ?? ''} onChange={handleSubjectSelect} style={{ width: '100%', marginBottom: 8 }}>
              <option value="">Selecciona...</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id} disabled={subjectOccupancy[s.id] >= subjectMax[s.id] || studentEnrollments.includes(s.id)}>
                  {s.name} ({subjectOccupancy[s.id] || 0}/{subjectMax[s.id]})
                </option>
              ))}
            </select>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={prevStep}>Anterior</button>
              <button disabled={!subjectId} onClick={nextStep}>Siguiente</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <p>Paso 3: Confirmar inscripción</p>
            <ul style={{ textAlign: 'left' }}>
              <li><b>Estudiante:</b> {students.find(s => s.id === studentId)?.first_name} {students.find(s => s.id === studentId)?.last_name}</li>
              <li><b>Materia:</b> {subjects.find(s => s.id === subjectId)?.name}</li>
            </ul>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={prevStep}>Anterior</button>
              <button onClick={handleConfirm}>Confirmar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollmentForm;
