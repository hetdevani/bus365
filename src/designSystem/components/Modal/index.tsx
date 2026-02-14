import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../core/utils';
import { IconX } from '../Icon';

/**
 * Modal Component
 */
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    className?: string;
    closeOnOverlayClick?: boolean;
}

const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
    full: 'max-w-[95vw] h-[95vh]',
};

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
    className,
    closeOnOverlayClick = true,
}: ModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeOnOverlayClick ? onClose : undefined}
                        className="absolute inset-0 bg-background-overlay/60 backdrop-blur-sm"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className={cn(
                            'relative w-full glass rounded-3xl shadow-premium flex flex-col overflow-hidden',
                            sizeClasses[size],
                            className
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-border-default">
                            <h3 className="text-2xl font-black text-text-primary tracking-tight">
                                {title || 'Modal Title'}
                            </h3>
                            <button
                                onClick={onClose}
                                className="p-2.5 rounded-2xl text-text-tertiary hover:bg-background-elevated hover:text-text-primary transition-all duration-200"
                            >
                                <IconX size={24} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-8 scrollbar-thin">
                            {children}
                        </div>

                        {/* Footer */}
                        {footer && (
                            <div className="px-8 py-6 border-t border-border-default bg-background-base/20 flex items-center justify-end gap-3">
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
