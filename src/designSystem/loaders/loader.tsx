import { cn } from '../../core/utils';

/**
 * Spinner Props
 */
export interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

/**
 * Spinner Component
 * 
 * Animated loading spinner.
 */
export function Spinner({ size = 'md', className }: SpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
    };

    return (
        <svg
            className={cn('animate-spin', sizeClasses[size], className)}
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
                fill="current Color"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
}

/**
 * Page Loader Component
 * 
 * Elite full-page loading overlay with branding and animated background.
 */
export function PageLoader() {
    return (
        <div className="fixed inset-0 z-[9999] bg-background-base flex items-center justify-center">
            <div className="relative flex flex-col items-center justify-center gap-8">
                {/* Logo Container */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* Animated Pulse Ring */}
                    <span className="absolute inset-0 rounded-2xl bg-primary-500/20 animate-ping duration-[2000ms]" />
                    <span className="absolute inset-2 rounded-2xl bg-primary-500/40 animate-pulse duration-[1500ms]" />

                    {/* Main Logo Block */}
                    <div className="relative z-10 w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center shadow-2xl shadow-primary-500/40 transform transition-transform animate-bounce-slow">
                        <span className="text-4xl font-black text-white">M</span>
                    </div>

                    {/* Rotating Border (Subtle) */}
                    <div className="absolute -inset-4 border-2 border-dashed border-primary-200 dark:border-primary-800 rounded-[2rem] animate-spin-slow opacity-50" />
                </div>
            </div>
        </div>
    );
}

/**
 * Section Loader Component
 * 
 * Loading state for a section/card.
 */
export function SectionLoader({ message }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Spinner size="lg" className="text-primary-600" />
            {message && <p className="text-sm text-text-secondary">{message}</p>}
        </div>
    );
}

/**
 * Inline Loader Component
 * 
 * Small inline loading indicator.
 */
export function InlineLoader() {
    return (
        <div className="inline-flex items-center gap-2">
            <Spinner size="sm" className="text-primary-600" />
            <span className="text-sm text-text-secondary">Loading...</span>
        </div>
    );
}

/**
 * Dots Loader
 * 
 * Three-dot animated loader.
 */
export function DotsLoader({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const dotSizes = {
        sm: 'w-1.5 h-1.5',
        md: 'w-2 h-2',
        lg: 'w-3 h-3',
    };

    return (
        <div className="flex items-center gap-1">
            {[0, 1, 2].map((index) => (
                <div
                    key={index}
                    className={cn(
                        'rounded-full bg-current',
                        dotSizes[size],
                        'animate-bounce'
                    )}
                    style={{
                        animationDelay: `${index * 0.15}s`,
                    }}
                />
            ))}
        </div>
    );
}
