import React, { forwardRef } from 'react';
import { cn } from '../../../core/utils';

export type LabelColor = 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
export type LabelVariant = 'filled' | 'outlined' | 'soft';

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
    color?: LabelColor;
    variant?: LabelVariant;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    children: React.ReactNode;
}

const colorStyles: Record<LabelColor, Record<LabelVariant, string>> = {
    default: {
        filled: 'bg-neutral-600 text-white',
        outlined: 'border border-neutral-600 text-neutral-600',
        soft: 'bg-neutral-500/10 text-neutral-600',
    },
    primary: {
        filled: 'bg-primary-600 text-white',
        outlined: 'border border-primary-600 text-primary-600',
        soft: 'bg-primary-500/10 text-primary-600',
    },
    secondary: {
        filled: 'bg-secondary-600 text-white',
        outlined: 'border border-secondary-600 text-secondary-600',
        soft: 'bg-secondary-500/10 text-secondary-600',
    },
    info: {
        filled: 'bg-info-600 text-white',
        outlined: 'border border-info-600 text-info-600',
        soft: 'bg-info-500/10 text-info-600',
    },
    success: {
        filled: 'bg-success-600 text-white',
        outlined: 'border border-success-600 text-success-600',
        soft: 'bg-success-500/10 text-success-700', // Darker text for readability
    },
    warning: {
        filled: 'bg-warning-600 text-white',
        outlined: 'border border-warning-600 text-warning-600',
        soft: 'bg-warning-500/15 text-warning-700',
    },
    error: {
        filled: 'bg-danger-600 text-white',
        outlined: 'border border-danger-600 text-danger-600',
        soft: 'bg-danger-500/10 text-danger-600',
    },
};

export const Label = forwardRef<HTMLSpanElement, LabelProps>(
    ({ color = 'default', variant = 'soft', startIcon, endIcon, className, children, ...props }, ref) => {
        const styles = colorStyles[color][variant];

        return (
            <span
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center px-2 h-6 text-xs font-bold rounded-md whitespace-nowrap transition-all duration-200 uppercase tracking-wide',
                    styles,
                    className
                )}
                {...props}
            >
                {startIcon && <span className="mr-1 -ml-0.5">{startIcon}</span>}
                {children}
                {endIcon && <span className="ml-1 -mr-0.5">{endIcon}</span>}
            </span>
        );
    }
);

Label.displayName = 'Label';
