Aquí tienes una descripción de los esquemas en un formato ideal para un archivo README, especificando los campos, sus tipos y si son requeridos.

***

# 📚 Esquemas de la API

A continuación se detallan todos los esquemas de datos utilizados en la API.

---
## Esquemas de Estudiantes
### `StudentCreate`
Objeto para crear un nuevo perfil de estudiante.
-   `first_name` (string, **requerido**): Nombre del estudiante.
-   `last_name` (string, **requerido**): Apellido del estudiante.
-   `email` (string, **requerido**): Correo electrónico del estudiante.
-   `dni` (string, **requerido**): Documento Nacional de Identidad del estudiante.
-   `phone` (string, **requerido**): Número de teléfono del estudiante.
-   `birth_date` (string, **requerido**): Fecha de nacimiento (`YYYY-MM-DD`).
-   `admission_date` (string, **requerido**): Fecha de admisión (`YYYY-MM-DD`).

### `StudentRead`
Objeto con la información básica de un estudiante.
-   `id` (integer, **requerido**): ID único del estudiante.
-   `first_name` (string, **requerido**): Nombre del estudiante.
-   `last_name` (string, **requerido**): Apellido del estudiante.
-   `birth_date` (string, **requerido**): Fecha de nacimiento (`YYYY-MM-DD`).
-   `admission_date` (string, **requerido**): Fecha de admisión (`YYYY-MM-DD`).
-   `profile_photo_key` (string, *opcional*): Clave de la foto de perfil.

### `StudentProfileRead`
Objeto con el perfil completo de un estudiante.
-   `id` (integer, **requerido**): ID único del estudiante.
-   `first_name` (string, **requerido**): Nombre del estudiante.
-   `last_name` (string, **requerido**): Apellido del estudiante.
-   `email` (string, **requerido**): Correo electrónico del estudiante.
-   `dni` (string, **requerido**): Documento Nacional de Identidad.
-   `phone` (string, *opcional*): Número de teléfono.
-   `birth_date` (string, **requerido**): Fecha de nacimiento (`YYYY-MM-DD`).
-   `admission_date` (string, **requerido**): Fecha de admisión (`YYYY-MM-DD`).
-   `profile_photo_key` (string, *opcional*): Clave de la foto de perfil.

---
## Esquemas de Profesores
### `TeacherCreate`
Objeto para registrar un nuevo profesor.
-   `first_name` (string, **requerido**): Nombre del profesor.
-   `last_name` (string, **requerido**): Apellido del profesor.
-   `email` (string, **requerido**): Correo electrónico del profesor.
-   `hire_date` (string, **requerido**): Fecha de contratación (`YYYY-MM-DD`).
-   `birth_date` (string, **requerido**): Fecha de nacimiento (`YYYY-MM-DD`).
-   `department` (string, *opcional*): Departamento al que pertenece.
-   `phone` (string, *opcional*): Número de teléfono.
-   `dni` (string, *opcional*): Documento Nacional de Identidad.
-   `profile_photo_key` (string, *opcional*): Clave de la foto de perfil.
-   `address` (string, *opcional*): Dirección de residencia.
-   `city` (string, *opcional*): Ciudad de residencia.
-   `postal_code` (string, *opcional*): Código postal.
-   `country` (string, *opcional*): País de residencia.

### `TeacherRead`
Objeto con la información completa de un profesor.
-   Todos los campos de `TeacherCreate` más:
-   `id` (integer, **requerido**): ID único del profesor.

### `TeacherProfileRead`
Objeto con el perfil público de un profesor.
-   `id` (integer, **requerido**): ID único del profesor.
-   `first_name` (string, **requerido**): Nombre del profesor.
-   `last_name` (string, **requerido**): Apellido del profesor.
-   `email` (string, **requerido**): Correo electrónico del profesor.
-   `department` (string, *opcional*): Departamento al que pertenece.
-   `profile_photo_key` (string, *opcional*): Clave de la foto de perfil.

---
## Esquemas de Materias e Inscripciones
### `SubjectCreate`
Objeto para crear una nueva materia.
-   `name` (string, **requerido**): Nombre de la materia.
-   `code` (string, **requerido**): Código único de la materia.
-   `max_students` (integer, **requerido**): Número máximo de estudiantes permitidos.
-   `description` (string, *opcional*): Descripción de la materia.
-   `location` (string, *opcional*): Ubicación donde se imparte la materia.
-   `teacher_id` (integer, *opcional*): ID del profesor asignado.

