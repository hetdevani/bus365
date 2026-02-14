import React from 'react';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { IconAlert } from '../Icon';

export interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description?: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'warning' | 'info';
    loading?: boolean;
}

/**
 * ConfirmDialog Component
 * 
 * A specialized modal for confirming critical actions.
 */
export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'danger',
    loading = false,
}: ConfirmDialogProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
            footer={
                <>
                    <Button variant="ghost" onClick={onClose} disabled={loading}>
                        {cancelLabel}
                    </Button>
                    <Button
                        variant={variant}
                        onClick={onConfirm}
                        loading={loading}
                    >
                        {confirmLabel}
                    </Button>
                </>
            }
        >
            <div className="flex flex-col items-center text-center p-2">
                <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center mb-4
                    ${variant === 'danger' ? 'bg-danger-50 text-danger-500' : ''}
                    ${variant === 'warning' ? 'bg-warning-50 text-warning-500' : ''}
                    ${variant === 'info' ? 'bg-info-50 text-info-500' : ''}
                `}>
                    <IconAlert size={32} />
                </div>

                {description && (
                    <div className="text-text-secondary">
                        {description}
                    </div>
                )}
            </div>
        </Modal>
    );
}
