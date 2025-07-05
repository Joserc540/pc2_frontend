Requisitos Técnicos
Implementar la aplicación usando React con componentes funcionales
Crear componentes reutilizables para elementos comunes (tarjetas, tablas, etc.)
Implementar sistema de rutas con React Router
Manejar estados con hooks de React (useState, useEffect, useContext)
Consumir la API proporcionada usando fetch o axios
Validar formularios antes de enviar datos
IMPORTANTE: Implementar protección de rutas para que no se pueda acceder sin API key válida

Estructura de Componentes
Deberá crear al menos los siguientes componentes:

Login: Formulario para ingreso de API key
Navbar: Barra de navegación con opciones
Dashboard: Vista principal con estadísticas
SubjectsList: Lista de materias con información de ocupación
SubjectForm: Formulario para crear nuevas materias
SubjectDetails: Vista detallada de una materia
EnrollmentForm: Formulario de matrícula (multi-paso)
EnrollmentConfirmation: Confirmación de matrícula
ProtectedRoute: Componente HOC para proteger rutas
Sistema de Rutas
Implementar las siguientes rutas con React Router:

/login - Página de autenticación
/dashboard - Dashboard principal
/subjects - Lista de materias
/subjects/new - Formulario para crear nueva materia
/subjects/:id - Detalles de una materia específica
/enrollment - Proceso de matrícula
/enrollment/success - Confirmación de matrícula exitosa
Endpoints Disponibles
GET /students/ - Listar estudiantes
GET /subjects/ - Listar materias
GET /subjects/occupancy/ - Obtener estadísticas de ocupación de materias
GET /enrollments/?subject_id={id} - Listar estudiantes matriculados en una materia
GET /enrollments/check_availability/?student_id={id}&subject_id={id} - Verificar disponibilidad de matrícula
POST /enrollments/ - Matricular estudiante en materia
POST /subjects/ - Crear nueva materia
Autenticación: Todas las peticiones deben incluir el header x-api-key con el valor proporcionado.

Funcionalidades Requeridas
Página de Login

Formulario para ingresar la API key
Almacenar la API key en localStorage para persistencia
Redirigir al dashboard tras autenticación exitosa
Dashboard de Matrícula

Resumen de materias disponibles
Indicador visual de disponibilidad (plazas ocupadas/totales)
Estadísticas básicas (total de estudiantes, materias más populares)
Accesos rápidos a las funciones principales
Gestión de Materias

Lista de materias con detalles (nombre, código, capacidad)
Ver estudiantes matriculados en cada materia
Formulario para crear nueva materia
Indicadores visuales de ocupación
Proceso de Matrícula (implementar como formulario multi-paso)

Paso 1: Seleccionar estudiante de una lista
Paso 2: Seleccionar materia
Paso 3: Verificar disponibilidad y confirmar
Mostrar resultado de la operación (éxito/error)
Verificaciones durante el proceso de matrícula

Comprobar que el estudiante no supere el máximo de 2 materias
Verificar que la materia tenga cupo disponible
Evitar matrículas duplicadas (estudiante ya inscrito en la materia)
Flujo de la Aplicación
Usuario ingresa la API key en la página de login
Tras autenticación exitosa, se redirige al dashboard
Desde el dashboard, puede:
Ver estadísticas generales
Navegar a gestión de materias
Navegar al proceso de matrícula
En la gestión de materias:
Ver lista de materias existentes
Crear nuevas materias
Ver detalles de cada materia
En el proceso de matrícula:
Seleccionar estudiante
Seleccionar materia disponible
Verificar disponibilidad


# **Rúbrica de Evaluación - Frontend del Sistema de Matrícula**

## **Criterios de Calificación**
A continuación se detallan los criterios de evaluación para el proyecto frontend, basados en las mejores prácticas de desarrollo con React y TypeScript.

---

