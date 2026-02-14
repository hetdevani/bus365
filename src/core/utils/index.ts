import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with clsx
 * This prevents class conflicts
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format date consistently
 */
export function formatDate(date: Date | string, format: 'short' | 'long' | 'time' = 'short'): string {
    const d = typeof date === 'string' ? new Date(date) : date;

    switch (format) {
        case 'short':
            return d.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        case 'long':
            return d.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        case 'time':
            return d.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
        default:
            return d.toLocaleDateString();
    }
}

/**
 * Format numbers with separators
 */
export function formatNumber(num: number, decimals: number = 0): string {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(num);
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

/**
 * Sleep/delay utility
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate random ID
 */
export function generateId(prefix: string = 'id'): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
