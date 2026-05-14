'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { api } from '@/services/api';
import Loader from '@/components/common/Loader';
import './CampusRepresentative.css';

const BENEFITS = [
    {
        title: 'Earn up to ₹1000 every month',
        desc: 'Refer users and earn up to 2x per user',
        icon: 'https://img.icons8.com/?id=igliuy55hqkp&format=png&size=96',
        layout: 'wide'
    },
    {
        title: 'Complimentary Premium Access',
        desc: 'Experience the full power of Studiva, unlocked exclusively for you.',
        icon: 'https://img.icons8.com/?id=19295&format=png&size=96',
        layout: 'tall'
    },
    {
        title: 'Exclusive Badges',
        desc: 'A customized identity icon that sets you apart and represents your college.',
        icon: 'https://img.icons8.com/?id=VUt5dWfcfFzt&format=png&size=96',
        layout: 'standard'
    },
    {
        title: 'Community Leadership Access',
        desc: 'Take charge as the admin of your college’s community section and lead engagement on campus.',
        icon: 'https://img.icons8.com/?id=122811&format=png&size=96',
        layout: 'standard'
    },
    {
        title: 'Elite Circle',
        desc: 'Get into the biggest study network:',
        points: [
            'Connect with fellow campus representatives across 30+ colleges',
            'Direct access to the core team of Studiva'
        ],
        icon: 'https://img.icons8.com/?id=aIYDmrSk6X13&format=png&size=96',
        layout: 'wide'
    }
];

const BenefitIcon = ({ src, alt }: { src: string, alt: string }) => (
    <img src={src} alt={alt} loading="lazy" />
);

