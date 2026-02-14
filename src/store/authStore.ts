import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * User Interface
 */
export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: 'admin' | 'user' | 'viewer';
    permissions: string[];
}

/**
 * Auth State Interface
 */
interface AuthState {
    // State
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: (user: User) => void;
    setToken: (token: string, refreshToken?: string) => void;
    clearError: () => void;
    initializeAuth: () => Promise<void>;
}

/**
 * Auth Store
 * 
 * Manages authentication state with JWT tokens.
 * Persisted to localStorage for session restoration.
 */
export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            // Initial State
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            /**
             * Login Action
             * In production, this would call your API
             */
            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null });

                try {
                    // Simulate API call
                    await new Promise((resolve) => setTimeout(resolve, 1500));

                    // Mock authentication - replace with real API call
                    if (email && password) {
                        const mockUser: User = {
                            id: '1',
                            email,
                            name: email.split('@')[0] || 'User',
                            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
                            role: 'admin',
                            permissions: ['read', 'write', 'delete'],
                        };

                        const mockToken = 'mock-jwt-token-' + Date.now();
                        const mockRefreshToken = 'mock-refresh-token-' + Date.now();

                        set({
                            user: mockUser,
                            token: mockToken,
                            refreshToken: mockRefreshToken,
                            isAuthenticated: true,
                            isLoading: false,
                            error: null,
                        });
                    } else {
                        throw new Error('Invalid credentials');
                    }
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Login failed',
                        isLoading: false,
                        isAuthenticated: false,
                    });
                }
            },

            /**
             * Logout Action
             */
            logout: () => {
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    isAuthenticated: false,
                    error: null,
                });
            },

            /**
             * Set User
             */
            setUser: (user: User) => {
                set({ user, isAuthenticated: true });
            },

            /**
             * Set Token
             */
            setToken: (token: string, refreshToken?: string) => {
                set({ token, refreshToken: refreshToken || get().refreshToken });
            },

            /**
             * Clear Error
             */
            clearError: () => {
                set({ error: null });
            },

            /**
             * Initialize Auth
             * Called on app start to restore session
             */
            initializeAuth: async () => {
                set({ isLoading: true });

                const { token, user } = get();

                if (token && user) {
                    // In production: validate token with API
                    // For now, just restore the session
                    set({
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } else {
                    set({
                        isLoading: false,
                        isAuthenticated: false,
                    });
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                refreshToken: state.refreshToken,
            }),
        }
    )
);
