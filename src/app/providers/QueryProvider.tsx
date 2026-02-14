import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
});

export interface QueryProviderProps {
    children: React.ReactNode;
}

/**
 * React Query Provider
 * Configures global query settings
 */
export function QueryProvider({ children }: QueryProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
