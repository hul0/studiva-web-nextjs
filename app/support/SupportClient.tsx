'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Mail, Shield, MessageCircle, Send, CheckCircle, LifeBuoy } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { api } from '@/services/api';
import Loader from '@/components/common/Loader';
import './Support.css';

export default function SupportClient() {
    const containerRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({
        full_name: '',
        email: '',
        subject: '',
        message: '',
        category: 'General'
    });

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.support-hero__badge', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' })
            .from('.support-hero__title', { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
            .from('.support-hero__sub', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
            .from('.support-card', { y: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.3')
            .from('.support-form-wrapper', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2');
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
            const { error: dbError } = await api.support.create(form);
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
            subject: '',
            message: '',
            category: 'General'
        });
    };

    const quickLinks = [
        {
            icon: <LifeBuoy size={24} />,
            title: "Help Center",
            desc: "Browse our comprehensive guides and FAQs for quick answers.",
            href: "#"
        },
        {
            icon: <Shield size={24} />,
            title: "Security & Privacy",
            desc: "Learn how we protect your data and manage your account.",
            href: "/privacy"
        },
        {
            icon: <MessageCircle size={24} />,
            title: "Community Forum",
            desc: "Connect with other students and share your experiences.",
            href: "#"
        }
    ];

    return (
        <div className="support-page" ref={containerRef}>
            <Navbar />
            <section className="support-hero">
                <div className="support-hero__grid" aria-hidden="true" />
                <div className="support-hero__badge">Help & Support</div>
                <h1 className="support-hero__title">
                    How can we help you today?
                </h1>
                <p className="support-hero__sub">
                    Whether you have a technical question or just want to say hi, our team is here to support your journey with Studiva.
                </p>
            </section>

            <section className="support-quick">
                <div className="support-quick__grid">
                    {quickLinks.map((link, index) => (
                        <a key={index} href={link.href} className="support-card">
                            <div className="support-card__icon">{link.icon}</div>
                            <h3>{link.title}</h3>
                            <p>{link.desc}</p>
                        </a>
                    ))}
                </div>
            </section>

            <section className="support-form-section">
                <div className="support-form-wrapper">
                    {submitted ? (
                        <div className="support-success">
                            <div className="support-success__icon">
                                <CheckCircle size={40} />
                            </div>
                            <h3>Message Sent!</h3>
                            <p>
                                We've received your support request. Our team will review it and get back to you at your provided email address as soon as possible.
                            </p>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                <button className="support-success__btn" onClick={handleReset}>
                                    Send Another
                                </button>
                                <Link href="/" className="support-success__btn" style={{ background: 'var(--text-1)', color: 'var(--surface)' }}>
                                    Back Home
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="support-form__header">
                                <h2>Contact Our Support Team</h2>
                                <p>Fill out the form below and we'll get back to you shortly.</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                                    <div className="support-field">
                                        <label className="support-field__label">Full Name</label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            className="support-field__input"
                                            placeholder="Enter your name"
                                            value={form.full_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="support-field">
                                        <label className="support-field__label">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="support-field__input"
                                            placeholder="hello@university.edu"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="support-field">
                                    <label className="support-field__label">Category</label>
                                    <select
                                        name="category"
                                        className="support-field__select"
                                        value={form.category}
                                        onChange={handleChange}
                                    >
                                        <option value="General">General Inquiry</option>
                                        <option value="Technical">Technical Support</option>
                                        <option value="Account">Account Management</option>
                                        <option value="Rewards">Rewards & Payouts</option>
                                        <option value="Feature">Feature Request</option>
                                    </select>
                                </div>

                                <div className="support-field">
                                    <label className="support-field__label">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        className="support-field__input"
                                        placeholder="How can we help?"
                                        value={form.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="support-field">
                                    <label className="support-field__label">Message</label>
                                    <textarea
                                        name="message"
                                        className="support-field__textarea"
                                        placeholder="Describe your issue or question in detail..."
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {error && (
                                    <div style={{ color: '#ef4444', marginBottom: '20px', textAlign: 'center', fontSize: '14px' }}>
                                        {error}
                                    </div>
                                )}

                                <button type="submit" className="support-form__submit" disabled={loading}>
                                    {loading ? <Loader size="small" /> : (
                                        <>
                                            Send Message
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
