'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useState, useEffect, useRef } from 'react';

export default function CtaBannerSection() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-32 px-6 overflow-hidden transition-all duration-500"
            style={{ backgroundColor: isLight ? 'var(--bg-surface)' : '#0d0d0d' }}
        >
            {/* BACKGROUND IMAGE */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    animation: 'globePulse 8s ease-in-out infinite',
                }}
            >
                <Image
                    src="/images/cta-bg.png"
                    alt=""
                    fill
                    className="object-cover object-top select-none pointer-events-none"
                    style={{
                        opacity: isLight ? 0.10 : 0.20,
                        filter: 'brightness(1.3) contrast(1.1)',
                    }}
                    priority
                    quality={100}
                    sizes="100vw"
                />
            </div>

            {/* ANIMATED GLOW EFFECT (StatsSection er moto) */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background: isLight
                        ? `
                            radial-gradient(ellipse 100% 60% at 50% 30%, rgba(99,102,241,0.15) 0%, transparent 70%),
                            radial-gradient(ellipse 80% 50% at 50% 80%, rgba(59,130,246,0.08) 0%, transparent 60%)
                          `
                        : `
                            radial-gradient(ellipse 100% 60% at 50% 30%, rgba(100,50,255,0.30) 0%, transparent 70%),
                            radial-gradient(ellipse 80% 50% at 50% 80%, rgba(59,130,246,0.15) 0%, transparent 60%)
                          `,
                    animation: 'glowPulse 5s ease-in-out infinite alternate',
                }}
            />

            {/* VIGNETTE OVERLAY */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background: isLight
                        ? 'radial-gradient(ellipse at center, transparent 40%, rgba(255,255,255,0.5) 100%)'
                        : 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
                    pointerEvents: 'none',
                }}
            />

            {/* CONTENT */}
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
                {/* Heading with fade-up */}
                <h2
                    className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.15] max-w-3xl mb-6 transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ color: isLight ? 'var(--text-primary)' : '#ffffff' }}
                >
                    Your next role is{' '}
                    <br />
                    <span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage: isLight
                                ? 'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
                                : 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                        }}
                    >
                        already looking
                    </span>{' '}
                    for you
                </h2>

                {/* Subtitle with fade-up (slightly delayed) */}
                <p
                    className={`text-sm sm:text-base max-w-xl leading-relaxed mb-10 transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                        color: isLight ? 'var(--text-secondary)' : '#9ca3af',
                        transitionDelay: '150ms',
                    }}
                >
                    Build a profile in three minutes. The matches start arriving tomorrow morning.
                </p>

                {/* Buttons with fade-up (more delayed) */}
                <div
                    className={`flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: '300ms' }}
                >
                    <Link
                        href="/signup"
                        className="w-full sm:w-auto font-semibold px-8 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-xl text-center transform hover:scale-[1.03]"
                        style={{
                            backgroundColor: isLight ? 'var(--text-primary)' : '#ffffff',
                            color: isLight ? '#ffffff' : '#000000',
                        }}
                    >
                        Create a free account
                    </Link>

                    <Link
                        href="/pricing"
                        className="w-full sm:w-auto font-medium px-8 py-3.5 rounded-xl text-sm border transition-all duration-200 text-center backdrop-blur-sm transform hover:scale-[1.03]"
                        style={{
                            backgroundColor: isLight ? 'var(--bg-elevated)' : 'rgba(20,17,24,0.8)',
                            borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)',
                            color: isLight ? 'var(--text-secondary)' : '#d1d5db',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = isLight ? 'var(--bg-hover)' : 'rgba(26,22,34,0.9)';
                            e.currentTarget.style.color = isLight ? 'var(--text-primary)' : '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = isLight ? 'var(--bg-elevated)' : 'rgba(20,17,24,0.8)';
                            e.currentTarget.style.color = isLight ? 'var(--text-secondary)' : '#d1d5db';
                        }}
                    >
                        View pricing
                    </Link>
                </div>
            </div>
        </section>
    );
}