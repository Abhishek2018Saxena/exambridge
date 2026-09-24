import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/ui/Loading';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isDemo, loading } = useAuth();

  if (loading) return <LoadingScreen message="Loading..." />;

  if (!user && !isDemo) return <Navigate to="/signin" replace />;

  return <>{children}</>;
}
