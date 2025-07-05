import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import SubjectsListPage from '../pages/SubjectsListPage';
import SubjectFormPage from '../pages/SubjectFormPage';
import SubjectDetailsPage from '../pages/SubjectDetailsPage';
import EnrollmentPage from '../pages/EnrollmentPage';
import EnrollmentConfirmationPage from '../pages/EnrollmentConfirmationPage';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subjects"
        element={
          <ProtectedRoute>
            <SubjectsListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subjects/new"
        element={
          <ProtectedRoute>
            <SubjectFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subjects/:id"
        element={
          <ProtectedRoute>
            <SubjectDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/enrollment"
        element={
          <ProtectedRoute>
            <EnrollmentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/enrollment/success"
        element={
          <ProtectedRoute>
            <EnrollmentConfirmationPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </Router>
);

export default AppRouter;
