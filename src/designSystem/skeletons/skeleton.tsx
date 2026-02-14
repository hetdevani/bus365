import React from 'react';
import { cn } from '../../core/utils';

/**
 * Skeleton Props
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Width of skeleton */
    width?: string | number;
    /** Height of skeleton */
    height?: string | number;
    /** Border radius variant */
    variant?: 'default' | 'rounded' | 'circular';
    /** Animation type */
    animation?: 'pulse' | 'wave' | 'none';
}

/**
 * Skeleton Component
 * 
 * Accessible loading placeholder with animations.
 * Used for content loading states.
 */
export function Skeleton({
    className,
    width,
    height,
    variant = 'default',
    animation = 'pulse',
    style,
    ...props
}: SkeletonProps) {
    return (
        <div
            role="status"
            aria-label="Loading..."
            aria-busy="true"
            className={cn(
                'bg-neutral-200',
                {
                    'rounded-md': variant === 'default',
                    'rounded-full': variant === 'rounded' || variant === 'circular',
                    'animate-pulse': animation === 'pulse',
                    'animate-shimmer bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%]':
                        animation === 'wave',
                },
                className
            )}
            style={{
                width: width,
                height: height,
                ...style,
            }}
            {...props}
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
}

/**
 * Card Skeleton
 */
export function CardSkeleton() {
    return (
        <div className="bg-background-surface border border-border-default rounded-xl p-6 space-y-4">
            <Skeleton height={24} width="60%" />
            <Skeleton height={16} width="40%" />
            <div className="space-y-2 pt-4">
                <Skeleton height={12} width="100%" />
                <Skeleton height={12} width="90%" />
                <Skeleton height={12} width="95%" />
            </div>
        </div>
    );
}

/**
 * Table Row Skeleton
 */
export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
    return (
        <tr className="border-b border-border-subtle">
            {Array.from({ length: columns }).map((_, index) => (
                <td key={index} className="py-3 px-4">
                    <Skeleton height={16} width={index === 0 ? '80%' : '60%'} />
                </td>
            ))}
        </tr>
    );
}

/**
 * Chart Skeleton
 */
export function ChartSkeleton({ height = 300 }: { height?: number }) {
    return (
        <div className="space-y-4">
            <div className="flex items-end justify-between gap-2" style={{ height }}>
                {Array.from({ length: 12 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        width="100%"
                        height={`${Math.random() * 60 + 40}%`}
                        variant="default"
                    />
                ))}
            </div>
            <div className="flex justify-center gap-4">
                <Skeleton height={12} width={80} />
                <Skeleton height={12} width={80} />
            </div>
        </div>
    );
}

/**
 * Avatar Skeleton
 */
export function AvatarSkeleton({ size = 40 }: { size?: number }) {
    return <Skeleton width={size} height={size} variant="circular" />;
}

/**
 * List Skeleton
 */
export function ListSkeleton({ items = 5 }: { items?: number }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: items }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                    <AvatarSkeleton />
                    <div className="flex-1 space-y-2">
                        <Skeleton height={16} width="60%" />
                        <Skeleton height={12} width="40%" />
                    </div>
                </div>
            ))}
        </div>
    );
}
