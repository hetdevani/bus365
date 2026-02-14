import React from 'react';
import { PageLayout } from '../../designSystem/layouts/PageLayout';
import { EmptyState } from '../../designSystem/components/EmptyState';
import { IconSettings } from '../../designSystem/components/Icon';
import { Link } from 'react-router-dom';

interface ComingSoonPageProps {
    title: string;
}

export default function ComingSoonPage({ title }: ComingSoonPageProps) {
    return (
        <PageLayout title={title}>
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <EmptyState
                    icon={<IconSettings size={64} className="text-secondary-400" />}
                    title="Coming Soon"
                    description={`The ${title} module is currently under development. Stay tuned for updates!`}
                    action={
                        <Link to="/" className="px-4 py-2 text-sm font-bold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30">
                            Go back to Dashboard
                        </Link>
                    }
                />
            </div>
        </PageLayout>
    );
}
