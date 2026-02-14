import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input, Label, IconX, IconEdit } from '../../../designSystem';
import type { User, UserRole, UserStatus } from '../../../store/userStore';

// ... (code omitted)


export type DrawerMode = 'create' | 'edit' | 'view';

interface UserDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    mode: DrawerMode;
    user?: User | null;
    onSubmit: (data: Omit<User, 'id' | 'joinDate'>) => Promise<void>;
    onEdit?: (user: User) => void;
}

const ROLES: { value: UserRole; label: string }[] = [
    { value: 'Admin', label: 'Administrator' },
    { value: 'Manager', label: 'Manager' },
    { value: 'User', label: 'Standard User' },
];

const STATUSES: { value: UserStatus; label: string }[] = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Banned', label: 'Banned' },
];

export function UserDrawer({
    isOpen,
    onClose,
    mode,
    user,
    onSubmit,
    onEdit
}: UserDrawerProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'User' as UserRole,
        status: 'Active' as UserStatus,
        phoneNumber: '',
        company: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && user && (mode === 'edit' || mode === 'view')) {
            setFormData({
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                phoneNumber: user.phoneNumber || '',
                company: user.company || '',
                country: user.country || '',
                state: user.state || '',
                city: user.city || '',
                zipCode: user.zipCode || '',
            });
        } else if (isOpen && mode === 'create') {
            setFormData({
                name: '',
                email: '',
                role: 'User',
                status: 'Active',
                phoneNumber: '',
                company: '',
                country: '',
                state: '',
                city: '',
                zipCode: '',
            });
        }
    }, [isOpen, user, mode]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isReadOnly = mode === 'view';

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background-overlay/60 backdrop-blur-sm z-[1200]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-background-surface shadow-2xl z-[1201] flex flex-col border-l border-border-default"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border-default">
                            <div>
                                <h2 className="text-xl font-bold text-text-primary">
                                    {mode === 'create' && 'New User'}
                                    {mode === 'edit' && 'Edit User'}
                                    {mode === 'view' && 'User Details'}
                                </h2>
                                <p className="text-sm text-text-secondary">
                                    {mode === 'create' && 'Create a new account.'}
                                    {mode === 'edit' && 'Update existing account.'}
                                    {mode === 'view' && 'View account information.'}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {mode === 'view' && onEdit && user && (
                                    <Button size="sm" variant="ghost" onClick={() => onEdit(user)}>
                                        <IconEdit size={20} />
                                    </Button>
                                )}
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-neutral-500/10 text-text-secondary transition-colors"
                                >
                                    <IconX size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                            <form id="user-form" onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold uppercase text-text-tertiary tracking-wider">Basic Information</h3>

                                    <Input
                                        label="Full Name"
                                        placeholder="e.g. John Doe"
                                        fullWidth
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        disabled={isReadOnly}
                                        required
                                    />

                                    <Input
                                        label="Email Address"
                                        type="email"
                                        placeholder="john@example.com"
                                        fullWidth
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        disabled={isReadOnly}
                                        required
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Phone Number"
                                            placeholder="+1 (555) 000-0000"
                                            fullWidth
                                            value={formData.phoneNumber}
                                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                            disabled={isReadOnly}
                                        />
                                        <Input
                                            label="Company"
                                            placeholder="Company Name"
                                            fullWidth
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            disabled={isReadOnly}
                                        />
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-border-dashed" />

                                {/* Location */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold uppercase text-text-tertiary tracking-wider">Location</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Country"
                                            placeholder="Country"
                                            fullWidth
                                            value={formData.country}
                                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                            disabled={isReadOnly}
                                        />
                                        <Input
                                            label="State/Region"
                                            placeholder="State"
                                            fullWidth
                                            value={formData.state}
                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                            disabled={isReadOnly}
                                        />
                                        <Input
                                            label="City"
                                            placeholder="City"
                                            fullWidth
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            disabled={isReadOnly}
                                        />
                                        <Input
                                            label="Zip/Post Code"
                                            placeholder="Zip Code"
                                            fullWidth
                                            value={formData.zipCode}
                                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                            disabled={isReadOnly}
                                        />
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-border-dashed" />

                                {/* Permissions */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold uppercase text-text-tertiary tracking-wider">Permissions & Status</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-text-primary">Role</label>
                                            <select
                                                className="w-full px-3 py-2 bg-background-base border border-border-default rounded-lg outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                                                disabled={isReadOnly}
                                            >
                                                {ROLES.map(role => (
                                                    <option key={role.value} value={role.value}>{role.label}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-text-primary">Status</label>
                                            <select
                                                className="w-full px-3 py-2 bg-background-base border border-border-default rounded-lg outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
                                                disabled={isReadOnly}
                                            >
                                                {STATUSES.map(status => (
                                                    <option key={status.value} value={status.value}>{status.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {mode === 'view' && (
                                        <div className="mt-4 p-4 bg-primary-500/5 rounded-xl border border-primary-500/10">
                                            <div className="flex gap-2">
                                                <Label color={formData.role === 'Admin' ? 'primary' : 'secondary'}>{formData.role}</Label>
                                                <Label color={formData.status === 'Active' ? 'success' : 'error'}>{formData.status}</Label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-border-default bg-background-base/50 backdrop-blur-sm">
                            <div className="flex items-center justify-end gap-3">
                                <Button variant="ghost" onClick={onClose}>
                                    {mode === 'view' ? 'Close' : 'Cancel'}
                                </Button>
                                {!isReadOnly && (
                                    <Button
                                        variant="primary"
                                        onClick={(e) => handleSubmit(e as any)}
                                        loading={isSubmitting}
                                    >
                                        {mode === 'create' ? 'Create User' : 'Save Changes'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
