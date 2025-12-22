import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import React from 'react';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-zinc-400'>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
}
