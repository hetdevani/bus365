import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../core/utils';
import {
    IconApp,
    IconEcommerce,
    IconAnalytics,
    IconBanking,
    IconBooking,
    IconFile,
    IconCourse,
    IconUsers,
    IconProduct,
    IconOrder,
    IconInvoice,
    IconLogo,
    IconChevronRight,
    IconDot,
    IconChevronLeft,
} from '../../components/Icon';

export interface SidebarSubItem {
    id: string;
    label: string;
    href: string;
}

export interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    href?: string;
    children?: SidebarSubItem[];
}

export interface SidebarGroup {
    id: string;
    label?: string; // Optional header (e.g., "OVERVIEW")
    items: SidebarItem[];
}

export interface SidebarProps {
    groups?: SidebarGroup[];
    collapsed?: boolean;
    onCollapse?: (collapsed: boolean) => void;
}

export function Sidebar({ groups = defaultSidebarGroups, collapsed = false, onCollapse }: SidebarProps) {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(collapsed);
    const [isHovered, setIsHovered] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState<string[]>(['order']); // Default expand 'order' for demo

    // Open menus automatically if active child
    useEffect(() => {
        groups.forEach(group => {
            group.items.forEach(item => {
                if (item.children?.some(child => child.href === location.pathname)) {
                    setExpandedMenus(prev => prev.includes(item.id) ? prev : [...prev, item.id]);
                }
            });
        });
    }, [location.pathname, groups]);

    const isExpanded = !isCollapsed || isHovered;

    const toggleCollapse = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        onCollapse?.(newState);
    };

    const toggleMenu = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setExpandedMenus(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <motion.aside
            initial={false}
            animate={{
                width: isExpanded ? 280 : 88,
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            onMouseEnter={() => isCollapsed && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                'fixed left-0 top-0 h-screen z-[100]',
                'bg-background-base border-r border-border-dashed', // Use dashed border like Minimals
                'flex flex-col select-none transition-all duration-300'
            )}
        >
            {/* Top Logo Section */}
            <div className="h-20 flex items-center px-5 shrink-0 relative">
                <Link to="/" className="flex items-center gap-4 group">
                    <IconLogo size={40} className="transition-transform group-hover:scale-110" />
                </Link>

                {/* Collapse Toggle - Only visible when expanded or hovered */}
                <AnimatePresence>
                    {(isExpanded) && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleCollapse}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-border-subtle flex items-center justify-center text-text-tertiary hover:text-text-primary hover:border-text-primary transition-all p-1"
                        >
                            {isCollapsed ? <IconChevronRight size={14} /> : <IconChevronLeft size={14} />}
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Scrollable Nav Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar py-4 px-4 pb-20 hover:overflow-y-auto">
                {groups.map((group, groupIndex) => (
                    <div key={group.id} className={cn("mb-6", groupIndex !== 0 && "mt-6")}>
                        {/* Section Header */}
                        {isExpanded && group.label && (
                            <div className="px-3 mb-2">
                                <span className="text-[11px] font-bold text-text-disabled uppercase tracking-wider pl-1">
                                    {group.label}
                                </span>
                            </div>
                        )}

                        {/* Items */}
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const isActive = item.href ? location.pathname === item.href : false;
                                const isMenuOpen = expandedMenus.includes(item.id);
                                const hasChildren = !!item.children;
                                const activeChild = item.children?.some(c => c.href === location.pathname);

                                return (
                                    <div key={item.id}>
                                        <div className="relative">
                                            <Component
                                                as={item.href ? Link : 'div'}
                                                to={item.href}
                                                onClick={hasChildren ? (e: any) => toggleMenu(item.id, e) : undefined}
                                                className={cn(
                                                    'flex items-center min-h-[44px] px-3.5 py-2.5 rounded-lg cursor-pointer transition-colors duration-200',
                                                    // Active State Logic
                                                    (isActive || activeChild)
                                                        ? 'bg-primary-500/10 text-primary-600'
                                                        : 'text-text-secondary hover:bg-neutral-500/5 hover:text-text-primary'
                                                )}
                                            >
                                                {/* Icon */}
                                                <span className={cn(
                                                    "flex-shrink-0 transition-all duration-200",
                                                    (isActive || activeChild) ? "text-primary-600" : "text-text-secondary"
                                                )}>
                                                    {isExpanded ? item.icon : React.isValidElement(item.icon) && React.cloneElement(item.icon, { size: 24 } as any)}
                                                </span>

                                                {/* Label */}
                                                {isExpanded && (
                                                    <span className={cn(
                                                        "ml-4 text-[14px] font-medium flex-1 truncate",
                                                        (isActive || activeChild) && "font-semibold"
                                                    )}>
                                                        {item.label}
                                                    </span>
                                                )}

                                                {/* Chevron for Submenu */}
                                                {isExpanded && hasChildren && (
                                                    <IconChevronRight
                                                        size={16}
                                                        className={cn(
                                                            "ml-2 transition-transform duration-200 text-text-tertiary",
                                                            isMenuOpen && "rotate-90"
                                                        )}
                                                    />
                                                )}
                                            </Component>
                                        </div>

                                        {/* Submenu */}
                                        <AnimatePresence>
                                            {isExpanded && hasChildren && isMenuOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="mt-1 space-y-1">
                                                        {item.children!.map((child) => {
                                                            const isChildActive = location.pathname === child.href;
                                                            return (
                                                                <Link
                                                                    key={child.id}
                                                                    to={child.href}
                                                                    className={cn(
                                                                        "flex items-center min-h-[36px] pl-[58px] pr-3 py-1.5 rounded-lg text-sm transition-colors relative",
                                                                        isChildActive
                                                                            ? "text-text-primary font-semibold"
                                                                            : "text-text-secondary hover:text-text-primary"
                                                                    )}
                                                                >
                                                                    {/* Dot Indicator */}
                                                                    <div className={cn(
                                                                        "w-1 h-1 rounded-full absolute left-[34px] transition-all duration-200",
                                                                        isChildActive
                                                                            ? "bg-primary-600 scale-150"
                                                                            : "bg-text-disabled"
                                                                    )} />
                                                                    <span className="truncate">{child.label}</span>
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* User Profile Mini (Optional footer) */}
            {isExpanded && (
                <div className="p-4 mt-auto">
                    <div className="bg-neutral-500/5 p-4 rounded-xl text-center">
                        <h6 className="text-xs font-bold text-text-primary">Free Version</h6>
                        <button className="mt-2 text-[11px] font-bold text-white bg-primary-600 px-4 py-1.5 rounded-lg shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-colors w-full">
                            Upgrade to Pro
                        </button>
                    </div>
                </div>
            )}
        </motion.aside>
    );
}

// Helper for dynamic component rendering
const Component = ({ as: C, ...props }: any) => <C {...props} />;

/**
 * Minimals Sidebar Configuration
 */
export const defaultSidebarGroups: SidebarGroup[] = [
    {
        id: 'overview',
        label: 'OVERVIEW',
        items: [
            { id: 'app', label: 'App', icon: <IconApp />, href: '/' },
            { id: 'ecommerce', label: 'Ecommerce', icon: <IconEcommerce />, href: '/ecommerce' },
            { id: 'analytics', label: 'Analytics', icon: <IconAnalytics />, href: '/analytics' },
            { id: 'banking', label: 'Banking', icon: <IconBanking />, href: '/banking' },
            { id: 'booking', label: 'Booking', icon: <IconBooking />, href: '/booking' },
            { id: 'file', label: 'File', icon: <IconFile />, href: '/files' },
            { id: 'course', label: 'Course', icon: <IconCourse />, href: '/courses' },
        ]
    },
    {
        id: 'management',
        label: 'MANAGEMENT',
        items: [
            { id: 'user', label: 'User', icon: <IconUsers />, href: '/users' },
            { id: 'product', label: 'Product', icon: <IconProduct />, href: '/products' },
            {
                id: 'order',
                label: 'Order',
                icon: <IconOrder />,
                // No href for parent menu
                children: [
                    { id: 'order-list', label: 'List', href: '/orders' },
                    { id: 'order-details', label: 'Details', href: '/orders/1' },
                ]
            },
            { id: 'invoice', label: 'Invoice', icon: <IconInvoice />, href: '/invoices' },
        ]
    }
];
