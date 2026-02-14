import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from '../pages/dashboard/DashboardPage';
import AnalyticsPage from '../pages/analytics/AnalyticsPage';
import UsersPage from '../pages/users/UsersPage';
import LoginPage from '../pages/auth/loginPage';
import { AuthGuard } from './providers/AuthGuard';
import ComingSoonPage from '../pages/common/ComingSoonPage';
import NotFoundPage from '../pages/common/NotFoundPage';

/**
 * Application Router
 */
export const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: (
            <AuthGuard>
                <DashboardPage />
            </AuthGuard>
        ),
    },
    {
        path: '/analytics',
        element: (
            <AuthGuard>
                <AnalyticsPage />
            </AuthGuard>
        ),
    },
    {
        path: '/users',
        element: (
            <AuthGuard>
                <UsersPage />
            </AuthGuard>
        ),
    },
    {
        path: '/files',
        element: (
            <AuthGuard>
                <ComingSoonPage title="Files" />
            </AuthGuard>
        ),
    },
    {
        path: '/settings',
        element: (
            <AuthGuard>
                <ComingSoonPage title="Settings" />
            </AuthGuard>
        ),
    },
    // --- Minimals Sidebar Placeholder Routes ---
    {
        path: '/ecommerce',
        element: (
            <AuthGuard>
                <ComingSoonPage title="Ecommerce" />
            </AuthGuard>
        ),
    },
    {
        path: '/banking',
        element: (
            <AuthGuard>
                <ComingSoonPage title="Banking" />
            </AuthGuard>
        ),
    },
    {
        path: '/booking',
        element: (
            <AuthGuard>
                <ComingSoonPage title="Booking" />
            </AuthGuard>
        ),
    },
    {
        path: '/courses',
        element: (
            <AuthGuard>
                <ComingSoonPage title="Courses" />
            </AuthGuard>
        ),
    },
    {
        path: '/products',
        element: (
            <AuthGuard>
                <ComingSoonPage title="Products" />
            </AuthGuard>
        ),
    },
    {
        path: '/orders',
        element: (
            <AuthGuard>
                <ComingSoonPage title="Orders" />
            </AuthGuard>
        ),
    },
    {
        path: '/orders/:id',
        element: (
            <AuthGuard>
                <ComingSoonPage title="Order Details" />
            </AuthGuard>
        ),
    },
    {
        path: '/invoices',
        element: (
            <AuthGuard>
                <ComingSoonPage title="Invoices" />
            </AuthGuard>
        ),
    },
    // --- 404 Fallback ---
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
