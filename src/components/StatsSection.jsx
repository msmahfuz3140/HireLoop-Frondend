'use client';

import { useState, useEffect, useRef } from 'react';
import { BriefcaseBusiness, Building2, UsersRound, ThumbsUp } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';

export default function StatsSection() {
    const { theme } = useTheme();
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const isLight = theme === 'light';

    const statsData = [
        {
            icon: BriefcaseBusiness,
            value: '50K',
            label: 'Active Jobs',
            delay: '0ms',
        },
        {
            icon: Building2,
            value: '12K',
            label: 'Companies',
            delay: '150ms',
        },
        {
            icon: UsersRound,
            value: '2M',
            label: 'Job Seekers',
            delay: '300ms',
        },
        {
            icon: ThumbsUp,
            value: '97%',
            label: 'Satisfaction Rate',
            delay: '450ms',
        },
    ];

    // Intersection Observer for scroll animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-24 px-6 overflow-hidden"
        >
            {/* BACKGROUND IMAGE - Main visual element */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    animation: 'globePulse 6s ease-in-out infinite',
                }}
            >
                <Image
                    src="/images/globe.png"
                    alt=""
                    fill
                    className="object-cover object-center select-none pointer-events-none"
                    style={{
                        opacity: isLight ? 0.25 : 0.40,
                        filter: 'brightness(1.3) contrast(1.2) saturate(1.1)',
                    }}
                    priority
                    quality={100}
                    sizes="100vw"
                />
            </div>

            {/* ANIMATED GLOW RADIATING FROM IMAGE */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background: isLight
                        ? `
                            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,130,246,0.12) 0%, transparent 60%),
                            radial-gradient(ellipse 60% 40% at 50% 60%, rgba(139,92,246,0.08) 0%, transparent 50%)
                          `
                        : `
                            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,130,246,0.20) 0%, transparent 60%),
                            radial-gradient(ellipse 60% 40% at 50% 60%, rgba(139,92,246,0.15) 0%, transparent 50%)
                          `,
                    animation: 'glowPulse 4s ease-in-out infinite alternate',
                }}
            />

            {/* VIGNETTE OVERLAY - image edges smooth korar jonno */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background: isLight
                        ? 'radial-gradient(ellipse at center, transparent 50%, rgba(255,255,255,0.6) 100%)'
                        : 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)',
                    pointerEvents: 'none',
                }}
            />

            {/* CONTENT */}
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
                {/* Heading with fade-up animation */}
                <div
                    className={`transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl text-center leading-tight mb-6 max-w-3xl font-semibold tracking-tight"
                        style={{ color: isLight ? 'var(--text-primary)' : '#f1f5f9' }}
                    >
                        Assisting over{' '}
                        <span
                            className="font-extrabold bg-clip-text text-transparent"
                            style={{
                                backgroundImage: isLight
                                    ? 'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
                                    : 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                            }}
                        >
                            15,000 job seekers
                        </span>{' '}
                        find their dream positions.
                    </h2>
                    <p
                        className="text-base md:text-lg text-center max-w-xl mx-auto mb-16"
                        style={{ color: isLight ? 'var(--text-muted)' : '#94a3b8' }}
                    >
                        Our platform connects top talent with leading companies worldwide.
                    </p>
                </div>

                {/* STATS CARDS GRID */}
                <div className="w-full max-w-sm sm:max-w-none mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
                    {statsData.map((stat, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl p-6 md:p-8 border transition-all duration-700 ease-out flex flex-col items-center justify-center text-center ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                            }`}
                            style={{
                                transitionDelay: stat.delay,
                                backgroundColor: isLight ? 'var(--bg-card)' : '#141014',
                                borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.5)',
                                boxShadow: isLight
                                    ? '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)'
                                    : '0 4px 20px rgba(0,0,0,0.2)',
                                backdropFilter: isLight ? 'none' : 'blur(4px)',
                            }}
                            onMouseEnter={(e) => {
                                const card = e.currentTarget;
                                card.style.transform = 'translateY(-4px) scale(1.02)';
                                card.style.borderColor = isLight ? 'var(--color-primary-light)' : 'rgba(139,92,246,0.4)';
                                card.style.backgroundColor = isLight ? '#f8faff' : '#1a141a';
                                card.style.boxShadow = isLight
                                    ? '0 20px 40px rgba(99,102,241,0.12), 0 8px 20px rgba(99,102,241,0.08)'
                                    : '0 20px 40px rgba(100,50,255,0.15), 0 8px 20px rgba(0,0,0,0.3)';
                            }}
                            onMouseLeave={(e) => {
                                const card = e.currentTarget;
                                card.style.transform = 'translateY(0) scale(1)';
                                card.style.borderColor = isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.5)';
                                card.style.backgroundColor = isLight ? 'var(--bg-card)' : '#141014';
                                card.style.boxShadow = isLight
                                    ? '0 1px 3px rgba(0,0,0,0.04)'
                                    : '0 4px 20px rgba(0,0,0,0.2)';
                            }}
                        >
                            {/* Icon */}
                            <div
                                className="w-12 h-12 flex items-center justify-center rounded-xl mb-6 md:mb-8 transition-all duration-300 border"
                                style={{
                                    backgroundColor: isLight ? 'var(--bg-surface)' : '#1a111a',
                                    borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.4)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = isLight ? 'var(--color-primary-light)' : '#2a1a2a';
                                    e.currentTarget.style.borderColor = isLight ? 'var(--color-primary)' : '#8b5cf6';
                                    e.currentTarget.style.transform = 'scale(1.1) rotate(-5deg)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = isLight ? 'var(--bg-surface)' : '#1a111a';
                                    e.currentTarget.style.borderColor = isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.4)';
                                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                                }}
                            >
                                <stat.icon
                                    className="w-6 h-6 transition-all duration-300"
                                    strokeWidth={1.5}
                                    style={{
                                        color: isLight ? 'var(--color-accent)' : '#a78bfa',
                                    }}
                                />
                            </div>

                            {/* Value with count-up effect */}
                            <p
                                className="text-4xl md:text-5xl font-bold tracking-tight mb-2 transition-colors duration-300"
                                style={{ color: isLight ? 'var(--text-primary)' : '#ffffff' }}
                            >
                                {stat.value}
                            </p>

                            {/* Label */}
                            <p
                                className="text-sm font-medium transition-colors duration-300"
                                style={{ color: isLight ? 'var(--text-secondary)' : '#9ca3af' }}
                            >
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}