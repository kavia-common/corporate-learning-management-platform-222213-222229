import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { hasRole, useAuth } from '../store/AuthContext';

// PUBLIC_INTERFACE
export function RequireAuth() {
  /** Guards routes that require authentication. Redirects to login preserving return path. */
  const { state } = useAuth();
  const location = useLocation();
  if (!state?.accessToken) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

// PUBLIC_INTERFACE
export function RequireRoles({ roles }) {
  /** Guards routes that require specific roles; must be nested inside RequireAuth. */
  const { state } = useAuth();
  if (!hasRole(state, roles)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
}
