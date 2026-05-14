'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, Heart, Users, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { api } from '@/services/api';
import Loader from '@/components/common/Loader';
import './SuggestFeature.css';

export default function SuggestFeaturePage() {
    const containerRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({
        full_name: '',
        email: '',
        feature_title: '',
        description: '',
        category: 'New Feature'
    });

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.sf-hero__badge', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' })
            .from('.sf-hero__title', { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
            .from('.sf-hero__sub', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
            .from('.sf-hook-card', { y: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.3')
            .from('.sf-form-wrapper', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2');
    }, { scope: containerRef });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: dbError } = await api.suggestions.create(form);
            if (dbError) throw new Error(dbError);
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSubmitted(false);
        setForm({
            full_name: '',
            email: '',
            feature_title: '',
            description: '',
            category: 'New Feature'
        });
    };

    const hooks = [
        {
            icon: <Heart size={20} />,
            title: "Built by Us, Inspired by You",
            desc: "Our app is not only ours but yours too. Every pixel and every line of code is dedicated to your growth."
        },
        {
            icon: <Users size={20} />,
            title: "A Shared Vision",
            desc: "We don't just build features; we build solutions for the challenges you face every single day."
        },
        {
            icon: <Sparkles size={20} />,
            title: "Your Voice Matters",
            desc: "Your ideas are the seeds of our future. We listen, we learn, and we build together."
        }
    ];

    return (
        <div className="sf-page" ref={containerRef}>
            <Navbar />
            <section className="sf-hero">
                <div className="sf-hero__grid" aria-hidden="true" />
                <div className="sf-hero__badge">Community Driven</div>
                <h1 className="sf-hero__title">
                    Help Us Build the <span className="accent">Future of Studiva</span>
                </h1>
                <p className="sf-hero__sub">
                    Your feedback is the compass that guides our innovation. Share your thoughts and let's shape the ultimate learning companion together.
                </p>
            </section>

            <section className="sf-hooks">
                <div className="sf-hooks__grid">
                    {hooks.map((hook, index) => (
                        <div key={index} className="sf-hook-card">
                            <div className="sf-hook-card__icon">{hook.icon}</div>
                            <h3>{hook.title}</h3>
                            <p>{hook.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="sf-form-section">
                <div className="sf-form-wrapper">
                    {submitted ? (
                        <div className="sf-success">
                            <div className="sf-success__icon">
                                <CheckCircle size={40} />
                            </div>
                            <h3>Thank You!</h3>
                            <p>
                                Your suggestion has been received with gratitude. We'll carefully review your idea and consider it for our future updates.
                            </p>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                <button className="sf-success__btn" onClick={handleReset}>
                                    Suggest Another
                                </button>
                                <Link href="/" className="sf-success__btn" style={{ background: 'var(--text-1)', color: 'var(--surface)' }}>
                                    Back Home
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="sf-form__header">
                                <h2>Share Your Idea</h2>
                                <p>Tell us what's on your mind. No idea is too small.</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                                    <div className="sf-field">
                                        <label className="sf-field__label">Full Name</label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            className="sf-field__input"
                                            placeholder="Enter your name"
                                            value={form.full_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="sf-field">
                                        <label className="sf-field__label">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="sf-field__input"
                                            placeholder="hello@university.edu"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="sf-field">
                                    <label className="sf-field__label">Feature Category</label>
                                    <select
                                        name="category"
                                        className="sf-field__select"
                                        value={form.category}
                                        onChange={handleChange}
                                    >
                                        <option value="New Feature">New Feature</option>
                                        <option value="UI/UX Improvement">UI/UX Improvement</option>
                                        <option value="Performance">Performance</option>
                                        <option value="Bug Report">Bug Report</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="sf-field">
                                    <label className="sf-field__label">Idea Title</label>
                                    <input
                                        type="text"
                                        name="feature_title"
                                        className="sf-field__input"
                                        placeholder="Briefly describe your idea"
                                        value={form.feature_title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="sf-field">
                                    <label className="sf-field__label">Detailed Description</label>
                                    <textarea
                                        name="description"
                                        className="sf-field__textarea"
                                        placeholder="Tell us more about how this feature would help you..."
                                        value={form.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {error && (
                                    <div style={{ color: '#ef4444', marginBottom: '20px', textAlign: 'center', fontSize: '14px' }}>
                                        {error}
                                    </div>
                                )}

                                <button type="submit" className="sf-form__submit" disabled={loading}>
                                    {loading ? <Loader size="small" /> : (
                                        <>
                                            Send Suggestion
                                            <Send size={18} />
                                        </>
                                    )}
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
