import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import VisionBoard from '../pages/VisionBoard';
import Habits from '../pages/Habits';
import Reports from '../pages/Reports';
import ProtectedRoute from '../components/ProtectedRoute';
import AppLayout from '../layouts/AppLayout';

export default function Router() {
  return (
    <Routes>
      {/* Public */}
      <Route path='/login' element={<Login />} />

      {/* Protected */}
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/visions'
        element={
          <ProtectedRoute>
            <AppLayout>
              <VisionBoard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/habits'
        element={
          <ProtectedRoute>
            <AppLayout>
              <Habits />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/reports'
        element={
          <ProtectedRoute>
            <AppLayout>
              <Reports />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  );
}
