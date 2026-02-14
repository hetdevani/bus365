import React from 'react';
import { cn } from '../../../core/utils';

/**
 * Button Component Props
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style intent */
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'ghost' | 'outline';
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Full width */
    fullWidth?: boolean;
    /** Loading state */
    loading?: boolean;
    /** Icon before text */
    leftIcon?: React.ReactNode;
    /** Icon after text */
    rightIcon?: React.ReactNode;
}

/**
 * Button Component
 * 
 * Enterprise-grade button with multiple variants, sizes, and states.
 * Built with design tokens, fully accessible, and theme-aware.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            className,
            variant = 'primary',
            size = 'md',
            fullWidth = false,
            loading = false,
            disabled,
            leftIcon,
            rightIcon,
            ...props
        },
        ref
    ) => {
        const baseStyles = cn(
            // Base styles
            'inline-flex items-center justify-center gap-2',
            'font-bold',
            'transition-all duration-[var(--duration-fast)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-60',

            // Border radius from tokens
            'rounded-lg',

            // Size variants
            {
                'text-sm px-3 py-1.5 min-h-[32px]': size === 'sm',
                'text-base px-4 py-2 min-h-[40px]': size === 'md',
                'text-lg px-6 py-3 min-h-[48px]': size === 'lg',
            },

            // Width
            {
                'w-full': fullWidth,
            },

            // Variant styles
            {
                // Primary
                'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-500 shadow-lg shadow-primary-500/20':
                    variant === 'primary',

                // Secondary
                'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 focus-visible:ring-secondary-500 shadow-lg shadow-secondary-500/20':
                    variant === 'secondary',

                // Success
                'bg-success-500 text-white hover:bg-success-600 active:bg-success-700 focus-visible:ring-success-500 shadow-lg shadow-success-500/20':
                    variant === 'success',

                // Warning
                'bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-700 focus-visible:ring-warning-500 shadow-lg shadow-warning-500/20':
                    variant === 'warning',

                // Danger
                'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700 focus-visible:ring-danger-500 shadow-lg shadow-danger-500/20':
                    variant === 'danger',

                // Ghost
                'bg-transparent text-text-primary hover:bg-neutral-500/10 active:bg-neutral-500/20 focus-visible:ring-neutral-500':
                    variant === 'ghost',

                // Outline
                'bg-transparent border border-border-default text-text-primary hover:bg-neutral-500/5 active:bg-neutral-500/10 focus-visible:ring-neutral-500':
                    variant === 'outline',

                // Info
                'bg-info-500 text-white hover:bg-info-600 active:bg-info-700 focus-visible:ring-info-500 shadow-lg shadow-info-500/20':
                    variant === 'info',
            },

            className
        );

        return (
            <button
                ref={ref}
                className={baseStyles}
                disabled={disabled || loading}
                {...props}
            >
                {loading && (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {!loading && leftIcon}
                {children}
                {!loading && rightIcon}
            </button>
        );
    }
);

Button.displayName = 'Button';
