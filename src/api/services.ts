import apiClient from './axiosConfig';
import {
  StudentRead,
  SubjectRead,
  SubjectOccupancy,
  EnrollmentRead,
  EnrollmentCreate,
  SubjectCreate
} from '../types';

// Estudiantes
export const getStudents = async (): Promise<StudentRead[]> => {
  const res = await apiClient.get<StudentRead[]>('/students/');
  return res.data;
};

// Materias
export const getSubjects = async (): Promise<SubjectRead[]> => {
  const res = await apiClient.get<SubjectRead[]>('/subjects/');
  return res.data;
};

export const createSubject = async (subject: SubjectCreate): Promise<SubjectRead> => {
  const res = await apiClient.post<SubjectRead>('/subjects/', subject);
  return res.data;
};

export const getSubjectOccupancy = async (): Promise<SubjectOccupancy[]> => {
  const res = await apiClient.get<SubjectOccupancy[]>('/subjects/occupancy/');
  return res.data;
};

export const getSubjectById = async (id: string | number): Promise<SubjectRead> => {
  const res = await apiClient.get<SubjectRead>(`/subjects/${id}/`);
  return res.data;
};

// Inscripciones
export const getEnrollmentsBySubject = async (subjectId: number): Promise<EnrollmentRead[]> => {
  const res = await apiClient.get<EnrollmentRead[]>(`/enrollments/?subject_id=${subjectId}`);
  return res.data;
};

export const checkEnrollmentAvailability = async (studentId: number, subjectId: number): Promise<{ available: boolean; reason?: string }> => {
  const res = await apiClient.get<{ available: boolean; reason?: string }>(`/enrollments/check_availability/?student_id=${studentId}&subject_id=${subjectId}`);
  return res.data;
};

export const createEnrollment = async (enrollment: EnrollmentCreate): Promise<EnrollmentRead> => {
  const res = await apiClient.post<EnrollmentRead>('/enrollments/', enrollment);
  return res.data;
};
