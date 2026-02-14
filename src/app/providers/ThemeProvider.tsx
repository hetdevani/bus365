import React, { useEffect } from 'react';
import { initializeTheme } from '../../store/theme.store';

export interface ThemeProviderProps {
    children: React.ReactNode;
}

/**
 * Theme Provider Component
 * Initializes and maintains theme state
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
    useEffect(() => {
        initializeTheme();
    }, []);

    return <>{children}</>;
}
