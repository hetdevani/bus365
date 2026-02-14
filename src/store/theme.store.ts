import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Theme Types
 */
export type ThemeName = 'light' | 'dark' | 'brand' | 'system';
export type ThemeDensity = 'compact' | 'normal' | 'comfortable';

export interface ThemeConfig {
    theme: ThemeName;
    density: ThemeDensity;
    primaryColor?: string;
    accentColor?: string;
}

interface ThemeStore {
    theme: ThemeName;
    density: ThemeDensity;
    setTheme: (theme: ThemeName) => void;
    setDensity: (density: ThemeDensity) => void;
    toggleTheme: () => void;
}

/**
 * Theme Store - Persisted in localStorage
 */
export const useThemeStore = create<ThemeStore>()(
    persist(
        (set, get) => ({
            theme: 'system',
            density: 'normal',

            setTheme: (theme) => {
                set({ theme });
                applyTheme(theme);
            },

            setDensity: (density) => {
                set({ density });
                applyDensity(density);
            },

            toggleTheme: () => {
                const currentTheme = get().theme;
                let newTheme: ThemeName = 'light';

                if (currentTheme === 'light') newTheme = 'dark';
                else if (currentTheme === 'dark') newTheme = 'system';
                else newTheme = 'light';

                get().setTheme(newTheme);
            },
        }),
        {
            name: 'theme-storage',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    applyTheme(state.theme);
                    applyDensity(state.density);
                }
            },
        }
    )
);

/**
 * Apply theme to document
 */
function applyTheme(theme: ThemeName) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    let effectiveTheme = theme;

    if (theme === 'system') {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Also add class for compatibility
    if (effectiveTheme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
}

/**
 * Apply density to document
 */
function applyDensity(density: ThemeDensity) {
    const root = document.documentElement;
    root.setAttribute('data-density', density);

    // Adjust spacing scale based on density
    const multiplier = density === 'compact' ? 0.75 : density === 'comfortable' ? 1.25 : 1;
    root.style.setProperty('--spacing-scale', multiplier.toString());
}

/**
 * Initialize theme on app load and listen for system changes
 */
export function initializeTheme() {
    const state = useThemeStore.getState();
    applyTheme(state.theme);
    applyDensity(state.density);

    // Listen for system theme changes if set to system
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const currentState = useThemeStore.getState();
        if (currentState.theme === 'system') {
            applyTheme('system');
        }
    });
}
