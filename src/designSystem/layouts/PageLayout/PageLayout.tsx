import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';

export interface PageLayoutProps {
    children: React.ReactNode;
    title?: string;
    showTopBar?: boolean; // Controls the global app bar (Search, Profile)
    showPageHeader?: boolean; // Controls the page title and page actions
    showSidebar?: boolean;
    headerActions?: React.ReactNode;
}

export function PageLayout({
    children,
    title,
    showTopBar = true,
    showPageHeader = true,
    showSidebar = true,
    headerActions,
}: PageLayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-background-base flex">
            {/* Sidebar */}
            {showSidebar && (
                <Sidebar
                    collapsed={sidebarCollapsed}
                    onCollapse={setSidebarCollapsed}
                />
            )}

            {/* Main Content Area */}
            <motion.div
                layout
                initial={false}
                animate={{
                    marginLeft: showSidebar ? (sidebarCollapsed ? 88 : 280) : 0,
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="flex-1 flex flex-col min-w-0"
            >
                {/* Global Top Bar */}
                {showTopBar && (
                    <Header showSearch={true} />
                )}

                {/* Page Content */}
                <main className="p-8 max-w-[1600px] mx-auto w-full">
                    {/* Page Header (Title & Actions) */}
                    {showPageHeader && (title || headerActions) && (
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 fade-in">
                            {title && (
                                <div>
                                    <h1 className="text-2xl font-black text-text-primary tracking-tight">
                                        {title}
                                    </h1>
                                    {/* Breadcrumbs can go here later */}
                                </div>
                            )}
                            {headerActions && (
                                <div className="flex items-center gap-3">
                                    {headerActions}
                                </div>
                            )}
                        </div>
                    )}

                    {children}
                </main>
            </motion.div>
        </div>
    );
}
