import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../core/utils';

/**
 * Dropdown Component
 */
export interface DropdownItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    danger?: boolean;
}

interface DropdownProps {
    trigger: React.ReactNode;
    items: DropdownItem[];
    align?: 'left' | 'right';
    className?: string;
}

export function Dropdown({
    trigger,
    items,
    align = 'right',
    className,
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">{trigger}</div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className={cn(
                            'glass absolute z-50 mt-2 w-56 rounded-2xl overflow-hidden shadow-premium p-1.5 origin-top',
                            align === 'right' ? 'right-0' : 'left-0'
                        )}
                    >
                        {items.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    item.onClick?.();
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    'flex w-full items-center gap-3 px-3 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 dropdown-item-hover',
                                    item.danger
                                        ? 'text-danger-500 hover:text-danger-600'
                                        : 'text-text-secondary hover:text-primary-500'
                                )}
                            >
                                {item.icon && <span className="flex-shrink-0 w-4 h-4">{item.icon}</span>}
                                <span className="truncate">{item.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
