import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../core/utils';
import { IconChevronDown } from '../Icon';

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    label?: string;
    className?: string;
    fullWidth?: boolean;
    disabled?: boolean;
}

export function Select({
    value,
    onChange,
    options,
    placeholder = 'Select an option',
    label,
    className,
    fullWidth = false,
    disabled = false,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
        <div
            className={cn(
                'relative flex flex-col gap-1.5',
                fullWidth ? 'w-full' : 'w-auto',
                className
            )}
            ref={containerRef}
        >
            {label && (
                <label className="text-xs font-black text-text-tertiary uppercase tracking-widest ml-1">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                disabled={disabled}
                className={cn(
                    'flex items-center justify-between gap-3 px-4 py-3 rounded-2xl transition-all duration-200',
                    'bg-background-surface border border-border-default',
                    'text-sm font-bold text-text-primary',
                    'hover:border-primary-500/50 hover:bg-background-elevated',
                    'focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500',
                    isOpen && 'border-primary-500 ring-4 ring-primary-500/10 shadow-lg',
                    disabled && 'opacity-50 cursor-not-allowed grayscale'
                )}
            >
                <span className={cn('truncate', !selectedOption && 'text-text-tertiary')}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>

                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="flex-shrink-0 text-text-tertiary"
                >
                    <IconChevronDown size={18} />
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        role="listbox"
                        className={cn(
                            'glass absolute z-[100] mt-12 w-full max-h-60 overflow-auto rounded-2xl p-1.5 shadow-premium origin-top scrollbar-none',
                            'top-full left-0'
                        )}
                    >
                        {options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                role="option"
                                aria-selected={option.value === value}
                                className={cn(
                                    'flex items-center px-3 py-2.5 text-sm font-bold rounded-xl cursor-pointer transition-all duration-200',
                                    option.value === value
                                        ? 'bg-primary-500/10 text-primary-600'
                                        : 'text-text-secondary hover:bg-neutral-100/50 hover:text-text-primary'
                                )}
                            >
                                <span className="flex-1 truncate">{option.label}</span>
                                {option.value === value && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(var(--color-primary-500-rgb),0.5)]" />
                                )}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
