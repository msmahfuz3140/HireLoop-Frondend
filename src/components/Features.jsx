'use client';

import { Search, TrendingUp, BarChart3, Bookmark, MousePointerClick, FileText, Hexagon, LineChart, Sparkles } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function FeaturesSection() {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const features = [
        {
            icon: Search,
            title: 'Smart Search',
            description: 'Find your ideal job with advanced filters.',
        },
        {
            icon: TrendingUp,
            title: 'Salary Insights',
            description: 'Get real salary data to negotiate confidently.',
        },
        {
            icon: BarChart3,
            title: 'Top Companies',
            description: 'Apply to vetted companies that are hiring.',
        },
        {
            icon: Bookmark,
            title: 'Saved Jobs',
            description: 'Manage apps & favorites on your dashboard.',
        },
        {
            icon: MousePointerClick,
            title: 'One-Click Apply',
            description: 'Simplify your job applications for an easier process!',
        },
        {
            icon: FileText,
            title: 'Resume Builder',
            description: 'Create professional resumes with modern templates.',
        },
        {
            icon: Hexagon,
            title: 'Skill-Based Matching',
            description: 'Discover jobs that match your skills and experience.',
        },
        {
            icon: LineChart,
            title: 'Career Growth Resources',
            description: 'Boost your career with quick interview tips.',
        },
    ];

    return (
        <section
            className="w-full py-24 px-6 transition-all duration-300"
            style={{ backgroundColor: isLight ? 'var(--bg-base)' : '#0d0d0d' }}
        >
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                {/* TOP BADGE */}
                <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4 transition-all duration-300"
                    style={{
                        backgroundColor: isLight ? 'var(--bg-elevated)' : 'rgba(99,102,241,0.08)',
                        borderColor: isLight ? 'var(--border-color)' : 'rgba(99,102,241,0.2)',
                    }}
                >
                    <Sparkles
                        className="w-3.5 h-3.5"
                        style={{ color: isLight ? 'var(--color-accent)' : '#818cf8' }}
                    />
                    <span
                        className="text-xs font-semibold tracking-wider uppercase"
                        style={{ color: isLight ? 'var(--text-secondary)' : '#a5b4fc' }}
                    >
                        Features
                    </span>
                </div>

                {/* MAIN HEADING */}
                <h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-center tracking-tight max-w-2xl leading-tight mb-3 transition-all duration-300"
                    style={{ color: isLight ? 'var(--text-primary)' : '#ffffff' }}
                >
                    Everything you need <br />
                    <span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage: isLight
                                ? 'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
                                : 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                        }}
                    >
                        to succeed
                    </span>
                </h2>

                <p
                    className="text-sm md:text-base text-center max-w-md mb-16 transition-all duration-300"
                    style={{ color: isLight ? 'var(--text-muted)' : '#9ca3af' }}
                >
                    Powerful tools to help you land your dream job faster.
                </p>

                {/* FEATURES GRID */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-start space-x-4 group transition-all duration-300"
                            style={{
                                padding: '16px',
                                borderRadius: '16px',
                                margin: '-16px',
                            }}
                            onMouseEnter={(e) => {
                                if (isLight) {
                                    e.currentTarget.style.backgroundColor = '#f8faff';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (isLight) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }
                            }}
                        >
                            {/* ICON CONTAINER */}
                            <div
                                className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 border"
                                style={{
                                    backgroundColor: isLight ? 'var(--bg-surface)' : '#141414',
                                    borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = isLight ? 'var(--color-primary-light)' : '#1a151a';
                                    e.currentTarget.style.borderColor = isLight ? 'var(--color-primary)' : 'rgba(139,92,246,0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = isLight ? 'var(--bg-surface)' : '#141414';
                                    e.currentTarget.style.borderColor = isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)';
                                }}
                            >
                                <feature.icon
                                    className="w-6 h-6 transition-all duration-300"
                                    strokeWidth={1.5}
                                    style={{
                                        color: isLight ? 'var(--color-accent)' : '#a78bf4',
                                    }}
                                />
                            </div>

                            {/* TEXT CONTENT */}
                            <div className="space-y-1.5 pt-1">
                                <h3
                                    className="text-base font-bold tracking-tight transition-all duration-300"
                                    style={{
                                        color: isLight ? 'var(--text-primary)' : '#e5e7eb',
                                    }}
                                >
                                    {feature.title}
                                </h3>
                                <p
                                    className="text-xs md:text-sm leading-relaxed font-normal transition-all duration-300"
                                    style={{ color: isLight ? 'var(--text-secondary)' : '#6b7280' }}
                                >
                                    {feature.description}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}