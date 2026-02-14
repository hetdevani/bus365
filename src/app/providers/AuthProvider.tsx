import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { PageLoader } from '../../designSystem/loaders';

/**
 * Auth Provider
 * 
 * Handles authentication initialization on application start.
 * Shows a global loading state until the authentication status is resolved.
 */
interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const { initializeAuth, isLoading } = useAuthStore();

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    if (isLoading) {
        return <PageLoader message="Initializing secure session..." />;
    }

    return <>{children}</>;
}
