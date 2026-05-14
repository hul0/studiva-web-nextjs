'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { api } from '@/services/api';
import Loader from '@/components/common/Loader';
import './VerifiedCreator.css';

const BENEFITS = [
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
        title: 'Verified Badge',
        desc: 'Stand out with an official creator badge on your profile.',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
        title: 'More Reach',
        desc: 'Your content gets priority visibility across the platform.',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
        title: 'Instant Upload',
        desc: 'Skip the review queue — publish content instantly.',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
        title: '90% Revenue Share',
        desc: 'Keep 90% of all revenue generated from your content.',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
        ),
        title: 'Free Promotions',
        desc: 'We actively promote your content to our user base.',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
        title: 'Analytics',
        desc: 'Deep insights into views, earnings, and audience trends.',
    },
];

export default function VerifiedCreatorPage() {
    const pageRef = useRef(null);

    const [form, setForm] = useState({
        full_name: '',
        email: '',
        phone: '',
        weekly_uploads: '',
        social_links: '',
        has_team: false,
        team_size: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.vc-hero__badge', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' })
            .from('.vc-hero__title', { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
            .from('.vc-hero__sub', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
            .from('.vc-benefit', { y: 30, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, '-=0.3')
            .from('.vc-form-wrapper', { y: 40, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3');
    }, { scope: pageRef });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const toggleTeam = () => {
        setForm((prev) => ({
            ...prev,
            has_team: !prev.has_team,
            team_size: !prev.has_team ? prev.team_size : '',
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!form.full_name.trim() || !form.email.trim() || !form.phone.trim()) {
            setError('Please fill in all required fields.');
            return;
        }

        const uploads = parseInt(form.weekly_uploads, 10);
        setSubmitting(true);

        try {
            const { error: dbError } = await api.creators.create({
                ...form,
                weekly_uploads: uploads,
                team_size: form.has_team ? (parseInt(form.team_size, 10) || 0) : 0,
            });

            if (dbError) throw new Error(dbError);
            setSubmitted(true);
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="vc-page" ref={pageRef}>
            <Navbar />
            <section className="vc-hero">
                <div className="vc-hero__grid" aria-hidden="true" />
                <div className="vc-hero__ambient" aria-hidden="true" />
                <div className="vc-hero__badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    PARTNER PROGRAM
                </div>
                <h1 className="vc-hero__title">
                    Become a <span className="accent-gradient">Verified Creator</span>
                </h1>
                <p className="vc-hero__sub">
                    Join our partner program and unlock premium tools, revenue sharing, and platform-wide visibility for your educational content.
                </p>
            </section>

            <section className="vc-benefits">
                <div className="vc-benefits__grid">
                    {BENEFITS.map((b, i) => (
                        <div className="vc-benefit" key={i}>
                            <div className="vc-benefit__icon">{b.icon}</div>
                            <div className="vc-benefit__title">{b.title}</div>
                            <div className="vc-benefit__desc">{b.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="vc-form-section">
                <div className="vc-form-wrapper">
                    {submitted ? (
                        <div className="vc-success">
                            <div className="vc-success__check">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <h3>Application Submitted!</h3>
                            <p>
                                Thank you for applying. Our team will review your application and get back to you within 48 hours.
                            </p>
                            <Link href="/" className="vc-success__home-btn">
                                ← Back to Home
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="vc-form__header">
                                <h2>Apply Now</h2>
                                <p>Fill in your details below. We'll review and get back to you.</p>
                            </div>

                            <form onSubmit={handleSubmit} autoComplete="off">
                                <div className="vc-field">
                                    <label className="vc-field__label" htmlFor="vc-fullname">Full Name</label>
                                    <input
                                        id="vc-fullname"
                                        className="vc-field__input"
                                        type="text"
                                        name="full_name"
                                        placeholder="John Doe"
                                        value={form.full_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="vc-field">
                                    <label className="vc-field__label" htmlFor="vc-email">Email Address</label>
                                    <input
                                        id="vc-email"
                                        className="vc-field__input"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="vc-field">
                                    <label className="vc-field__label" htmlFor="vc-phone">Phone Number</label>
                                    <input
                                        id="vc-phone"
                                        className="vc-field__input"
                                        type="tel"
                                        name="phone"
                                        placeholder="+91 98765 43210"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="vc-field">
                                    <label className="vc-field__label" htmlFor="vc-uploads">Contents per Week</label>
                                    <input
                                        id="vc-uploads"
                                        className="vc-field__input"
                                        type="number"
                                        name="weekly_uploads"
                                        placeholder="e.g. 5"
                                        min="0"
                                        value={form.weekly_uploads}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="vc-field">
                                    <label className="vc-field__label" htmlFor="vc-socials">Social Links</label>
                                    <textarea
                                        id="vc-socials"
                                        className="vc-field__textarea"
                                        name="social_links"
                                        placeholder="Instagram, YouTube, Twitter links…"
                                        value={form.social_links}
                                        onChange={handleChange}
                                        rows={3}
                                    />
                                </div>

                                <div className="vc-toggle">
                                    <button
                                        type="button"
                                        className={`vc-toggle__switch ${form.has_team ? 'active' : ''}`}
                                        onClick={toggleTeam}
                                    />
                                    <span className="vc-toggle__label">Do you have a team?</span>
                                </div>

                                {form.has_team && (
                                    <div className="vc-field" style={{ marginTop: -6 }}>
                                        <label className="vc-field__label" htmlFor="vc-teamsize">Team Size</label>
                                        <input
                                            id="vc-teamsize"
                                            className="vc-field__input"
                                            type="number"
                                            name="team_size"
                                            placeholder="e.g. 3"
                                            min="1"
                                            value={form.team_size}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )}

                                {error && <div className="vc-form__message vc-form__message--error">{error}</div>}

                                <button id="vc-submit-btn" type="submit" className="vc-form__submit" disabled={submitting}>
                                    {submitting ? <Loader size="small" /> : 'Submit Application'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
}
