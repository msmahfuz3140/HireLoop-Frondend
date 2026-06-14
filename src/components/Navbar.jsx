'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useSession, signOut } from '@/lib/auth-client';

const UserAvatar = ({ session, isDropdownOpen, setIsDropdownOpen, handleLogout }) => {
    const getUserInitial = () => {
        if (session?.user?.name) {
            return session.user.name.charAt(0).toUpperCase();
        }
        if (session?.user?.email) {
            return session.user.email.charAt(0).toUpperCase();
        }
        return 'M';
    };

    const initial = getUserInitial();
    const hasImage = session?.user?.image;

    return (
        <div className="relative">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                    backgroundColor: hasImage ? 'transparent' : 'var(--color-accent)',
                    border: hasImage ? '2px solid var(--border-color)' : 'none',
                }}
            >
                {hasImage ? (
                    <Image
                        src={session.user.image}
                        alt="User avatar"
                        width={40}
                        height={40}
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : (
                    <span className="text-white font-semibold text-lg">
                        {initial}
                    </span>
                )}
            </button>

            {isDropdownOpen && (
                <div
                    className="absolute right-0 mt-2 w-56 rounded-xl border shadow-xl z-50"
                    style={{
                        backgroundColor: 'var(--bg-elevated)',
                        borderColor: 'var(--border-color)',
                        maxWidth: '280px',
                    }}
                >
                    <div className="p-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <p
                            className="text-sm font-medium truncate"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            {session?.user?.name || session?.user?.email}
                        </p>
                        <p
                            className="text-xs truncate"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            {session?.user?.email}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm transition-colors hover:bg-opacity-50"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'var(--bg-hover)';
                            e.target.style.color = 'var(--text-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = 'var(--text-secondary)';
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const { data: session } = useSession();

    const navLinks = [
        { name: 'Browse Jobs', href: '/browse-jobs' },
        { name: 'Company', href: '/company' },
        { name: 'Pricing', href: '/pricing' },
    ];

    const isActive = (path) => pathname === path;

    const handleLogout = async () => {
        await signOut();
        setIsDropdownOpen(false);
    };

    return (
        <nav
            className="w-full px-4 py-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 transition-all duration-300"
            style={{ backgroundColor: 'var(--bg-navbar)', borderBottom: '1px solid var(--border-color)' }}
        >
            <div
                className="max-w-8xl mx-auto flex items-center justify-between px-6 py-3 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300"
                style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}
            >
                {/* LOGO AREA */}
                <div className="flex items-center">
                    <Link href="/" className="text-2xl font-bold flex items-center tracking-tight select-none">
                        <span className="text-[#3b82f6] font-extrabold">hire</span>
                        <span className="text-[#f97316] font-medium">l</span>
                        <span className="text-[#2563eb] font-black text-3xl mx-[1px] -mt-[2px] animate-pulse">∞</span>
                        <span className="text-[#f97316] font-medium">p</span>
                    </Link>
                </div>

                {/* DESKTOP NAV ITEMS */}
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative py-1 transition-all duration-300 ${isActive(link.href) ? 'font-semibold' : ''}`}
                            style={{
                                color: isActive(link.href) ? 'var(--nav-text-active)' : 'var(--nav-text)',
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive(link.href)) e.target.style.color = 'var(--nav-text-hover)';
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive(link.href)) e.target.style.color = 'var(--nav-text)';
                            }}
                        >
                            {link.name}
                            {isActive(link.href) && (
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3b82f6] to-[#f97316] rounded-full transform scale-x-100 transition-transform" />
                            )}
                        </Link>
                    ))}

                    {/* Vertical Divider */}
                    <span className="h-5 w-[1px]" style={{ backgroundColor: 'var(--border-color)' }}></span>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                        style={{
                            backgroundColor: 'var(--bg-surface)',
                            color: 'var(--nav-text)',
                            border: '1px solid var(--border-color)',
                        }}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    {/* Auth Buttons */}
                    {session ? (
                        <UserAvatar
                            session={session}
                            isDropdownOpen={isDropdownOpen}
                            setIsDropdownOpen={setIsDropdownOpen}
                            handleLogout={handleLogout}
                        />
                    ) : (
                        <>
                            <Link
                                href="/auth/signin"
                                className="transition-colors font-semibold"
                                style={{
                                    color: isActive('/signin') ? 'var(--nav-text-active)' : 'var(--color-accent)',
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive('/signin')) e.target.style.color = 'var(--color-accent-hover)';
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive('/signin')) e.target.style.color = 'var(--color-accent)';
                                }}
                            >
                                Sign In
                            </Link>

                            <Link
                                href="/auth/signup"
                                className="text-white px-5 py-2.5 rounded-full transition-all duration-300 font-medium text-sm transform hover:-translate-y-[1px]"
                                style={{
                                    background: 'linear-gradient(to right, var(--color-accent-hover), var(--color-accent))',
                                }}
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* MOBILE: Theme Toggle + Hamburger */}
                <div className="md:hidden flex items-center space-x-2">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full transition-all duration-300"
                        style={{
                            backgroundColor: 'var(--bg-surface)',
                            color: 'var(--nav-text)',
                            border: '1px solid var(--border-color)',
                        }}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-1 rounded-lg focus:outline-none"
                        style={{
                            color: 'var(--nav-text)',
                            backgroundColor: 'var(--bg-surface)',
                            border: '1px solid var(--border-color)',
                        }}
                        aria-label="Toggle Menu"
                    >
                        <svg className="h-6 w-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* MOBILE MENU DROP DOWN */}
            {isOpen && (
                <div
                    className="md:hidden mt-3 rounded-2xl border p-4 space-y-2 shadow-2xl transition-all duration-300"
                    style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2.5 rounded-xl transition-all"
                            style={{
                                backgroundColor: isActive(link.href) ? 'var(--bg-hover)' : 'transparent',
                                color: isActive(link.href) ? 'var(--nav-text-active)' : 'var(--nav-text)',
                                borderLeft: isActive(link.href) ? '4px solid var(--color-primary)' : '4px solid transparent',
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive(link.href)) {
                                    e.target.style.backgroundColor = 'var(--bg-hover)';
                                    e.target.style.color = 'var(--nav-text-active)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive(link.href)) {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = 'var(--nav-text)';
                                }
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <hr style={{ borderColor: 'var(--border-color)' }} className="my-3" />

                    {session ? (
                        <>
                            <div className="px-4 py-2">
                                <UserAvatar
                                    session={session}
                                    isDropdownOpen={isDropdownOpen}
                                    setIsDropdownOpen={setIsDropdownOpen}
                                    handleLogout={handleLogout}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/auth/signin"
                                onClick={() => setIsOpen(false)}
                                className="block text-center px-4 py-2.5 rounded-xl font-semibold transition-all"
                                style={{
                                    backgroundColor: isActive('/signin') ? 'var(--bg-hover)' : 'transparent',
                                    color: isActive('/signin') ? 'var(--nav-text-active)' : 'var(--color-accent)',
                                }}
                            >
                                Sign In
                            </Link>

                            <Link
                                href="/auth/signup"
                                onClick={() => setIsOpen(false)}
                                className="block text-center text-white px-4 py-2.5 rounded-xl font-medium shadow-lg"
                                style={{
                                    background: 'linear-gradient(to right, var(--color-accent-hover), var(--color-accent))',
                                }}
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}