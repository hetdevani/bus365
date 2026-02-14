import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from './app/providers/QueryProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { AuthProvider } from './app/providers/AuthProvider';
import { router } from './app/router';
import { ErrorBoundary } from './core/errorBoundary';
import { ToastProvider } from './designSystem/toasts';

/**
 * Main App Component
 * 
 * Production-grade application shell with:
 * - Global Error Boundary
 * - Theme Management
 * - Auth Context Management
 * - React Query for server state
 * - Toast Notifications
 * - React Router for navigation
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <QueryProvider>
            <ToastProvider />
            <RouterProvider router={router} />
          </QueryProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
