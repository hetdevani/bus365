import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background-base p-6">
            <div className="text-center max-w-md mx-auto">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-9xl font-black text-primary-500/20 mb-4 select-none">404</h1>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-text-primary mb-2">Page Not Found</h2>
                    <p className="text-text-secondary mb-8 text-lg">
                        Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL?
                    </p>

                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-0.5"
                    >
                        Go to Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
