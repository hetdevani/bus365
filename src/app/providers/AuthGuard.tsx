import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

/**
 * Guarded Route Component
 * 
 * Protects routes from unauthorized access.
 * Redirects unauthenticated users to the login page.
 */
interface AuthGuardProps {
    children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated, isLoading } = useAuthStore();
    const location = useLocation();

    if (isLoading) {
        return null; // AuthProvider handles the global loader
    }

    if (!isAuthenticated) {
        // Redirect to login but save the current location to redirect back after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
