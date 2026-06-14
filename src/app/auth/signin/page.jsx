'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Sparkles, XCircle, CheckCircle } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

const SignIn = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const { data, error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
                callbackURL: '/',
            });

            if (error) {
                console.error('Signin error:', error);
                if (error.code === 'INVALID_EMAIL' || error.code === 'INVALID_PASSWORD') {
                    setError('Invalid email or password. Please try again.');
                } else if (error.code === 'USER_NOT_FOUND') {
                    setError('No account found with this email. Please sign up first.');
                } else {
                    setError(error.message || error.statusText || 'Invalid credentials. Please try again.');
                }
                return;
            }

            if (data) {
                setSuccess('Signed in successfully! Redirecting...');
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
            }
        } catch (err) {
            console.error('Signin exception:', err);
            if (err?.name === 'FetchError' || err?.message?.includes('fetch')) {
                setError('Network error. Please check your connection and try again.');
            } else {
                setError(err?.message || 'Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/dashboard',
            });
        } catch (err) {
            console.error('Google login failed:', err);
        }
    };

    return (
        <div
            className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-12 transition-all duration-300"
            style={{ backgroundColor: isLight ? 'var(--bg-base)' : '#0a0a0a' }}
        >
            <div
                className="w-full max-w-md space-y-6 rounded-3xl p-8 border shadow-xl transition-all duration-300"
                style={{
                    backgroundColor: isLight ? 'var(--bg-card)' : '#141414',
                    borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.5)',
                }}
            >
                {/* Back to Home */}
                <Link
                    href="/"
                    className="inline-flex items-center space-x-1.5 text-xs font-medium transition-all duration-200"
                    style={{ color: isLight ? 'var(--text-muted)' : '#6b7280' }}
                    onMouseEnter={(e) => e.target.style.color = isLight ? 'var(--text-primary)' : '#e5e7eb'}
                    onMouseLeave={(e) => e.target.style.color = isLight ? 'var(--text-muted)' : '#6b7280'}
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to home</span>
                </Link>

                {/* Header */}
                <div className="text-center space-y-2">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-2"
                        style={{
                            backgroundColor: isLight ? 'var(--bg-elevated)' : 'rgba(99,102,241,0.08)',
                            borderColor: isLight ? 'var(--border-color)' : 'rgba(99,102,241,0.2)',
                            color: isLight ? 'var(--color-accent)' : '#818cf8',
                        }}
                    >
                        <Sparkles className="w-3 h-3" />
                        <span>Welcome Back</span>
                    </div>
                    <h2
                        className="text-3xl font-bold tracking-tight transition-all duration-300"
                        style={{ color: isLight ? 'var(--text-primary)' : '#ffffff' }}
                    >
                        Sign in to your account
                    </h2>
                    <p
                        className="text-sm transition-all duration-300"
                        style={{ color: isLight ? 'var(--text-muted)' : '#9ca3af' }}
                    >
                        Welcome back! Please enter your credentials.
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div
                        className="rounded-xl p-4 text-sm border flex items-center space-x-2"
                        style={{
                            backgroundColor: isLight ? '#f0fdf4' : 'rgba(16,185,129,0.1)',
                            borderColor: isLight ? '#86efac' : 'rgba(16,185,129,0.2)',
                            color: '#059669',
                        }}
                    >
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{success}</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div
                        className="rounded-xl p-4 text-sm border flex items-center space-x-2"
                        style={{
                            backgroundColor: isLight ? '#fef2f2' : 'rgba(239,68,68,0.1)',
                            borderColor: isLight ? '#fecaca' : 'rgba(239,68,68,0.2)',
                            color: '#dc2626',
                        }}
                    >
                        <XCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSignIn}>
                    {/* Email Input */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-1.5 transition-all duration-300"
                            style={{ color: isLight ? 'var(--text-secondary)' : '#d1d5db' }}
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5"
                                style={{ color: isLight ? 'var(--text-muted)' : '#6b7280' }}>
                                <Mail size={18} />
                            </span>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full rounded-xl py-2.5 pl-10 pr-3 text-sm transition-all duration-200 border"
                                style={{
                                    backgroundColor: isLight ? 'var(--bg-input)' : '#1a1a1a',
                                    borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)',
                                    color: isLight ? 'var(--text-primary)' : '#f1f5f9',
                                }}
                                placeholder="you@example.com"
                                onFocus={(e) => e.target.style.borderColor = isLight ? 'var(--color-primary)' : '#6366f1'}
                                onBlur={(e) => e.target.style.borderColor = isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)'}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-1.5 transition-all duration-300"
                            style={{ color: isLight ? 'var(--text-secondary)' : '#d1d5db' }}
                        >
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5"
                                style={{ color: isLight ? 'var(--text-muted)' : '#6b7280' }}>
                                <Lock size={18} />
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full rounded-xl py-2.5 pl-10 pr-10 text-sm transition-all duration-200 border"
                                style={{
                                    backgroundColor: isLight ? 'var(--bg-input)' : '#1a1a1a',
                                    borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)',
                                    color: isLight ? 'var(--text-primary)' : '#f1f5f9',
                                }}
                                placeholder="••••••••"
                                onFocus={(e) => e.target.style.borderColor = isLight ? 'var(--color-primary)' : '#6366f1'}
                                onBlur={(e) => e.target.style.borderColor = isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)'}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3.5 transition-all duration-200"
                                style={{ color: isLight ? 'var(--text-muted)' : '#6b7280' }}
                                onMouseEnter={(e) => e.target.style.color = isLight ? 'var(--text-primary)' : '#e5e7eb'}
                                onMouseLeave={(e) => e.target.style.color = isLight ? 'var(--text-muted)' : '#6b7280'}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative flex w-full justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50"
                        style={{
                            background: 'linear-gradient(to right, var(--color-accent-hover), var(--color-accent))',
                        }}
                    >
                        {loading ? (
                            <span className="flex items-center space-x-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                <span>Signing in...</span>
                            </span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* Don't have account? */}
                <p
                    className="text-center text-sm transition-all duration-300"
                    style={{ color: isLight ? 'var(--text-muted)' : '#6b7280' }}
                >
                    {`Don't have an account?`}{' '}
                    <Link
                        href="/auth/signup"
                        className="font-semibold transition-all duration-200"
                        style={{ color: isLight ? 'var(--color-accent)' : '#818cf8' }}
                        onMouseEnter={(e) => e.target.style.color = isLight ? 'var(--color-accent-hover)' : '#a78bfa'}
                        onMouseLeave={(e) => e.target.style.color = isLight ? 'var(--color-accent)' : '#818cf8'}
                    >
                        Sign up
                    </Link>
                </p>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t"
                            style={{ borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)' }} />
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span
                            className="px-3 transition-all duration-300"
                            style={{
                                backgroundColor: isLight ? 'var(--bg-card)' : '#141414',
                                color: isLight ? 'var(--text-muted)' : '#6b7280',
                            }}
                        >
                            Or continue with
                        </span>
                    </div>
                </div>

                {/* Google Login Button */}
                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="flex w-full items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 border transform hover:scale-[1.01]"
                    style={{
                        backgroundColor: isLight ? 'var(--bg-input)' : '#1a1a1a',
                        borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)',
                        color: isLight ? 'var(--text-secondary)' : '#d1d5db',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = isLight ? 'var(--color-primary-light)' : '#6366f1';
                        e.currentTarget.style.backgroundColor = isLight ? '#f8faff' : '#222222';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)';
                        e.currentTarget.style.backgroundColor = isLight ? 'var(--bg-input)' : '#1a1a1a';
                    }}
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default SignIn;