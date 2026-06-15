'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, refetch } = useSession();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [activeSection, setActiveSection] = useState('account');
    
    // Form state
    const [form, setForm] = useState({
        name: '', image: null, imagePreview: null,
        coverImage: null, coverImagePreview: null,
        phone: '', location: '', jobTitle: '', bio: '',
        skills: '', languages: '',
        linkedin: '', github: '', twitter: '', website: '', youtube: '',
        resumeUrl: '', resumeFile: null,
        notificationEmail: true, userTheme: 'system',
    });
    
    const fileInputRef = useRef(null);
    const coverInputRef = useRef(null);
    const resumeInputRef = useRef(null);

    const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

    const memberSince = session?.user?.createdAt
        ? new Date(session.user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'N/A';

    const currentCoverImage = form.coverImagePreview || session?.user?.coverImage;
    const defaultCoverGradient = 'bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500';
    const skillsArray = (form.skills || session?.user?.skills || '').split(',').filter(Boolean);
    const languagesArray = (form.languages || session?.user?.languages || '').split(',').filter(Boolean);

    // Redirect if not authenticated with delay
    useEffect(() => {
        if (session === null) {
            setIsRedirecting(true);
            const timer = setTimeout(() => router.push('/auth/signin'), 500);
            return () => clearTimeout(timer);
        } else setIsRedirecting(false);
    }, [session, router]);

    // Populate form from session
    useEffect(() => {
        if (session?.user) {
            const u = session.user;
            setForm(prev => ({
                ...prev,
                name: u.name || '',
                phone: u.phone || '',
                location: u.location || '',
                jobTitle: u.jobTitle || '',
                bio: u.bio || '',
                skills: u.skills || '',
                languages: u.languages || '',
                linkedin: u.linkedin || '',
                github: u.github || '',
                twitter: u.twitter || '',
                website: u.website || '',
                youtube: u.youtube || '',
                resumeUrl: u.resumeUrl || '',
                notificationEmail: u.notificationEmail !== false,
                userTheme: u.userTheme || 'system',
            }));
        }
    }, [session]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) return setMessage({ type: 'error', text: 'Image must be less than 2MB' });
        if (!file.type.startsWith('image/')) return setMessage({ type: 'error', text: 'Please select an image' });
        updateForm('imagePreview', URL.createObjectURL(file));
        updateForm('image', file);
    };

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) return setMessage({ type: 'error', text: 'Cover must be less than 5MB' });
        if (!file.type.startsWith('image/')) return setMessage({ type: 'error', text: 'Please select an image' });
        updateForm('coverImagePreview', URL.createObjectURL(file));
        updateForm('coverImage', file);
    };

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) return setMessage({ type: 'error', text: 'Resume must be less than 5MB' });
        if (file.type !== 'application/pdf') return setMessage({ type: 'error', text: 'Only PDF files allowed' });
        updateForm('resumeFile', file);
    };

    const uploadFile = async (file, type = 'image') => {
        const fd = new FormData();
        fd.append('file', file);
        if (type === 'resume') fd.append('type', 'resume');
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        if (!res.ok) throw new Error(`Failed to upload ${type}`);
        const data = await res.json();
        return data.url;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ type: '', text: '' });
        try {
            let imageUrl = session?.user?.image || null;
            let coverUrl = session?.user?.coverImage || null;
            let resumeUrl = session?.user?.resumeUrl || null;

            if (form.image instanceof File) imageUrl = await uploadFile(form.image);
            if (form.coverImage instanceof File) coverUrl = await uploadFile(form.coverImage);
            if (form.resumeFile instanceof File) resumeUrl = await uploadFile(form.resumeFile, 'resume');

            const res = await fetch('/api/auth/update-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    image: imageUrl,
                    coverImage: coverUrl,
                    phone: form.phone,
                    location: form.location,
                    jobTitle: form.jobTitle,
                    bio: form.bio,
                    skills: form.skills,
                    languages: form.languages,
                    linkedin: form.linkedin,
                    github: form.github,
                    twitter: form.twitter,
                    website: form.website,
                    youtube: form.youtube,
                    resumeUrl,
                    notificationEmail: form.notificationEmail,
                    userTheme: form.userTheme,
                }),
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Failed to save');
            }
            setMessage({ type: 'success', text: 'All changes saved successfully!' });
            await refetch();
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setIsSaving(false);
        }
    };

    // Loading
    if (session === undefined) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--color-accent)' }}></div>
            </div>
        );
    }

    const initial = session?.user?.name?.charAt(0)?.toUpperCase() || 'U';
    const hasProfileImage = form.imagePreview || session?.user?.image;

    // Tab navigation items
    const tabs = [
        { id: 'account', label: 'Account', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { id: 'personal', label: 'Personal', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0' },
        { id: 'social', label: 'Social', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
        { id: 'resume', label: 'Resume', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    ];

    const socialLinks = [
        { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/your-profile', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z' },
        { key: 'github', label: 'GitHub', placeholder: 'https://github.com/your-username', icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22' },
        { key: 'twitter', label: 'X / Twitter', placeholder: 'https://x.com/your-handle', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
        { key: 'website', label: 'Website', placeholder: 'https://your-website.com', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
        { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@your-channel', icon: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z' },
    ];

    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Settings</h1>
                        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Manage your account, profile, and preferences</p>
                    </div>
                    {message.text && (
                        <div className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 ${
                            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                            {message.text}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <div className="rounded-2xl border shadow-lg" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                            <div className="relative h-28 overflow-hidden rounded-t-2xl group" style={{ clipPath: 'inset(0 0 0 0)' }}>
                                {currentCoverImage ? (
                                    <Image src={currentCoverImage} alt="Cover" fill className="object-cover" />
                                ) : (
                                    <div className={`w-full h-full ${defaultCoverGradient}`} />
                                )}
                                <div className="absolute inset-0 bg-black/10" />
                            </div>
                            <div className="px-5 pb-5 relative" style={{ zIndex: 1 }}>
                                <div className="flex justify-center -mt-14 mb-3 relative" style={{ zIndex: 2 }}>
                                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden" style={{ borderColor: 'var(--bg-elevated)' }}>
                                        {hasProfileImage ? (
                                            <Image src={form.imagePreview || session.user.image} alt="Profile" width={96} height={96} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white" style={{ backgroundColor: 'var(--color-accent)' }}>{initial}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h2 className="text-base font-bold truncate" style={{ color: 'var(--text-primary)' }}>{session?.user?.name || 'User'}</h2>
                                    <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>{session?.user?.email}</p>
                                    {session?.user?.jobTitle && (
                                        <p className="text-xs mt-1 font-medium" style={{ color: 'var(--color-accent)' }}>{session.user.jobTitle}</p>
                                    )}
                                    {session?.user?.location && (
                                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>📍 {session.user.location}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="rounded-2xl border shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                            <div className="p-2 space-y-1">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveSection(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                            activeSection === tab.id ? 'bg-opacity-10' : ''
                                        }`}
                                        style={{
                                            backgroundColor: activeSection === tab.id ? 'var(--bg-hover)' : 'transparent',
                                            color: activeSection === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                                        }}
                                    >
                                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                                        </svg>
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="rounded-2xl border shadow-lg p-4" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                            <h3 className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Quick Links</h3>
                            <div className="space-y-1">
                                <Link href="/browse-jobs" className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all" style={{ color: 'var(--text-secondary)' }}
                                    onMouseEnter={e => { e.target.style.backgroundColor = 'var(--bg-hover)'; e.target.style.color = 'var(--text-primary)'; }}
                                    onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-secondary)'; }}>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Browse Jobs
                                </Link>
                                <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all" style={{ color: 'var(--text-secondary)' }}
                                    onMouseEnter={e => { e.target.style.backgroundColor = 'var(--bg-hover)'; e.target.style.color = 'var(--text-primary)'; }}
                                    onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-secondary)'; }}>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Home
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSave}>
                            {/* ===== ACCOUNT SECTION ===== */}
                            {activeSection === 'account' && (
                                <div className="space-y-6">
                                    <div className="rounded-2xl border shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                                        <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
                                            <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Account Information</h3>
                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Your basic account details</p>
                                        </div>
                                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Full Name</label>
                                                <input type="text" value={form.name} onChange={e => updateForm('name', e.target.value)} required
                                                    className="w-full px-4 py-3 rounded-xl border text-sm" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Email</label>
                                                <div className="w-full px-4 py-3 rounded-xl border text-sm flex items-center gap-2" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                                                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--text-muted)' }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="truncate">{session?.user?.email}</span>
                                                    <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-medium" style={{
                                                        backgroundColor: session?.user?.emailVerified ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                                                        color: session?.user?.emailVerified ? 'rgb(22,163,74)' : 'rgb(220,38,38)',
                                                    }}>{session?.user?.emailVerified ? 'Verified' : 'Unverified'}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Member Since</label>
                                                <div className="w-full px-4 py-3 rounded-xl border text-sm flex items-center gap-2" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--text-muted)' }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {memberSince}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Account ID</label>
                                                <div className="w-full px-4 py-3 rounded-xl border text-sm flex items-center gap-2" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--text-muted)' }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
                                                    </svg>
                                                    <span className="font-mono text-xs truncate">{session?.user?.id}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Profile Images Card */}
                                    <div className="rounded-2xl border shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                                        <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
                                            <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Profile Images</h3>
                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Update your profile photo and cover image</p>
                                        </div>
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="text-center">
                                                    <div className="relative inline-block">
                                                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 mx-auto" style={{ borderColor: 'var(--border-color)' }}>
                                                            {hasProfileImage ? (
                                                                <Image src={form.imagePreview || session.user.image} alt="Profile" width={112} height={112} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white" style={{ backgroundColor: 'var(--color-accent)' }}>{initial}</div>
                                                            )}
                                                        </div>
                                                        <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute -bottom-1 -right-1 p-2 rounded-full text-white shadow-lg" style={{ backgroundColor: 'var(--color-accent)' }}>
                                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </button>
                                                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                                    </div>
                                                    <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Profile Photo (max 2MB)</p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="relative inline-block w-full h-24 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border-color)' }}>
                                                        {currentCoverImage ? (
                                                            <Image src={currentCoverImage} alt="Cover" fill className="object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-muted)' }}>No cover image</div>
                                                        )}
                                                        <button type="button" onClick={() => coverInputRef.current?.click()} className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                                                            <span className="text-white text-xs font-medium">Change Cover</span>
                                                        </button>
                                                        <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
                                                    </div>
                                                    <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Cover Image (max 5MB)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ===== PERSONAL SECTION ===== */}
                            {activeSection === 'personal' && (
                                <div className="space-y-6">
                                    <div className="rounded-2xl border shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                                        <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
                                            <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Personal Details</h3>
                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Your personal and professional information</p>
                                        </div>
                                        <div className="p-6 space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Phone Number</label>
                                                    <input type="tel" value={form.phone} onChange={e => updateForm('phone', e.target.value)}
                                                        placeholder="+1 (555) 123-4567"
                                                        className="w-full px-4 py-3 rounded-xl border text-sm" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Location</label>
                                                    <input type="text" value={form.location} onChange={e => updateForm('location', e.target.value)}
                                                        placeholder="Dhaka, Bangladesh"
                                                        className="w-full px-4 py-3 rounded-xl border text-sm" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Job Title / Headline</label>
                                                    <input type="text" value={form.jobTitle} onChange={e => updateForm('jobTitle', e.target.value)}
                                                        placeholder="Senior Software Engineer at Google"
                                                        className="w-full px-4 py-3 rounded-xl border text-sm" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Bio / About Me</label>
                                                <textarea
                                                    value={form.bio}
                                                    onChange={e => updateForm('bio', e.target.value)}
                                                    rows={4}
                                                    placeholder="Tell us about yourself, your experience, and what you're looking for..."
                                                    className="w-full px-4 py-3 rounded-xl border text-sm resize-none"
                                                    style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                                                />
                                                <p className="text-xs mt-1 text-right" style={{ color: 'var(--text-muted)' }}>{form.bio.length}/500</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skills & Languages */}
                                    <div className="rounded-2xl border shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                                        <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
                                            <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Skills & Languages</h3>
                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Add your skills and languages (comma separated)</p>
                                        </div>
                                        <div className="p-6 space-y-6">
                                            <div>
                                                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Skills</label>
                                                <input type="text" value={form.skills} onChange={e => updateForm('skills', e.target.value)}
                                                    placeholder="React, Node.js, Python, MongoDB, TypeScript"
                                                    className="w-full px-4 py-3 rounded-xl border text-sm" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
                                                {skillsArray.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {skillsArray.map((skill, i) => (
                                                            <span key={i} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--color-accent)', border: '1px solid var(--border-color)' }}>
                                                                {skill.trim()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Languages</label>
                                                <input type="text" value={form.languages} onChange={e => updateForm('languages', e.target.value)}
                                                    placeholder="English, Bengali, Hindi, Spanish"
                                                    className="w-full px-4 py-3 rounded-xl border text-sm" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
                                                {languagesArray.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {languagesArray.map((lang, i) => (
                                                            <span key={i} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
                                                                {lang.trim()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ===== SOCIAL SECTION ===== */}
                            {activeSection === 'social' && (
                                <div className="rounded-2xl border shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                                    <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
                                        <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Social Links</h3>
                                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Connect your professional social profiles</p>
                                    </div>
                                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {socialLinks.map(social => (
                                            <div key={social.key}>
                                                <label className="block text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                                                    {/* Simple dot indicator */}
                                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: form[social.key] ? 'rgb(34,197,94)' : 'var(--text-muted)' }} />
                                                    {social.label}
                                                </label>
                                                <input
                                                    type="url"
                                                    value={form[social.key]}
                                                    onChange={e => updateForm(social.key, e.target.value)}
                                                    placeholder={social.placeholder}
                                                    className="w-full px-4 py-3 rounded-xl border text-sm"
                                                    style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ===== RESUME SECTION ===== */}
                            {activeSection === 'resume' && (
                                <div className="space-y-6">
                                    <div className="rounded-2xl border shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                                        <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
                                            <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Resume / CV</h3>
                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Upload your resume (PDF only, max 5MB)</p>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 p-6 rounded-xl border-2 border-dashed" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
                                                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-base)' }}>
                                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: 'var(--color-accent)' }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                                        {form.resumeFile ? form.resumeFile.name : (session?.user?.resumeUrl ? 'Resume uploaded' : 'No resume uploaded')}
                                                    </p>
                                                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                                        {form.resumeFile ? `${(form.resumeFile.size / 1024 / 1024).toFixed(2)} MB` : 'PDF, max 5MB'}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    {session?.user?.resumeUrl && !form.resumeFile && (
                                                        <a href={session.user.resumeUrl} target="_blank"
                                                            className="px-3 py-2 rounded-xl text-xs font-medium border transition-all"
                                                            style={{ color: 'var(--color-accent)', borderColor: 'var(--border-color)' }}
                                                            onMouseEnter={e => e.target.style.backgroundColor = 'var(--bg-hover)'}
                                                            onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
                                                        >
                                                            View
                                                        </a>
                                                    )}
                                                    <button type="button" onClick={() => resumeInputRef.current?.click()}
                                                        className="px-3 py-2 rounded-xl text-xs font-medium text-white transition-all"
                                                        style={{ background: 'linear-gradient(to right, var(--color-accent-hover), var(--color-accent))' }}
                                                    >
                                                        {form.resumeFile || session?.user?.resumeUrl ? 'Replace' : 'Upload'}
                                                    </button>
                                                </div>
                                                <input ref={resumeInputRef} type="file" accept="application/pdf" onChange={handleResumeChange} className="hidden" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Security Card */}
                                    <div className="rounded-2xl border shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                                        <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--bg-base)' }}>
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--color-accent)' }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Security</h3>
                                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Password and authentication</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--bg-base)' }}>
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--text-muted)' }}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Password</p>
                                                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Last changed: N/A</p>
                                                    </div>
                                                </div>
                                                <button type="button" className="px-4 py-2 rounded-xl text-sm font-medium border transition-all"
                                                    style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
                                                    onMouseEnter={e => { e.target.style.backgroundColor = 'var(--bg-hover)' }}
                                                    onMouseLeave={e => { e.target.style.backgroundColor = 'transparent' }}
                                                >
                                                    Change Password
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ===== SETTINGS SECTION ===== */}
                            {activeSection === 'settings' && (
                                <div className="space-y-6">
                                    <div className="rounded-2xl border shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                                        <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
                                            <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Preferences</h3>
                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Customize your experience</p>
                                        </div>
                                        <div className="p-6 space-y-6">
                                            {/* Notification Toggle */}
                                            <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-surface)' }}>
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--bg-base)' }}>
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--color-accent)' }}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Email Notifications</p>
                                                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Receive job alerts and updates via email</p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => updateForm('notificationEmail', !form.notificationEmail)}
                                                    className={`relative w-12 h-6 rounded-full transition-all ${form.notificationEmail ? 'bg-green-500' : ''}`}
                                                    style={{ backgroundColor: form.notificationEmail ? 'rgb(34,197,94)' : 'var(--border-color)' }}
                                                >
                                                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${form.notificationEmail ? 'left-6' : 'left-0.5'}`} />
                                                </button>
                                            </div>

                                            {/* Theme Select */}
                                            <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-surface)' }}>
                                                <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>Theme Preference</label>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {[
                                                        { value: 'light', label: 'Light', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' },
                                                        { value: 'dark', label: 'Dark', icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' },
                                                        { value: 'system', label: 'System', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                                                    ].map(option => (
                                                        <button
                                                            key={option.value}
                                                            type="button"
                                                            onClick={() => updateForm('userTheme', option.value)}
                                                            className={`p-4 rounded-xl border-2 text-center transition-all ${
                                                                form.userTheme === option.value ? 'border-blue-500' : 'border-transparent'
                                                            }`}
                                                            style={{
                                                                backgroundColor: form.userTheme === option.value ? 'var(--bg-base)' : 'transparent',
                                                                borderColor: form.userTheme === option.value ? 'var(--color-accent)' : 'var(--border-color)',
                                                            }}
                                                        >
                                                            <svg className="w-6 h-6 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: 'var(--color-accent)' }}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d={option.icon} />
                                                            </svg>
                                                            <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{option.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Save Button */}
                            <div className="flex items-center justify-end gap-3 pt-4 pb-8">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-8 py-3 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
                                    style={{ background: 'linear-gradient(to right, var(--color-accent-hover), var(--color-accent))' }}
                                >
                                    {isSaving ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Save All Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}