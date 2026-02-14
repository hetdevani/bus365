import { Toaster as Sonner } from 'sonner';
import { useThemeStore } from '../../store/theme.store';

/**
 * Toast Provider Component
 * 
 * Uses Sonner for beautiful, accessible toasts.
 * Theme-aware and production-ready.
 */
export function ToastProvider() {
    const { theme } = useThemeStore();

    return (
        <Sonner
            theme={theme}
            position="top-right"
            expand={false}
            richColors
            closeButton
            toastOptions={{
                classNames: {
                    toast: 'rounded-xl shadow-xl border',
                    title: 'font-semibold',
                    description: 'text-sm opacity-90',
                    success: 'bg-success-50 border-success-200 text-success-900',
                    error: 'bg-danger-50 border-danger-200 text-danger-900',
                    warning: 'bg-warning-50 border-warning-200 text-warning-900',
                    info: 'bg-primary-50 border-primary-200 text-primary-900',
                },
            }}
        />
    );
}
