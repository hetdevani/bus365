import { toast as sonnerToast } from 'sonner';

/**
 * Toast Utilities
 * 
 * Wrapper around Sonner with standardized API.
 * Production-ready with promise support.
 */

export const toast = {
    /**
     * Success toast
     */
    success: (message: string, description?: string) => {
        return sonnerToast.success(message, { description });
    },

    /**
     * Error toast
     */
    error: (message: string, description?: string) => {
        return sonnerToast.error(message, { description });
    },

    /**
     * Warning toast
     */
    warning: (message: string, description?: string) => {
        return sonnerToast.warning(message, { description });
    },

    /**
     * Info toast
     */
    info: (message: string, description?: string) => {
        return sonnerToast.info(message, { description });
    },

    /**
     * Promise toast
     * Shows loading, success, or error based on promise state
     */
    promise: <T,>(
        promise: Promise<T>,
        {
            loading,
            success,
            error,
        }: {
            loading: string;
            success: string | ((data: T) => string);
            error: string | ((error: any) => string);
        }
    ) => {
        return sonnerToast.promise(promise, {
            loading,
            success,
            error,
        });
    },

    /**
     * Custom toast
     */
    custom: (message: string, options?: any) => {
        return sonnerToast(message, options);
    },

    /**
     * Dismiss specific toast
     */
    dismiss: (toastId?: string | number) => {
        return sonnerToast.dismiss(toastId);
    },
};