export default function CampusRepresentativePage() {
    const pageRef = useRef(null);

    const [form, setForm] = useState({
        full_name: '',
        email: '',
        phone: '',
        college_name: '',
        year_of_study: '',
        why_join: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    const { contextSafe } = useGSAP(() => {
        const heroTl = gsap.timeline();
        heroTl.from('.cr-hero__badge', { y: 20, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' })
            .from('.cr-hero__title', { y: 30, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.1 }, '-=0.4')
            .from('.cr-hero__sub', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');

        gsap.fromTo('.cr-benefit',
            { y: 40, scale: 0.95, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.cr-benefits__grid',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
            }
        );

        gsap.fromTo('.cr-form-wrapper',
            { y: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.cr-form-section',
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
                y: 0,
                opacity: 1,
                duration: 1.4,
                ease: 'power4.out',
            }
        );

        gsap.to('.cr-hero__ambient', {
            x: '+=30',
            y: '+=20',
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }, { scope: pageRef });

    const handleBenefitMouseMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        target.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        target.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        gsap.to(target, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.03,
            transformPerspective: 1000,
            duration: 0.5,
            ease: 'power3.out',
            overwrite: 'auto'
        });
    });

    const handleBenefitMouseLeave = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        gsap.to(target, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.4)',
            overwrite: 'auto'
        });
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!form.full_name.trim() || !form.email.trim() || !form.phone.trim() || !form.college_name.trim()) {
            setError('Please fill in all required fields.');
            return;
        }
        setSubmitting(true);

        try {
            const { error: dbError } = await api.campusReps.create(form);
            if (dbError) throw new Error(dbError);
            setSubmitted(true);
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="cr-page" ref={pageRef}>
            <Navbar />
            <section className="cr-hero">
                <div className="cr-hero__grid" aria-hidden="true" />
                <div className="cr-hero__ambient" aria-hidden="true" />
                <div className="cr-hero__badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Campus Representative Programme
                </div>
                <h1 className="cr-hero__title">
                    Lead the <span className="accent-text">Campus Movement</span>
                </h1>
                <p className="cr-hero__sub">
                    Bridge the gap between your campus and the future of education.
                    As a Studiva Representative, you don't just represent a brand—you lead a legacy.
                    <br />
                    <span className="accent-text" style={{ fontWeight: 600 }}>Be the voice. Be the leader. Be Studiva.</span>
                </p>
            </section>

            <section className="cr-benefits">
                <div className="container">
                    <h2 className="cr-section-title">Studiva Campus Representative Privileges</h2>
                </div>
                <div className="cr-benefits__grid">
                    {BENEFITS.map((b, i) => (
                        <div
                            className={`cr-benefit cr-benefit--${b.layout}`}
                            key={i}
                            onMouseMove={handleBenefitMouseMove}
                            onMouseLeave={handleBenefitMouseLeave}
                        >
                            <div className="cr-benefit__icon">
                                <BenefitIcon src={b.icon} alt={b.title} />
                            </div>
                            <div className="cr-benefit__title">{b.title}</div>
                            <div className="cr-benefit__desc">
                                {b.desc}
                                {b.points && (
                                    <ul className="cr-benefit__points">
                                        {b.points.map((p, j) => (
                                            <li key={j}>{p}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="cr-form-section">
                <div className="cr-form-wrapper">
                    {submitted ? (
                        <div className="cr-success">
                            <div className="cr-success__check">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <h3>The First Step is Taken.</h3>
                            <p>
                                Our team is reviewing your profile. If you're the leader we're looking for, we'll be in touch soon to start your journey.
                            </p>
                            <Link href="/" className="cr-success__home-btn">
                                ← Back to Home
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="cr-form__header">
                                <h2>Join the Visionaries</h2>
                                <p>We're looking for the bold, the driven, and the leaders of tomorrow. Is that you?</p>
                            </div>

                            <form onSubmit={handleSubmit} autoComplete="off">
                                <div className="cr-field">
                                    <label className="cr-field__label" htmlFor="cr-fullname">Full Name</label>
                                    <input
                                        id="cr-fullname"
                                        className="cr-field__input"
                                        type="text"
                                        name="full_name"
                                        placeholder="Rupam Ghosh"
                                        value={form.full_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="cr-field">
                                    <label className="cr-field__label" htmlFor="cr-email">Email Address</label>
                                    <input
                                        id="cr-email"
                                        className="cr-field__input"
                                        type="email"
                                        name="email"
                                        placeholder="rupamghosh2025.cybsec@nsec.ac.in"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="cr-field">
                                    <label className="cr-field__label" htmlFor="cr-college">College / University Name</label>
                                    <input
                                        id="cr-college"
                                        className="cr-field__input"
                                        type="text"
                                        name="college_name"
                                        placeholder="Netaji Subhash Engineering College"
                                        value={form.college_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="cr-field-row">
                                    <div className="cr-field">
                                        <label className="cr-field__label" htmlFor="cr-year">Year of Study</label>
                                        <select
                                            id="cr-year"
                                            className="cr-field__select"
                                            name="year_of_study"
                                            value={form.year_of_study}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Year</option>
                                            <option value="1st">1st Year</option>
                                            <option value="2nd">2nd Year</option>
                                            <option value="3rd">3rd Year</option>
                                            <option value="4th">4th Year</option>
                                            <option value="other">Other / Postgrad</option>
                                        </select>
                                    </div>
                                    <div className="cr-field">
                                        <label className="cr-field__label" htmlFor="cr-phone">Phone Number</label>
                                        <input
                                            id="cr-phone"
                                            className="cr-field__input"
                                            type="tel"
                                            name="phone"
                                            placeholder="+91..."
                                            value={form.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="cr-field">
                                    <label className="cr-field__label" htmlFor="cr-why">Why do you want to join?</label>
                                    <textarea
                                        id="cr-why"
                                        className="cr-field__textarea"
                                        name="why_join"
                                        placeholder="Tell us a bit about your motivation..."
                                        value={form.why_join}
                                        onChange={handleChange}
                                        rows={4}
                                        required
                                    />
                                </div>

                                {error && <div className="cr-form__message cr-form__message--error">{error}</div>}

                                <button id="cr-submit-btn" type="submit" className="cr-form__submit" disabled={submitting}>
                                    {submitting ? <Loader size="small" /> : 'Apply Now'}
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
