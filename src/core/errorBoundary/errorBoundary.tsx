import { Component, type ErrorInfo, type ReactNode } from 'react';

/**
 * Error Boundary Props
 */
interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: (error: Error, errorInfo: ErrorInfo, reset: () => void) => ReactNode;
}

/**
 * Error Boundary State
 */
interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

/**
 * Global Error Boundary Component
 * 
 * Catches all React errors and displays fallback UI.
 * Production-ready with error logging and user-friendly messages.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log to error reporting service (e.g., Sentry, DataDog)
        console.error('ErrorBoundary caught:', error, errorInfo);

        this.setState({
            error,
            errorInfo,
        });

        // TODO: Send to error tracking service
        // errorTrackingService.logError(error, errorInfo);
    }

    resetError = (): void => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render(): ReactNode {
        const { hasError, error, errorInfo } = this.state;
        const { children, fallback } = this.props;

        if (hasError && error && errorInfo) {
            if (fallback) {
                return fallback(error, errorInfo, this.resetError);
            }

            return (
                <div className="min-h-screen bg-background-base flex items-center justify-center p-6">
                    <div className="max-w-2xl w-full">
                        <div className="bg-background-surface border border-border-default rounded-xl p-8 shadow-xl">
                            {/* Error Icon */}
                            <div className="w-16 h-16 rounded-full bg-danger-100 flex items-center justify-center mx-auto mb-6">
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-danger-600"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </div>

                            {/* Error Message */}
                            <h1 className="text-2xl font-bold text-text-primary text-center mb-2">
                                Something went wrong
                            </h1>
                            <p className="text-text-secondary text-center mb-6">
                                We're sorry for the inconvenience. Our team has been notified and is working on a fix.
                            </p>

                            {/* Error Details (Development Only) */}
                            {process.env.NODE_ENV === 'development' && (
                                <div className="bg-neutral-100 rounded-lg p-4 mb-6 overflow-auto max-h-96">
                                    <h3 className="font-semibold text-sm text-text-primary mb-2">Error Details:</h3>
                                    <p className="text-xs text-danger-600 font-mono mb-3">{error.message}</p>

                                    <h4 className="font-semibold text-xs text-text-secondary mb-1">Stack Trace:</h4>
                                    <pre className="text-xs text-text-tertiary overflow-x-auto whitespace-pre-wrap">
                                        {error.stack}
                                    </pre>

                                    {errorInfo.componentStack && (
                                        <>
                                            <h4 className="font-semibold text-xs text-text-secondary mb-1 mt-3">Component Stack:</h4>
                                            <pre className="text-xs text-text-tertiary overflow-x-auto whitespace-pre-wrap">
                                                {errorInfo.componentStack}
                                            </pre>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={this.resetError}
                                    className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                                >
                                    Try Again
                                </button>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="px-6 py-2.5 bg-neutral-200 text-text-primary rounded-lg font-medium hover:bg-neutral-300 transition-colors"
                                >
                                    Go to Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return children;
    }
}
