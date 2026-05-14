'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { api } from '@/services/api';
import Loader from '../common/Loader';
import './Footer.css';

const Footer = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const massiveTextRef = useRef<HTMLHeadingElement>(null);
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    const toggleDropdown = (id: string) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const res = await api.newsletter.subscribe(email);
            if (res.error) {
                setStatus('error');
                setMessage(res.error.includes('unique') ? 'ALREADY SUBSCRIBED!' : 'SOMETHING WENT WRONG');
            } else {
                setStatus('success');
                setMessage('YOU ARE ON THE LIST!');
                setEmail('');
            }
        } catch (err) {
            setStatus('error');
            setMessage('CONNECTION FAILED');
        }
    };

    const categories = [
        {
            id: 'product',
            title: 'PRODUCT',
            links: [
                { name: 'Features', url: '#features' },
                { name: 'How it works', url: '#how-it-works' },
                { name: 'Creator Tools', url: '/revenue-calc' },
                { name: 'Suggest a Feature', url: '/suggest-feature' }
            ]
        },
        {
            id: 'company',
            title: 'COMPANY',
            links: [
                { name: 'Team', url: '/team' },
                { name: 'Support', url: '/support' },
                { name: 'Sitemap', url: '/sitemap.xml' }
            ]
        },
        {
            id: 'legal',
            title: 'LEGAL',
            links: [
                { name: 'Privacy Policy', url: '/privacy' },
                { name: 'Terms of Service', url: '/tos' },
                { name: 'Account Deletion', url: '/delete-account' }
            ]
        },
    ];

    const socials = [
        { name: 'INSTAGRAM', url: 'https://instagram.com/studiva.hq' }
    ];

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 641px)", () => {
            const letters = massiveTextRef.current?.querySelectorAll('.footer-letter');
            if (!letters || letters.length === 0) return;

            gsap.to(letters, {
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 1.4,
                stagger: {
                    each: 0.12,
                    from: "start"
                },
                ease: "bounce.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 85%",
                    end: "top 20%",
                    toggleActions: "play reverse play reverse"
                }
            });
        });

        const socialBtns = footerRef.current?.querySelectorAll('.footer-b__social-btn');
        if (!socialBtns) return;

        socialBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e: any) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
            });
        });

    }, { scope: footerRef });

    const FooterText = "STUDIVA";

    return (
        <footer className="footer-brutalist" id="footer" ref={footerRef}>
            <div className="footer-b__top-area">
                <div className="container">
                    <div className="footer-b__grid">
                        <div className="footer-b__col footer-b__dropdowns">
                            {categories.map(cat => (
                                <div key={cat.id} className="footer-b__dropdown">
                                    <button
                                        className="footer-b__dropdown-btn"
                                        onClick={() => toggleDropdown(cat.id)}
                                    >
                                        {cat.title}
                                        <span className={`footer-b__arrow ${openDropdown === cat.id ? 'open' : ''}`}>↘</span>
                                    </button>
                                    <div className={`footer-b__dropdown-content ${openDropdown === cat.id ? 'open' : ''}`}>
                                        {cat.links.map(link => (
                                            link.url.startsWith('http') || link.url.includes('.xml') ? (
                                                <a href={link.url} key={link.name} className="footer-b__link" target={link.url.startsWith('http') ? "_blank" : undefined}>
                                                    {link.name}
                                                </a>
                                            ) : (
                                                <Link href={link.url} key={link.name} className="footer-b__link">
                                                    {link.name}
                                                </Link>
                                            )
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="footer-b__col footer-b__newsletter">
                            <p className="footer-b__text-block">
                                SIGN UP FOR THE LATEST RESOURCES,<br />
                                NOTES & INSIGHTS
                            </p>
                            <form className="footer-b__form" onSubmit={handleNewsletterSubmit}>
                                <input
                                    type="email"
                                    placeholder={status === 'success' ? "THANK YOU!" : "EMAIL ADDRESS"}
                                    className={`footer-b__input ${status}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === 'loading' || status === 'success'}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="footer-b__submit"
                                    disabled={status === 'loading' || status === 'success'}
                                >
                                    {status === 'loading' ? (
                                        <Loader size="small" />
                                    ) : (
                                        <ArrowRight size={16} color="#171717" strokeWidth={2.5} />
                                    )}
                                </button>
                            </form>
                            {message && (
                                <p className={`footer-b__message ${status}`}>
                                    {message}
                                </p>
                            )}
                        </div>

                        <div className="footer-b__col footer-b__socials">
                            {socials.map(social => (
                                <a href={social.url} key={social.name} className="footer-b__social-btn" target="_blank" rel="noopener noreferrer">
                                    {social.name} <ArrowUpRight size={14} color="#171717" strokeWidth={2.5} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-b__bottom-area">
                <div className="footer-b__massive-text" ref={massiveTextRef}>
                    {FooterText.split('').map((char, index) => (
                        <span key={index} className="footer-letter">{char}</span>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
