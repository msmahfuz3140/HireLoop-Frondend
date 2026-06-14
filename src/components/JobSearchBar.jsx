'use client';

import { useState } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';

export default function JobSearchBar() {
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');

    const suggestedTags = ['Product Designer', 'AI Engineering', 'Dev-ops Engineer'];

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', { search, location });
    };

    return (
        <div className="w-full flex flex-col items-center justify-center py-16 px-4 transition-all duration-300"
            style={{ backgroundColor: 'var(--bg-surface)' }}
        >

            {/* TOP BADGE */}
            <div className="relative flex items-center justify-center w-full max-w-2xl mb-12">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t" style={{ borderColor: 'var(--border-color)' }}></div>
                </div>

                <div className="relative flex items-center space-x-2 px-6 py-2.5 rounded-full shadow-xl border transition-all duration-300"
                    style={{
                        backgroundColor: 'var(--bg-elevated)',
                        borderColor: 'var(--border-color)',
                    }}
                >
                    <span className="text-lg">💼</span>
                    <p className="text-xs sm:text-sm font-semibold tracking-wider"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        <span className="text-sm sm:text-base font-bold mr-1.5"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            50,000+
                        </span>
                        NEW JOBS THIS MONTH
                    </p>
                </div>
            </div>

            {/* MAIN SEARCH BAR FORM */}
            <form
                onSubmit={handleSearch}
                className="w-full max-w-4xl rounded-2xl md:rounded-full p-2 flex flex-col md:flex-row items-center justify-between shadow-2xl gap-3 md:gap-0 border transition-all duration-300"
                style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-color)',
                }}
            >
                {/* Column 1: Job Title / Skill */}
                <div className="w-full flex items-center px-4 py-2.5 md:py-0 space-x-3 border-b md:border-b-0"
                    style={{ borderColor: 'var(--border-color)' }}
                >
                    <FiSearch className="text-xl flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Job title, skill or company"
                        className="w-full bg-transparent text-sm focus:outline-none"
                        style={{ color: 'var(--text-primary)' }}
                        onFocus={(e) => e.target.style.outline = 'none'}
                    />
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block h-8 w-[1px]" style={{ backgroundColor: 'var(--border-color)' }}></div>

                {/* Column 2: Location */}
                <div className="w-full flex items-center px-4 py-2.5 md:py-0 space-x-3">
                    <FiMapPin className="text-xl flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location or Remote"
                        className="w-full bg-transparent text-sm focus:outline-none"
                        style={{ color: 'var(--text-primary)' }}
                    />
                </div>

                {/* Search Submit Button */}
                <button
                    type="submit"
                    className="w-full md:w-auto text-white p-4 md:p-3.5 rounded-xl md:rounded-full transition-all duration-300 flex items-center justify-center md:mr-1 group transform hover:scale-[1.02] md:hover:scale-105"
                    style={{
                        background: 'linear-gradient(to right, var(--color-accent-hover), var(--color-accent))',
                    }}
                >
                    <FiSearch className="text-xl group-hover:rotate-12 transition-transform" />
                    <span className="md:hidden ml-2 font-medium text-sm">Search Jobs</span>
                </button>
            </form>

            {/* SUGGESTED TAGS */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 max-w-2xl">
                {suggestedTags.map((tag, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setSearch(tag)}
                        className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 transform hover:-translate-y-[1px] border"
                        style={{
                            backgroundColor: 'var(--bg-elevated)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-secondary)',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'var(--bg-hover)';
                            e.target.style.color = 'var(--text-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'var(--bg-elevated)';
                            e.target.style.color = 'var(--text-secondary)';
                        }}
                    >
                        {tag}
                    </button>
                ))}
            </div>

        </div>
    );
}