### `SubjectRead`
Objeto con la información de una materia.
-   `id` (integer, **requerido**): ID único de la materia.
-   `name` (string, **requerido**): Nombre de la materia.
-   `code` (string, **requerido**): Código único de la materia.
-   `description` (string, *opcional*): Descripción de la materia.
-   `location` (string, *opcional*): Ubicación donde se imparte.
-   `max_students` (integer, **requerido**): Capacidad máxima de estudiantes.

### `EnrollmentCreate`
Objeto para inscribir a un estudiante en una materia.
-   `student_id` (integer, **requerido**): ID del estudiante.
-   `subject_id` (integer, **requerido**): ID de la materia.

### `EnrollmentRead`
Objeto que representa una inscripción confirmada.
-   `id` (integer, **requerido**): ID único de la inscripción.
-   `student_id` (integer, **requerido**): ID del estudiante inscrito.
-   `subject_id` (integer, **requerido**): ID de la materia inscrita.
-   `enrollment_date` (string, **requerido**): Fecha de la inscripción (`YYYY-MM-DD`).

### `SubjectOccupancy`
Objeto que muestra la ocupación actual de una materia.
-   `subject_id` (integer, **requerido**): ID de la materia.
-   `subject_name` (string, **requerido**): Nombre de la materia.
-   `subject_code` (string, **requerido**): Código de la materia.
-   `location` (string, *opcional*): Ubicación de la materia.
-   `max_students` (integer, **requerido**): Capacidad máxima.
-   `current_students` (integer, **requerido**): Estudiantes inscritos actualmente.
-   `available_spots` (integer, **requerido**): Cupos disponibles.
-   `occupancy_percentage` (number, **requerido**): Porcentaje de ocupación.

---
## Esquemas de Calificaciones y Ausencias
### `GradeCreate`
Objeto para registrar una nueva calificación.
-   `student_id` (integer, **requerido**): ID del estudiante.
-   `subject_id` (integer, **requerido**): ID de la materia.
-   `score` (number, **requerido**): Calificación obtenida.
-   `max_score` (number, **requerido**): Calificación máxima posible.
-   `comments` (string, *opcional*): Comentarios sobre la calificación.

### `GradeRead`
Objeto que representa una calificación registrada.
-   `id` (integer, **requerido**): ID único de la calificación.
-   `student_id` (integer, **requerido**): ID del estudiante.
-   `subject_id` (integer, **requerido**): ID de la materia.
-   `score` (number, **requerido**): Calificación obtenida.
-   `max_score` (number, **requerido**): Calificación máxima posible.
-   `comments` (string, *opcional*): Comentarios.
-   `date` (string, **requerido**): Fecha de registro de la calificación (`YYYY-MM-DD`).

### `AbsenceCreate`
Objeto para registrar una nueva ausencia.
-   `student_id` (integer, **requerido**): ID del estudiante.
-   `subject_id` (integer, **requerido**): ID de la materia.
-   `date` (string, *opcional*): Fecha de la ausencia (`YYYY-MM-DD`).
-   `reason` (string, *opcional*): Motivo de la ausencia.
-   `comment` (string, *opcional*): Comentario adicional.

### `AbsenceRead`
Objeto que representa una ausencia registrada.
-   `id` (integer, **requerido**): ID único de la ausencia.
-   `student_id` (integer, **requerido**): ID del estudiante.
-   `subject_id` (integer, **requerido**): ID de la materia.
-   `date` (string, **requerido**): Fecha de la ausencia (`YYYY-MM-DD`).
-   `reason` (string, *opcional*): Motivo.
-   `comment` (string, *opcional*): Comentario.

### `AbsenceSummary`
Resumen de ausencias de un estudiante.
-   `student_id` (integer, **requerido**): ID del estudiante.
-   `student_name` (string, **requerido**): Nombre del estudiante.
-   `total_absences` (integer, **requerido**): Número total de ausencias.
-   `absences_by_subject` (array, **requerido**): Lista de ausencias por materia (usa el esquema `AbsenceSummaryBySubject`).

### `AbsenceSummaryBySubject`
Detalle de ausencias para una materia específica.
-   `subject_id` (integer, **requerido**): ID de la materia.
-   `subject_name` (string, **requerido**): Nombre de la materia.
-   `subject_code` (string, **requerido**): Código de la materia.
-   `total_absences` (integer, **requerido**): Total de ausencias en esta materia.
-   `absence_dates` (array de strings, **requerido**): Lista de fechas de las ausencias (`YYYY-MM-DD`).
-   `reasons` (array de strings, **requerido**): Lista de motivos de las ausencias.