// Estudiantes
export interface StudentCreate {
  first_name: string;
  last_name: string;
  email: string;
  dni: string;
  phone: string;
  birth_date: string; // YYYY-MM-DD
  admission_date: string; // YYYY-MM-DD
}

export interface StudentRead {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  admission_date: string;
  profile_photo_key?: string;
}

export interface StudentProfileRead {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  dni: string;
  phone?: string;
  birth_date: string;
  admission_date: string;
  profile_photo_key?: string;
}

// Profesores
export interface TeacherCreate {
  first_name: string;
  last_name: string;
  email: string;
  hire_date: string; // YYYY-MM-DD
  birth_date: string; // YYYY-MM-DD
  department?: string;
  phone?: string;
  dni?: string;
  profile_photo_key?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
}

export interface TeacherRead extends TeacherCreate {
  id: number;
}

export interface TeacherProfileRead {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  department?: string;
  profile_photo_key?: string;
}

// Materias e Inscripciones
export interface SubjectCreate {
  name: string;
  code: string;
  max_students: number;
  description?: string;
  location?: string;
  teacher_id?: number;
}

export interface SubjectRead {
  id: number;
  name: string;
  code: string;
  description?: string;
  location?: string;
  max_students: number;
}

export interface EnrollmentCreate {
  student_id: number;
  subject_id: number;
}

export interface EnrollmentRead {
  id: number;
  student_id: number;
  subject_id: number;
  enrollment_date: string; // YYYY-MM-DD
}

export interface SubjectOccupancy {
  subject_id: number;
  subject_name: string;
  subject_code: string;
  location?: string;
  max_students: number;
  current_students: number;
  available_spots: number;
  occupancy_percentage: number;
}

// Calificaciones y Ausencias
export interface GradeCreate {
  student_id: number;
  subject_id: number;
  score: number;
  max_score: number;
  comments?: string;
}

export interface GradeRead {
  id: number;
  student_id: number;
  subject_id: number;
  score: number;
  max_score: number;
  comments?: string;
  date: string; // YYYY-MM-DD
}

export interface AbsenceCreate {
  student_id: number;
  subject_id: number;
  date?: string; // YYYY-MM-DD
  reason?: string;
  comment?: string;
}

export interface AbsenceRead {
  id: number;
  student_id: number;
  subject_id: number;
  date: string; // YYYY-MM-DD
  reason?: string;
  comment?: string;
}

export interface AbsenceSummary {
  student_id: number;
  student_name: string;
  total_absences: number;
  absences_by_subject: AbsenceSummaryBySubject[];
}

export interface AbsenceSummaryBySubject {
  subject_id: number;
  subject_name: string;
  subject_code: string;
  total_absences: number;
  absence_dates: string[];
  reasons: string[];
}
