import React from 'react';
import { cn } from '../../../core/utils';

/**
 * Input Component Props
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Label text */
    label?: string;
    /** Error message */
    error?: string;
    /** Helper text */
    helperText?: string;
    /** Left icon */
    leftIcon?: React.ReactNode;
    /** Right icon */
    rightIcon?: React.ReactNode;
    /** Full width */
    fullWidth?: boolean;
}

/**
 * Input Component
 * 
 * Text input with label, error states, and icon support.
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="you@example.com"
 *   error="Invalid email"
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            fullWidth = false,
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
        const hasError = !!error;

        return (
            <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-medium text-text-primary"
                    >
                        {label}
                    </label>
                )}

                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            // Base styles
                            'w-full px-4 py-2.5',
                            'text-base text-text-primary placeholder:text-text-tertiary',
                            'bg-background-surface',
                            'border rounded-lg',
                            'transition-all duration-[var(--duration-fast)]',

                            // Focus styles
                            'focus:outline-none focus:ring-2 focus:ring-offset-1',

                            // States
                            {
                                'border-border-default focus:border-primary-500 focus:ring-primary-500': !hasError,
                                'border-danger-500 focus:border-danger-600 focus:ring-danger-500': hasError,
                                'pl-10': !!leftIcon,
                                'pr-10': !!rightIcon,
                            },

                            // Disabled
                            'disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-neutral-50',

                            className
                        )}
                        {...props}
                    />

                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
                            {rightIcon}
                        </div>
                    )}
                </div>

                {(error || helperText) && (
                    <p
                        className={cn(
                            'text-sm',
                            hasError ? 'text-danger-600' : 'text-text-secondary'
                        )}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
