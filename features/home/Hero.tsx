'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Rocket, Users } from 'lucide-react';
import Link from 'next/link';

import './Hero.css';

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(useGSAP);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('.gsap-title-word', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "back.out(1.7)"
        })
            .from('.gsap-sub', {
                y: 20,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out"
            }, "-=0.2")
            .from('.gsap-cta', {
                y: 20,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out"
            }, "-=0.4")
            .from('.gsap-stats', {
                opacity: 0,
                duration: 1
            }, "-=0.2")
            .from('.gsap-visual', {
                scale: 0.9,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.5)"
            }, "-=1");

        gsap.to('.hero__stat', {
            y: -10,
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.3
        });

        gsap.to('.phone-mockup', {
            y: -12,
            rotation: 1,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        gsap.to('.accent-text', {
            backgroundSize: "100% 100%",
            color: "var(--surface)",
            duration: 1.5,
            ease: "power3.inOut",
            delay: 0.8,
            stagger: 0.2
        });

    }, { scope: containerRef });

    return (
        <section className="hero" ref={containerRef}>
            <div className="container hero__inner">
                <div className="hero__left-content">
                    <div className="hero__text-layer">
                        <h1 className="hero__title">
                            <span className="gsap-title-word" style={{ display: 'inline-block' }}>
                                Learn Together
                            </span>
                            <br />
                            <span className="accent-text gsap-title-word" style={{ display: 'inline-block' }}>
                                Earn
                            </span>
                            {' '}
                            <span className="accent-text gsap-title-word" style={{ display: 'inline-block' }}>
                                Together.
                            </span>
                        </h1>
                    </div>

                    <div className="hero__bottom-row">
                        <div className="hero__bottom-left gsap-sub">
                            <p className="hero__sub section-sub">
                                A free academic platform that respects your time.
                                Access premium resources and earn rewards through ad-support — <strong>no forced ads, ever.</strong>
                            </p>
                            <div className="hero__stats gsap-stats">
                                <div className="hero__stat">
                                    <Users size={18} />
                                    <span><strong>1100+</strong> Students</span>
                                </div>
                                <div className="hero__stat">
                                    <Rocket size={18} />
                                    <span><strong>Just Launched</strong> & Growing</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero__bottom-right gsap-cta">
                            <a href="/download" className="brutalist-button">
                                <svg className="brutalist-icon" viewBox="0 0 918.6 515.1" width="24" height="24" fill="currentColor">
                                    <path d="M918.6 515.1h-918.6c14.7-155.7 103.7-288.7 235.1-359.9l-76.2-132c-4.3-7.4-1.8-16.8 5.6-21.1s16.8-1.8 21.1 5.6l77.2 133.7c58.9-26.9 125.2-41.9 196.5-41.9s137.6 15 196.5 41.9l77.2-133.7c4.2-7.4 13.7-9.9 21-5.6s9.9 13.7 5.6 21.1l-76.2 132c131.5 71.2 220.5 204.2 235.2 359.9zm-248.5-129c21.3 0 38.6-17.3 38.5-38.5 0-21.2-17.2-38.5-38.5-38.5-21.2 0-38.5 17.2-38.5 38.5 0 21.2 17.2 38.5 38.5 38.5zm-421.7 0c21.3 0 38.6-17.3 38.5-38.5 0-21.2-17.2-38.5-38.5-38.5-21.2 0-38.5 17.2-38.5 38.5 0 21.2 17.2 38.5 38.5 38.5z" />
                                </svg>
                                <div className="button-text">
                                    <span>Download for</span>
                                    <span>android</span>
                                </div>
                            </a>
                            <Link className="fancy" href="/verified-creator">
                                <span className="top-key"></span>
                                <svg className="fancy-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                <span className="text">Become a Creator</span>
                                <span className="bottom-key-1"></span>
                                <span className="bottom-key-2"></span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="hero__visual-container gsap-visual">
                    <div className="phone-mockup">
                        <div className="phone-screen">
                            <div className="phone-notch"></div>
                            <img
                                src="/images/phone-screenshot.webp"
                                alt="Studiva App Screenshot"
                                className="phone-screenshot-img"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
