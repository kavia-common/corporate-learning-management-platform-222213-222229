import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './theme.css';
import { AuthProvider } from './store/AuthContext';
import { ToastProvider } from './components/Toast';
import AppLayout from './components/Layout';
import { RequireAuth, RequireRoles } from './routes/Guards';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forgot from './pages/auth/Forgot';
import Reset from './pages/auth/Reset';
import SSOCallback from './pages/auth/SSOCallback';

import EmployeeDashboard from './pages/dashboard/EmployeeDashboard';
import ManagerDashboard from './pages/dashboard/ManagerDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

import Catalog from './pages/courses/Catalog';
import CourseDetail from './pages/courses/Detail';
import LessonViewer from './pages/courses/LessonViewer';

import Runner from './pages/quizzes/Runner';
import Results from './pages/quizzes/Results';
import Review from './pages/quizzes/Review';

import PathsList from './pages/paths/PathsList';
import PathDetail from './pages/paths/PathDetail';
import Planner from './pages/paths/Planner';

import Reports from './pages/reports/Reports';
import SkillMatrix from './pages/reports/SkillMatrix';

import Users from './pages/admin/Users';
import Roles from './pages/admin/Roles';
import CoursesAdmin from './pages/admin/CoursesAdmin';
import ContentLibrary from './pages/admin/ContentLibrary';
import Settings from './pages/admin/Settings';
import Integrations from './pages/admin/Integrations';

import NotificationsPage from './pages/notifications/NotificationsPage';
import Unauthorized from './pages/Unauthorized';

// PUBLIC_INTERFACE
function App() {
  /** Root application component wiring providers and router. */
  useEffect(() => {
    // prefer light theme background from Ocean Professional
    document.body.style.background = 'var(--color-bg)';
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Auth */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot" element={<Forgot />} />
            <Route path="/auth/reset" element={<Reset />} />
            <Route path="/auth/sso/callback" element={<SSOCallback />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* App Protected */}
            <Route element={<RequireAuth />}>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<EmployeeDashboard />} />
                <Route path="/notifications" element={<NotificationsPage />} />

                {/* Courses */}
                <Route path="/courses" element={<Catalog />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/courses/:id/lessons/:lessonId" element={<LessonViewer />} />

                {/* Quizzes */}
                <Route path="/quizzes" element={<Catalog />} />
                <Route path="/quizzes/run/:id" element={<Runner />} />
                <Route path="/quizzes/results/:id" element={<Results />} />
                <Route path="/quizzes/review/:id" element={<Review />} />

                {/* Learning Paths */}
                <Route path="/learning-paths" element={<PathsList />} />
                <Route path="/learning-paths/:id" element={<PathDetail />} />
                <Route path="/learning-paths/:id/planner" element={<Planner />} />

                {/* Reporting */}
                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/skills" element={<SkillMatrix />} />

                {/* Manager area */}
                <Route element={<RequireRoles roles={['manager', 'admin']} />}>
                  <Route path="/manager" element={<ManagerDashboard />} />
                </Route>

                {/* Admin area */}
                <Route element={<RequireRoles roles={['admin']} />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<Users />} />
                  <Route path="/admin/roles" element={<Roles />} />
                  <Route path="/admin/courses" element={<CoursesAdmin />} />
                  <Route path="/admin/content" element={<ContentLibrary />} />
                  <Route path="/admin/settings" element={<Settings />} />
                  <Route path="/admin/integrations" element={<Integrations />} />
                </Route>
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