### **1. Seguridad - Manejo de API Key** (4 pts)
| Nivel          | Descripción |
|----------------|------------|
| **Se excede** (4 pts) | API Key gestionada mediante variables de entorno (`.env`). Validación robusta y manejo de errores completo. |
| **Dominio** (3 pts) | API Key en `.env`, con validación básica y manejo de errores funcional. |
| **Cerca** (2 pts) | API Key parcialmente segura, con vulnerabilidades menores. Validación incompleta. |
| **Debajo** (1 pt) | API Key expuesta en código. Validación y manejo de errores deficientes. |
| **Sin evidencia** (0 pts) | API Key hardcodeada. Sin medidas de seguridad. |

---

### **2. Componentes Reutilizables** (4 pts)
| Nivel          | Descripción |
|----------------|------------|
| **Se excede** (4 pts) | Componentes altamente reutilizables con TypeScript/PropTypes. Separación clara de responsabilidades. |
| **Dominio** (3 pts) | Componentes reutilizables con props tipadas. Estructura organizada. |
| **Cerca** (2 pts) | Algunos componentes no reutilizables. Props parcialmente tipadas. |
| **Debajo** (1 pt) | Componentes poco modulares. Props mal definidas. |
| **Sin evidencia** (0 pts) | Sin componentes reutilizables. |

---

### **3. Arquitectura y Estructura** (3 pts)
| Nivel          | Descripción |
|----------------|------------|
| **Dominio** (3 pts) | Estructura de carpetas lógica (ej: `components/`, `services/`). Convenciones de nombres consistentes. |
| **Cerca** (2 pts) | Estructura funcional con algunas inconsistencias. |
| **Debajo** (1 pt) | Estructura básica pero desorganizada. |
| **Sin evidencia** (0 pts) | Sin estructura definida. |

---

### **4. Calidad del Código** (3 pts)
| Nivel          | Descripción |
|----------------|------------|
| **Dominio** (3 pts) | Código limpio, sin duplicación. Funciones pequeñas y comentarios útiles. |
| **Cerca** (2 pts) | Código legible con mínima duplicación. |
| **Debajo** (1 pt) | Código funcional pero desorganizado. |
| **Sin evidencia** (0 pts) | Código ilegible y duplicado. |

---

### **5. UI/UX** (2 pts)
| Nivel          | Descripción |
|----------------|------------|
| **Dominio** (2 pts) | Interfaz intuitiva, responsive y con feedback visual (ej: loadings, errores). |
| **Cerca** (1 pt) | Diseño funcional pero mejorable en usabilidad. |
| **Sin evidencia** (0 pts) | UI confusa y no adaptable. |

---

### **6. Consumo de APIs con Axios** (2 pts)
| Nivel          | Descripción |
|----------------|------------|
| **Dominio** (2 pts) | Axios con interceptors, instancia centralizada y manejo de headers. |
| **Cerca** (1 pt) | Uso básico de Axios sin configuración avanzada. |
| **Sin evidencia** (0 pts) | Sin uso de Axios o implementación incorrecta. |

---

### **7. Manejo de Estados y Errores** (2 pts)
| Nivel          | Descripción |
|----------------|------------|
| **Dominio** (2 pts) | Gestión óptima de estado (context/hooks). Manejo completo de errores HTTP. |
| **Cerca** (1 pt) | Estado básico y manejo parcial de errores. |
| **Sin evidencia** (0 pts) | Sin gestión de estado o manejo de errores. |

---

## **Total: 20 Puntos**
- **17-20 pts**: Excelente (Implementación profesional).  
- **13-16 pts**: Bueno (Cumple con todos los requisitos).  
- **9-12 pts**: Aceptable (Requiere mejoras).  
- **≤8 pts**: Insuficiente (No cumple estándares mínimos).  

---

### **Recomendaciones Clave**
1. **API Key**:  
   ```env
   VITE_API_KEY=tu_api_key
   ```
   - Usar variables de entorno y nunca hardcodearla.  
2. **Componentes**:  
   - Crear carpetas por dominio (ej: `auth/`, `subjects/`).  
3. **TypeScript**:  
   - Definir interfaces para props y datos de API.  
4. **Errores**:  
   - Implementar `try-catch` en todas las llamadas a la API.  

