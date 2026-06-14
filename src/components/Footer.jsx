'use client';

import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { FaPinterestP } from 'react-icons/fa6';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="w-full py-12 px-6 border-t transition-all duration-300"
            style={{ backgroundColor: 'var(--bg-footer)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
        >
            <div className="max-w-8xl pl-5 mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

                {/* LEFT COLUMN: LOGO, DESCRIPTION & SOCIALS */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                        {/* Logo */}
                        <Link href="/" className="text-4xl font-bold flex items-center tracking-tight select-none">
                            <span className="text-[#3b82f6] font-extrabold">hire</span>
                            <span className="text-[#f97316] font-medium">l</span>
                            <span className="text-[#2563eb] font-black text-3xl mx-[1px] -mt-[2px]">∞</span>
                            <span className="text-[#f97316] font-medium">p</span>
                        </Link>

                        {/* Description */}
                        <p className="text-sm max-w-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            The AI-native career platform. Built for people who take their work seriously.
                        </p>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex items-center space-x-3 pt-4 md:pt-0">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-lg transition-all border"
                            style={{
                                backgroundColor: 'var(--bg-surface)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-secondary)',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'var(--bg-hover)';
                                e.target.style.color = 'var(--text-primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'var(--bg-surface)';
                                e.target.style.color = 'var(--text-secondary)';
                            }}
                        >
                            <FaFacebookF size={16} />
                        </a>
                        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-lg text-white transition-all"
                            style={{ backgroundColor: '#4c3b8a' }}
                            onMouseEnter={(e) => { e.target.style.opacity = '0.85'; }}
                            onMouseLeave={(e) => { e.target.style.opacity = '1'; }}
                        >
                            <FaPinterestP size={16} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-lg transition-all border"
                            style={{
                                backgroundColor: 'var(--bg-surface)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-secondary)',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'var(--bg-hover)';
                                e.target.style.color = 'var(--text-primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'var(--bg-surface)';
                                e.target.style.color = 'var(--text-secondary)';
                            }}
                        >
                            <FaLinkedinIn size={16} />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-lg transition-all border"
                            style={{
                                backgroundColor: 'var(--bg-surface)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-secondary)',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'var(--bg-hover)';
                                e.target.style.color = 'var(--text-primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'var(--bg-surface)';
                                e.target.style.color = 'var(--text-secondary)';
                            }}
                        >
                            <FaGithub size={16} />
                        </a>
                    </div>
                </div>

                {/* RIGHT COLUMNS: LINKS */}
                <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">

                    {/* Column 1: Product */}
                    <div className="space-y-4">
                        <h3 className="font-semibold tracking-wider" style={{ color: 'var(--color-accent)' }}>Product</h3>
                        <ul className="space-y-2.5">
                            {['Job discovery', 'Worker AI', 'Companies', 'Salary data'].map((item, idx) => {
                                const hrefs = ['/job-discovery', '/worker-ai', '/companies', '/salary-data'];
                                return (
                                    <li key={idx}>
                                        <Link
                                            href={hrefs[idx]}
                                            className="transition-all"
                                            style={{ color: 'var(--text-secondary)' }}
                                            onMouseEnter={(e) => { e.target.style.color = 'var(--text-primary)'; }}
                                            onMouseLeave={(e) => { e.target.style.color = 'var(--text-secondary)'; }}
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Column 2: Navigations */}
                    <div className="space-y-4">
                        <h3 className="font-semibold tracking-wider" style={{ color: 'var(--color-accent)' }}>Navigations</h3>
                        <ul className="space-y-2.5">
                            {['Help center', 'Career library', 'Contact'].map((item, idx) => {
                                const hrefs = ['/help-center', '/career-library', '/contact'];
                                return (
                                    <li key={idx}>
                                        <Link
                                            href={hrefs[idx]}
                                            className="transition-all"
                                            style={{ color: 'var(--text-secondary)' }}
                                            onMouseEnter={(e) => { e.target.style.color = 'var(--text-primary)'; }}
                                            onMouseLeave={(e) => { e.target.style.color = 'var(--text-secondary)'; }}
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div className="space-y-4 col-span-2 sm:col-span-1">
                        <h3 className="font-semibold tracking-wider" style={{ color: 'var(--color-accent)' }}>Resources</h3>
                        <ul className="space-y-2.5">
                            {['Brand Guideline', 'Newsroom'].map((item, idx) => {
                                const hrefs = ['/brand-guideline', '/newsroom'];
                                return (
                                    <li key={idx}>
                                        <Link
                                            href={hrefs[idx]}
                                            className="transition-all"
                                            style={{ color: 'var(--text-secondary)' }}
                                            onMouseEnter={(e) => { e.target.style.color = 'var(--text-primary)'; }}
                                            onMouseLeave={(e) => { e.target.style.color = 'var(--text-secondary)'; }}
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                </div>
            </div>

            {/* BOTTOM AREA: COPYRIGHT & POLICIES */}
            <div
                className="max-w-7xl mx-auto mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
            >
                <p>Copyright {currentYear} —HireLoop</p>
                <div className="flex items-center space-x-4">
                    {['Terms & Policy', 'Privacy Guideline'].map((item, idx) => {
                        const hrefs = ['/terms', '/privacy'];
                        return (
                            <Link
                                key={idx}
                                href={hrefs[idx]}
                                className="transition-all"
                                style={{ color: 'var(--text-muted)' }}
                                onMouseEnter={(e) => { e.target.style.color = 'var(--text-secondary)'; }}
                                onMouseLeave={(e) => { e.target.style.color = 'var(--text-muted)'; }}
                            >
                                {item}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
}