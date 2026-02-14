import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../designSystem/components/Button';
import { Input } from '../../designSystem/components/Input';
import { IconMoon, IconSun } from '../../designSystem/components/Icon';
import { useThemeStore } from '../../store/theme.store';
import { toast } from '../../designSystem/toasts';

/**
 * Login Page - Minimals Clone
 */
export default function LoginPage() {
    const [email, setEmail] = useState('demo@minimals.cc');
    const [password, setPassword] = useState('demo1234');
    const [showPassword, setShowPassword] = useState(false);

    const { login, isLoading, isAuthenticated, error, clearError } = useAuthStore();
    const { theme, toggleTheme } = useThemeStore();

    // Redirect if already authenticated
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        if (!email || !password) {
            toast.error('Please enter your credentials');
            return;
        }

        await login(email, password);

        if (useAuthStore.getState().isAuthenticated) {
            toast.success('Login success!');
        }
    };

    return (
        <div className="min-h-screen w-full flex overflow-hidden bg-background-base">
            {/* Logo - Fixed Top Left */}
            <div className="fixed top-8 left-8 z-50">
                <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-500/30">
                    M
                </div>
            </div>

            {/* Theme Toggle - Fixed Top Right (Mobile/Tablet) */}
            <div className="fixed top-6 right-6 z-50 md:hidden">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-background-surface border border-border-default text-text-secondary"
                >
                    {theme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
                </button>
            </div>

            {/* Left Side - Illustration (Desktop Only) */}
            <div className="hidden md:flex flex-col flex-1 relative bg-background-surface m-4 rounded-3xl overflow-hidden shadow-premium items-center justify-center p-12">
                <div className="max-w-md text-center z-10">
                    <h3 className="text-3xl font-black text-text-primary mb-4 leading-tight">
                        Hi, Welcome Back
                    </h3>
                    <p className="text-text-secondary mb-12">
                        More effectively with optimized workflows.
                    </p>
                    <img
                        src="C:/Users/DREAMWORLD/.gemini/antigravity/brain/5cd35844-eea3-4b19-9d57-9eb09b554c3b/minimals_login_illustration_1768475232905.png"
                        alt="Dashboard Illustration"
                        className="w-full object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                    />
                </div>

                {/* Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background-base/5 pointer-events-none" />
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:px-12 lg:px-24">
                <div className="w-full max-w-[480px]">

                    {/* Header */}
                    <div className="mb-8">
                        <h4 className="text-2xl font-bold text-text-primary mb-2">Sign in to Minimal</h4>
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                            <span>New user?</span>
                            <Link to="#" className="text-primary-500 font-semibold hover:underline">
                                Create an account
                            </Link>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="flex gap-4 mb-8">
                        <SocialButton icon="google" />
                        <SocialButton icon="github" />
                        <SocialButton icon="twitter" />
                    </div>

                    <div className="relative mb-8 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border-default/60"></div>
                        </div>
                        <span className="relative px-3 bg-background-base text-xs font-bold text-text-tertiary uppercase tracking-wider">
                            OR
                        </span>
                    </div>

                    {error && (
                        <div className="mb-6 px-4 py-3 bg-danger-50 text-danger-700 text-sm rounded-lg border border-danger-500/20 flex items-center gap-2">
                            <span className="font-bold">Error:</span> {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Email address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            className="bg-transparent"
                            placeholder="demo@minimals.cc"
                        />

                        <div className="space-y-1">
                            <Input
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                className="bg-transparent"
                                placeholder="Min 8+ chars"
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-text-tertiary hover:text-text-secondary text-xs uppercase font-bold"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                }
                            />
                            <div className="flex justify-end">
                                <Link to="#" className="text-xs font-bold text-text-secondary hover:text-text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            loading={isLoading}
                            className="h-12 text-base shadow-lg shadow-primary-500/25"
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function SocialButton({ icon }: { icon: 'google' | 'github' | 'twitter' }) {
    return (
        <button className="flex-1 flex items-center justify-center p-2.5 rounded-lg border border-border-subtle hover:bg-neutral-500/5 hover:border-border-default transition-all duration-200">
            {icon === 'google' && <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#DB4437" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>}
            {icon === 'github' && <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>}
            {icon === 'twitter' && <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#1C9CEA" d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" /></svg>}
        </button>
    );
}
