import React from 'react';
import { cn } from '../../../core/utils';
import {
    IconSearch,
    IconBell,
    IconSun,
    IconMoon,
    IconSettings,
    IconUsers,
} from '../../components/Icon';
import { useThemeStore } from '../../../store/theme.store';
import { useAuthStore } from '../../../store/authStore';
import { Dropdown, type DropdownItem } from '../../components/Dropdown';

export interface HeaderProps {
    title?: string;
    showSearch?: boolean;
    actions?: React.ReactNode;
}

/**
 * Header Component
 * 
 * Top app bar with search, notifications, theme dropdown, and user menu.
 */
export function Header({ title, showSearch = true, actions }: HeaderProps) {
    const { theme, setTheme } = useThemeStore();
    const { user, logout } = useAuthStore();

    const themeItems: DropdownItem[] = [
        {
            id: 'light',
            label: 'Light Mode',
            icon: <IconSun size={18} />,
            onClick: () => setTheme('light')
        },
        {
            id: 'dark',
            label: 'Dark Mode',
            icon: <IconMoon size={18} />,
            onClick: () => setTheme('dark')
        },
        {
            id: 'system',
            label: 'System Preference',
            icon: <IconSettings size={18} />,
            onClick: () => setTheme('system')
        },
    ];

    const userItems: DropdownItem[] = [
        { id: 'profile', label: 'My Profile', icon: <IconUsers size={18} /> },
        { id: 'settings', label: 'Settings', icon: <IconSettings size={18} /> },
        { id: 'logout', label: 'Sign Out', danger: true, onClick: logout },
    ];

    return (
        <header className="glass sticky top-0 z-40 h-16 flex items-center justify-between px-6 gap-4">
            {/* Title / Breadcrumb */}
            {title && (
                <h1 className="text-xl font-semibold text-text-primary hidden sm:block">
                    {title}
                </h1>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Search */}
            {showSearch && (
                <div className="relative max-w-md w-full">
                    <IconSearch
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
                    />
                    <input
                        type="search"
                        placeholder="Search anything..."
                        className={cn(
                            'w-full pl-10 pr-4 py-2 text-sm',
                            'bg-background-base border border-border-default rounded-xl',
                            'text-text-primary placeholder:text-text-tertiary',
                            'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
                            'transition-all duration-200'
                        )}
                    />
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
                {/* Theme Dropdown */}
                <Dropdown
                    trigger={
                        <button
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-text-secondary hover:bg-background-elevated hover:text-text-primary transition-all duration-200"
                            aria-label="Change theme"
                        >
                            {theme === 'light' ? <IconSun size={20} /> : <IconMoon size={20} />}
                        </button>
                    }
                    items={themeItems}
                />

                {/* Notifications */}
                <button
                    className="relative w-10 h-10 rounded-xl flex items-center justify-center text-text-secondary hover:bg-background-elevated hover:text-text-primary transition-all duration-200"
                    aria-label="Notifications"
                >
                    <IconBell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger-500 rounded-full border-2 border-background-surface" />
                </button>

                {/* User Menu */}
                <div className="flex items-center gap-3 ml-2 pl-2 border-l border-border-default">
                    <Dropdown
                        trigger={
                            <div className="flex items-center gap-3 cursor-pointer group">
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-semibold text-text-primary leading-tight group-hover:text-primary-600 transition-colors">
                                        {user?.name || 'Guest User'}
                                    </p>
                                    <p className="text-xs text-text-tertiary capitalize">
                                        {user?.role || 'Guest'}
                                    </p>
                                </div>
                                <div className="relative">
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-primary-500/20 transition-all shadow-sm"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm shadow-md transition-transform group-hover:scale-105">
                                            {user?.name?.substring(0, 2).toUpperCase() || 'GU'}
                                        </div>
                                    )}
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success-500 rounded-full border-2 border-background-surface shadow-sm" />
                                </div>
                            </div>
                        }
                        items={userItems}
                    />
                </div>

                {/* Custom Actions */}
                {actions}
            </div>
        </header>
    );
}
