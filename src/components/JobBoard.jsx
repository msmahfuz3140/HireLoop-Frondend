'use client';

import Link from 'next/link';
import { MapPin, Briefcase, DollarSign, ArrowUpRight, Sparkles } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function JobBoard() {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const jobs = Array(6).fill({
        title: 'Frontend Developer',
        description: 'Showcase your commitment to diversity and inclusion by highlighting initiatives',
        location: 'New York, USA',
        type: 'Hybrid',
        salary: '€25–€40/hour',
        link: '/jobs/frontend-developer'
    });

    return (
        <section
            className="w-full py-20 px-6 transition-all duration-300"
            style={{ backgroundColor: isLight ? 'var(--bg-surface)' : '#121212' }}
        >
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                {/* TOP BADGE */}
                <div
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-4 transition-all duration-300"
                    style={{
                        backgroundColor: isLight ? 'var(--bg-elevated)' : 'rgba(99,102,241,0.08)',
                        borderColor: isLight ? 'var(--border-color)' : 'rgba(99,102,241,0.2)',
                    }}
                >
                    <Sparkles
                        className="w-4 h-4"
                        style={{ color: isLight ? 'var(--color-accent)' : '#818cf8' }}
                    />
                    <span
                        className="text-xs sm:text-sm font-medium"
                        style={{ color: isLight ? 'var(--text-secondary)' : '#a5b4fc' }}
                    >
                        Smart job discovery
                    </span>
                </div>

                {/* HEADING */}
                <h2
                    className="text-3xl md:text-4xl lg:text-5xl text-center font-bold tracking-tight mb-3 transition-all duration-300"
                    style={{ color: isLight ? 'var(--text-primary)' : '#ffffff' }}
                >
                    The roles you would <br />
                    <span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage: isLight
                                ? 'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
                                : 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                        }}
                    >
                        never find
                    </span>{' '}
                    by searching
                </h2>

                <p
                    className="text-sm md:text-base text-center max-w-md mb-12 transition-all duration-300"
                    style={{ color: isLight ? 'var(--text-muted)' : '#9ca3af' }}
                >
                    AI-powered matching that finds opportunities tailored to your unique skills and experience.
                </p>

                {/* JOB CARDS GRID */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {jobs.map((job, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-between min-h-[320px] rounded-[28px] p-8 border transition-all duration-400 transform hover:-translate-y-1 group"
                            style={{
                                backgroundColor: isLight ? 'var(--bg-card)' : '#161616',
                                borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)',
                                boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.04)' : 'none',
                            }}
                            onMouseEnter={(e) => {
                                const card = e.currentTarget;
                                card.style.borderColor = isLight ? 'var(--color-primary-light)' : 'rgba(75,85,99,0.6)';
                                card.style.backgroundColor = isLight ? '#f8faff' : '#1a1a1a';
                                card.style.boxShadow = isLight
                                    ? '0 8px 25px rgba(99,102,241,0.08)'
                                    : '0 8px 25px rgba(0,0,0,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                const card = e.currentTarget;
                                card.style.borderColor = isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)';
                                card.style.backgroundColor = isLight ? 'var(--bg-card)' : '#161616';
                                card.style.boxShadow = isLight ? '0 1px 3px rgba(0,0,0,0.04)' : 'none';
                            }}
                        >
                            {/* Card Header & Description */}
                            <div className="space-y-4">
                                <h3
                                    className="text-2xl font-bold tracking-tight transition-colors duration-300"
                                    style={{
                                        color: isLight ? 'var(--text-primary)' : '#ffffff',
                                    }}
                                >
                                    {job.title}
                                </h3>
                                <p
                                    className="text-sm leading-relaxed max-w-[90%] transition-colors duration-300"
                                    style={{ color: isLight ? 'var(--text-secondary)' : '#9ca3af' }}
                                >
                                    {job.description}
                                </p>
                            </div>

                            {/* Badges / Tags Area */}
                            <div className="flex flex-wrap gap-2 my-6">
                                <div
                                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs border transition-all duration-200"
                                    style={{
                                        backgroundColor: isLight ? 'var(--bg-surface)' : '#222222',
                                        borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)',
                                        color: isLight ? 'var(--text-secondary)' : '#d1d5db',
                                    }}
                                >
                                    <MapPin className="w-3.5 h-3.5 text-[#e11d48]" strokeWidth={2.5} />
                                    <span>{job.location}</span>
                                </div>

                                <div
                                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs border transition-all duration-200"
                                    style={{
                                        backgroundColor: isLight ? 'var(--bg-surface)' : '#222222',
                                        borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)',
                                        color: isLight ? 'var(--text-secondary)' : '#d1d5db',
                                    }}
                                >
                                    <Briefcase className="w-3.5 h-3.5 text-[#ec4899]" strokeWidth={2.5} />
                                    <span>{job.type}</span>
                                </div>

                                <div
                                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs border transition-all duration-200"
                                    style={{
                                        backgroundColor: isLight ? 'var(--bg-surface)' : '#222222',
                                        borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)',
                                        color: isLight ? 'var(--text-secondary)' : '#d1d5db',
                                    }}
                                >
                                    <DollarSign className="w-3.5 h-3.5 text-[#db2777]" strokeWidth={2.5} />
                                    <span>{job.salary}</span>
                                </div>
                            </div>

                            {/* Apply Now Button */}
                            <Link
                                href={job.link}
                                className="inline-flex items-center space-x-2 text-sm font-medium w-fit pt-2 transition-all duration-200"
                                style={{
                                    color: isLight ? 'var(--color-accent)' : '#ffffff',
                                }}
                                onMouseEnter={(e) => {
                                    if (isLight) e.target.style.color = 'var(--color-accent-hover)';
                                }}
                                onMouseLeave={(e) => {
                                    if (isLight) e.target.style.color = 'var(--color-accent)';
                                }}
                            >
                                <span>Apply Now</span>
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* BOTTOM VIEW ALL BUTTON */}
                <Link
                    href="/jobs"
                    className="font-medium px-8 py-3.5 rounded-xl text-sm transition-all duration-200 transform hover:scale-[1.02]"
                    style={{
                        backgroundColor: isLight ? 'var(--text-primary)' : '#ffffff',
                        color: isLight ? '#ffffff' : '#000000',
                    }}
                >
                    View all job openings
                </Link>

            </div>
        </section>
    );
}