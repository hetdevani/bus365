import React from 'react';
import { cn } from '../../../core/utils';

/**
 * Card Component Props
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Visual variant */
    variant?: 'default' | 'elevated' | 'outlined' | 'glass';
    /** Padding size */
    padding?: 'none' | 'sm' | 'md' | 'lg';
    /** Enable hover effect */
    hoverable?: boolean;
}

/**
 * Card Component
 * 
 * Flexible container component with multiple visual variants.
 * 
 * @example
 * ```tsx
 * <Card variant="elevated" padding="lg">
 *   <CardHeader>
 *     <h3>Title</h3>
 *   </CardHeader>
 *   <CardContent>
 *     Content goes here
 *   </CardContent>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            children,
            className,
            variant = 'default',
            padding = 'md',
            hoverable = false,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-xl transition-all duration-[var(--duration-normal)]',

                    // Variant styles
                    {
                        'bg-background-surface border border-border-default': variant === 'default',
                        'bg-background-elevated shadow-lg': variant === 'elevated',
                        'bg-transparent border-2 border-border-default': variant === 'outlined',
                        'glass': variant === 'glass',
                    },

                    // Padding
                    {
                        'p-0': padding === 'none',
                        'p-4': padding === 'sm',
                        'p-6': padding === 'md',
                        'p-8': padding === 'lg',
                    },

                    // Hover effect
                    {
                        'hover:shadow-xl hover:scale-[1.02] cursor-pointer': hoverable,
                    },

                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

/**
 * Card Header
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('mb-4', className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardHeader.displayName = 'CardHeader';

/**
 * Card Content
 */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> { }

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('', className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardContent.displayName = 'CardContent';

/**
 * Card Footer
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { }

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('mt-6 pt-4 border-t border-border-subtle', className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardFooter.displayName = 'CardFooter';
