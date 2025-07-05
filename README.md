# README: Sistema de Matrícula (Frontend)

Este documento sirve como guía para desarrollar la interfaz de usuario (frontend) para el sistema de matrícula. El objetivo es crear una aplicación en **React** que consuma una API RESTful para gestionar estudiantes, materias e inscripciones.

## 1\. Visión General del Proyecto

El proyecto consiste en una Single Page Application (SPA) que permite a un administrador:

  - Autenticarse en el sistema mediante una API Key.
  - Visualizar un dashboard con estadísticas sobre las materias.
  - Gestionar la lista de materias: ver, crear y consultar detalles.
  - Inscribir a estudiantes en materias a través de un formulario multi-paso.

Dado que la tarea ahora incluye tanto el frontend como el backend, esta guía se enfoca en cómo construir el frontend y hacerlo interactuar con el backend proporcionado, todo corriendo en tu máquina local.

**Tecnologías a utilizar:**

  - **React**: Con componentes funcionales y Hooks.
  - **React Router**: Para el manejo de rutas en la aplicación.
  - **Axios**: Para consumir la API RESTful.

## 2\. Preparación del Entorno

Antes de comenzar, asegúrate de tener instalado lo siguiente:

  - [Node.js](https://nodejs.org/) (versión 16 o superior)
  - npm o yarn (gestor de paquetes de Node.js)

### Configuración del Backend

La práctica proporciona un backend listo para consumir. No necesitas programarlo, solo saber cómo interactuar con él.

  - **URL Base de la API**: `http://localhost:8080`

La **autenticación** se realiza enviando una API Key en el header `x-api-key` de cada petición.

### 3\. Arquitectura y Estructura del Proyecto
Una buena organización de archivos es clave. Te recomendamos la siguiente estructura dentro de la carpeta /src:

/src
├── api/
│   ├── axiosConfig.ts      # Configuración centralizada de Axios
│   └── services.ts         # Funciones tipadas para llamar a la API
├── components/
│   ├── common/             # Componentes reutilizables (Button, Card, etc.)
│   └── layout/             # Componentes de estructura (Navbar)
│   └── SubjectCard.tsx
│   └── EnrollmentStep.tsx
├── context/
│   └── AuthContext.tsx       # Contexto tipado para manejar la autenticación
├── hooks/
│   └── useAuth.ts            # Hook personalizado para acceder al AuthContext
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── SubjectsList.tsx
│   └── ...etc.tsx
├── routes/
│   ├── AppRouter.tsx         # Define todas las rutas
│   └── ProtectedRoute.tsx    # Componente HOC para proteger rutas
├── types/
│   └── index.ts              # Definiciones de tipos (interfaces para Student, Subject, etc.)
├── App.tsx
└── main.tsx

## 4\. Guía de Implementación por Funcionalidad

### 🔐 Autenticación y Seguridad (Manejo de API Key)

1.  **Página de Login (`/login`):**

      - Crea un formulario simple con un solo campo para la API Key.
      - Al enviar el formulario, guarda la API Key en `localStorage` para que la sesión persista.
      - Usa un `AuthContext` para almacenar el estado de autenticación y la key. Esto permitirá que toda la app sepa si el usuario está logueado.

2.  **Contexto de Autenticación (`/context/AuthContext.tsx`):**
    Crea un contexto fuertemente tipado para manejar la API Key y el estado de autenticación.

    ```typescript
    import { createContext, useState, useContext, ReactNode } from 'react';

    interface AuthContextType {
      apiKey: string | null;
      isAuthenticated: boolean;
      login: (key: string) => void;
      logout: () => void;
    }

    const AuthContext = createContext<AuthContextType | undefined>(undefined);

    export const AuthProvider = ({ children }: { children: ReactNode }) => {
      // Lógica para leer/escribir en localStorage
      const [apiKey, setApiKey] = useState<string | null>(() => localStorage.getItem('apiKey'));

      const login = (key: string) => {
        localStorage.setItem('apiKey', key);
        setApiKey(key);
      };

      const logout = () => {
        localStorage.removeItem('apiKey');
        setApiKey(null);
      };
      
      const isAuthenticated = !!apiKey;

      return (
        <AuthContext.Provider value={{ apiKey, isAuthenticated, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
    };

    export const useAuth = () => {
      const context = useContext(AuthContext);
      if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
      }
      return context;
    };
    ```

3.  **Configuración de Axios (`/api/axiosConfig.ts`):**
    Usa **interceptors** para añadir automáticamente el header `x-api-key`.

    ```typescript
    import axios from 'axios';

    const apiClient = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });

    apiClient.interceptors.request.use((config) => {
      const apiKey = localStorage.getItem('apiKey');
      if (apiKey) {
        config.headers['x-api-key'] = apiKey;
      }
      return config;
    });

    export default apiClient;
    ```

4.  **Rutas Protegidas (`/routes/ProtectedRoute.tsx`):**
    Este componente verificará la autenticación antes de renderizar una página.

    ```tsx
    import React from 'react';
    import { Navigate } from 'react-router-dom';
    import { useAuth } from '../context/AuthContext';

    interface ProtectedRouteProps {
      children: React.ReactNode;
    }

    const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
      const { isAuthenticated } = useAuth();

      if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
      }

      return <>{children}</>;
    };

    export default ProtectedRoute;
    ```
### 📊 Dashboard y Gestión de Materias

  - **Dashboard (`/dashboard`):**

      - Será la página principal después del login.
      - Consume el endpoint `GET /subjects/occupancy/` para obtener las estadísticas.
      - Muestra tarjetas (`Card`) por cada materia con su nombre, código y un indicador visual de ocupación (ej. una barra de progreso).
      - Debe tener enlaces para "Crear Materia" y "Realizar Inscripción".

  - **Lista de Materias (`/subjects`):**

      - Similar al dashboard, pero puede ser una tabla con más detalles.
      - Cada fila debe ser un enlace a los detalles de esa materia (`/subjects/:id`).

  - **Detalles de Materia (`/subjects/:id`):**

      - Muestra toda la información de una materia específica.
      - Consume `GET /enrollments/?subject_id={id}` para listar los estudiantes ya matriculados en ella.

  - **Formulario de Materias (`/subjects/new`):**

      - Un formulario para crear nuevas materias.
      - Realiza una petición `POST /subjects/`.
      - **Importante**: Valida los campos del formulario antes de enviarlo. Muestra notificaciones de éxito o error.

  - **Tipos de Datos (`/types/index.ts`):**
    Define interfaces para los datos que recibes de la API. Esto te dará autocompletado y seguridad de tipos.

    ```typescript
    // types/index.ts
    export interface Subject {
      id: number;
      name: string;
      code: string;
      max_students: number;
      // ...otros campos
    }

    export interface Student {
      id: number;
      first_name: string;
      last_name: string;
      // ...otros campos
    }
    ```

  - **Servicios de API (`/api/services.ts`):**
    Crea funciones tipadas para cada endpoint.

    ```typescript
    import apiClient from './axiosConfig';
    import { Subject, Student } from '../types';

    export const getSubjects = async (): Promise<Subject[]> => {
      const response = await apiClient.get('/subjects/');
      return response.data;
    };

    export const getStudents = async (): Promise<Student[]> => {
        const response = await apiClient.get('/students/');
        return response.data;
    }
    ```

  - **Componentes de Página:**
    Usa los hooks de React y los servicios de la API para obtener y mostrar datos. Aprovecha TypeScript para tipar el estado.

    ```tsx
    // pages/SubjectsList.tsx
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const data = await getSubjects();
                setSubjects(data);
            } catch (error) {
                console.error("Error fetching subjects:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSubjects();
    }, []);
    ```

### 📝 Proceso de Matrícula (Formulario Multi-paso)

Esta es una de las funcionalidades más complejas. Impleméntala en la página `/enrollment`.

  - **Estado Principal:** Usa un `useState` en el componente `Enrollment` para gestionar el paso actual (ej. `const [step, setStep] = useState(1);`) y otro para guardar los datos recolectados (`const [formData, setFormData] = useState({});`).

  - **Paso 1: Seleccionar Estudiante**

      - Consume `GET /students/` para obtener la lista de todos los estudiantes.
      - Muéstralos en un `<select>` o una lista.
      - Al seleccionar uno, guarda su ID en `formData` y avanza al siguiente paso (`setStep(2)`).

  - **Paso 2: Seleccionar Materia**

      - Consume `GET /subjects/` para listar las materias.
      - Muestra las materias disponibles (idealmente, podrías filtrar visualmente las que ya están llenas).
      - Guarda el ID de la materia seleccionada y avanza al paso 3.

  - **Paso 3: Verificación y Confirmación**

      - Muestra un resumen: "Está a punto de inscribir a [Nombre Estudiante] en la materia [Nombre Materia]".
      - **Realiza las validaciones ANTES de confirmar:**
        1.  **Disponibilidad de cupo:** Llama a `GET /enrollments/check_availability/?student_id={id}&subject_id={id}`.
        2.  **Límite de materias del estudiante:** Podrías necesitar llamar a `GET /enrollments/?student_id={id}` para contar en cuántas materias ya está inscrito.
        3.  **Matrícula duplicada:** La llamada a `check_availability` ya debería cubrir esto.
      - Si todo es correcto, habilita un botón "Confirmar Matrícula".
      - Al hacer clic, realiza la petición `POST /enrollments/`.
      - Muestra un mensaje de éxito y redirige a `/enrollment/success` o a la página de la materia. Si hay un error, muestra un mensaje claro al usuario.
 
 - **Tipado de Formularios:**
    Tipa el estado que guarda los datos del formulario.

    ```typescript
    interface EnrollmentFormData {
      studentId?: number;
      subjectId?: number;
    }

    const [formData, setFormData] = useState<EnrollmentFormData>({});
    ```

  - **Manejo de Eventos:**
    Usa los tipos de evento de React para los manejadores.

    ```tsx
    const handleStudentSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setFormData(prev => ({ ...prev, studentId: Number(event.target.value) }));
    };
    ```

## 5\. Calidad y Buenas Prácticas

  - **Tipado Fuerte:** Define `interfaces` o `types` para todas tus props, estados y datos de la API. Esto es un requisito clave de la rúbrica al usar TypeScript.
  - **Componentes Reutilizables:** Define las `props` de tus componentes reutilizables con tipos claros.
  - **Manejo de Errores:** Usa `try...catch` en tus llamadas a la API y considera usar el tipo `AxiosError` para inspeccionar los errores de manera más segura.
  - **UI/UX:** Proporciona feedback claro al usuario (estados de carga, mensajes de éxito y error). Una buena experiencia de usuario es siempre valorada.
  - **Clean-Code Practices** No hardcodees nada o me van a bajar puntos