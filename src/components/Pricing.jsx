'use client';

import { useState } from 'react';
import { Crown, BarChart3, Zap, Plus, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function PricingSection() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const [billingCycle, setBillingCycle] = useState('monthly');

    const plans = [
        {
            name: 'Starter',
            price: billingCycle === 'monthly' ? '0' : '0',
            icon: Crown,
            iconColor: isLight ? 'text-pink-600' : 'text-pink-500',
            subtitle: 'Start building your insights hub:',
            features: [
                'Daily AI match brief (top 5)',
                'Verified salary bands',
                'Company insight dashboards',
                '1-click apply, unlimited',
            ],
            buttonText: 'Choose This Plan',
            isPopular: false,
        },
        {
            name: 'Growth',
            price: billingCycle === 'monthly' ? '17' : '12',
            icon: BarChart3,
            iconColor: isLight ? 'text-purple-600' : 'text-purple-400',
            subtitle: 'Start building your insights hub:',
            features: [
                'Daily AI match brief (top 5)',
                'Verified salary bands',
                'Company insight dashboards',
                '1-click apply, unlimited',
            ],
            buttonText: 'Choose This Plan',
            isPopular: true,
        },
        {
            name: 'Premium',
            price: billingCycle === 'monthly' ? '99' : '79',
            icon: Zap,
            iconColor: isLight ? 'text-fuchsia-600' : 'text-fuchsia-400',
            subtitle: 'Start building your insights hub:',
            features: [
                'Everything in Pro',
                'Multi-profile career portfolios',
                'Shared talent rooms',
                'Recruiter view (read-only)',
            ],
            buttonText: 'Choose This Plan',
            isPopular: false,
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
                        Pricing
                    </span>
                </div>

                {/* MAIN HEADING */}
                <h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-center tracking-tight max-w-2xl leading-tight mb-3 transition-all duration-300"
                    style={{ color: isLight ? 'var(--text-primary)' : '#ffffff' }}
                >
                    Simple, transparent{' '}
                    <span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage: isLight
                                ? 'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
                                : 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                        }}
                    >
                        pricing
                    </span>
                </h2>

                <p
                    className="text-sm md:text-base text-center max-w-md mb-10 transition-all duration-300"
                    style={{ color: isLight ? 'var(--text-muted)' : '#9ca3af' }}
                >
                    Choose the perfect plan for your career journey.
                </p>

                {/* TOGGLE SWITCH (Monthly / Yearly) */}
                <div
                    className="flex items-center p-1.5 rounded-full mb-16 shadow-inner border select-none transition-all duration-300"
                    style={{
                        backgroundColor: isLight ? 'var(--bg-elevated)' : '#141414',
                        borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)',
                    }}
                >
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                            billingCycle === 'monthly'
                                ? isLight
                                    ? 'bg-white text-black shadow-md'
                                    : 'bg-white text-black shadow-md'
                                : isLight
                                    ? 'text-gray-500 hover:text-gray-700'
                                    : 'text-gray-400 hover:text-gray-200'
                        }`}
                    >
                        Monthly
                    </button>

                    <button
                        onClick={() => setBillingCycle('yearly')}
                        className={`relative flex items-center space-x-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                            billingCycle === 'yearly'
                                ? isLight
                                    ? 'bg-white text-black shadow-md'
                                    : 'bg-white text-black shadow-md'
                                : isLight
                                    ? 'text-gray-500 hover:text-gray-700'
                                    : 'text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        <span>Yearly</span>
                        <span className="bg-[#e11d48] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-wider scale-95">
                            25%
                        </span>
                    </button>
                </div>

                {/* PRICING CARDS GRID */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`rounded-[28px] p-8 flex flex-col justify-between min-h-[520px] transition-all duration-300 hover:-translate-y-1 border ${
                                plan.isPopular
                                    ? isLight
                                        ? 'border-indigo-200 bg-white shadow-[0_20px_40px_rgba(99,102,241,0.1)]'
                                        : 'border-gray-700 bg-[#161616] shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
                                    : isLight
                                        ? 'border-gray-200 bg-white hover:border-indigo-200'
                                        : 'border-gray-800/60 bg-[#141414] hover:border-gray-700'
                            }`}
                            style={!plan.isPopular ? {
                                backgroundColor: isLight ? 'var(--bg-card)' : '#141414',
                                borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)',
                            } : {}}
                            onMouseEnter={(e) => {
                                if (!plan.isPopular) {
                                    e.currentTarget.style.borderColor = isLight ? 'var(--color-primary-light)' : 'rgba(75,85,99,0.6)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!plan.isPopular) {
                                    e.currentTarget.style.borderColor = isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)';
                                }
                            }}
                        >
                            <div>
                                {/* Header: Title, Icon & Price */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-300"
                                            style={{
                                                backgroundColor: isLight ? 'var(--bg-surface)' : 'rgba(31,41,55,0.3)',
                                                borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.5)',
                                            }}
                                        >
                                            <plan.icon className={`w-4 h-4 ${plan.iconColor}`} />
                                        </div>
                                        <h3
                                            className="text-xl font-bold tracking-tight transition-all duration-300"
                                            style={{ color: isLight ? 'var(--text-primary)' : '#e5e7eb' }}
                                        >
                                            {plan.name}
                                        </h3>
                                    </div>

                                    <div className="flex items-baseline">
                                        <span
                                            className="text-3xl font-bold tracking-tight"
                                            style={{ color: isLight ? 'var(--text-primary)' : '#ffffff' }}
                                        >$</span>
                                        <span
                                            className="text-5xl font-black tracking-tighter mx-0.5"
                                            style={{ color: isLight ? 'var(--text-primary)' : '#ffffff' }}
                                        >
                                            {plan.price}
                                        </span>
                                        <span
                                            className="text-xs font-medium lowercase"
                                            style={{ color: isLight ? 'var(--text-muted)' : '#6b7280' }}
                                        >
                                            /month
                                        </span>
                                    </div>
                                </div>

                                {/* Subtitle */}
                                <p
                                    className="text-sm font-bold tracking-tight mb-6 transition-all duration-300"
                                    style={{ color: isLight ? 'var(--text-secondary)' : '#d1d5db' }}
                                >
                                    {plan.subtitle}
                                </p>

                                {/* Features List */}
                                <ul className="space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start space-x-3 text-sm font-normal transition-all duration-300"
                                            style={{ color: isLight ? 'var(--text-secondary)' : '#9ca3af' }}
                                        >
                                            <div
                                                className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center mt-0.5 border transition-all duration-300"
                                                style={{
                                                    backgroundColor: isLight ? 'var(--bg-surface)' : '#1d1d1d',
                                                    borderColor: isLight ? 'var(--border-color)' : 'rgba(31,41,55,0.6)',
                                                }}
                                            >
                                                <Plus
                                                    className="w-3.5 h-3.5"
                                                    strokeWidth={3}
                                                    style={{ color: isLight ? 'var(--text-muted)' : '#6b7280' }}
                                                />
                                            </div>
                                            <span className="leading-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Bottom CTA Button */}
                            <button
                                className={`w-full mt-10 py-4 px-6 rounded-2xl font-semibold text-sm flex items-center justify-center space-x-2 transition-all duration-200 group ${
                                    plan.isPopular
                                        ? 'bg-[#0f172a] text-white hover:bg-[#1e293b]'
                                        : isLight
                                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                                            : 'bg-[#222222] text-white hover:bg-gray-800 border border-gray-800/40'
                                }`}
                            >
                                <span>{plan.buttonText}</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
                            </button>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}