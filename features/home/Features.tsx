'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Layers, TrendingUp, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import './Features.css';

const Features = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useGSAP(() => {
        const el = sectionRef.current;
        if (!el) return;

        const items = el.querySelectorAll('.bento-item');
        gsap.fromTo(items,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 75%',
                    once: true,
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section id="features" className="features-bento" ref={sectionRef}>
            <div className="container">
                <div className="bento-grid">

                    {/* ── Left Column ── */}
                    <div className="bento-left-col">
                        <div className="bento-circle-wrapper bento-item">
                            <svg className="bento-circle-svg" viewBox="0 0 200 200">
                                <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="none" />
                                <text className="bento-circle-text">
                                    <textPath href="#circlePath" startOffset="0%">
                                        STUDIVA MARKETPLACE · INNOVATIVE ALTERNATIVE · STUDIVA MARKETPLACE · INNOVATIVE ALTERNATIVE ·
                                    </textPath>
                                </text>
                            </svg>
                            <div className="bento-circle-center">
                                <span>START<br />NOW</span>
                                <div className="orbit orbit-1"></div>
                                <div className="orbit orbit-2"></div>
                            </div>
                        </div>

                        <div className="bento-left-actions bento-item">
                            <div className="bento-icon-btn"><Search size={20} /></div>
                            <div className="bento-icon-btn"><Layers size={20} /></div>
                            <div className="bento-icon-btn"><TrendingUp size={20} /></div>
                        </div>
                    </div>

                    {/* ── Right Column ── */}
                    <div className="bento-right-col">

                        {/* Box 1: Discover */}
                        <div className="bento-item bento-card bento-card-white train-card">
                            <div className="bento-card-header">
                                <div className="bento-badge">HOW IT WORKS</div>
                                <div className="bento-stats">
                                    <span className="pill">24/7</span>
                                    <div className="stat-text">
                                        <strong>1050+</strong>
                                        <span>Resources Available</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bento-card-body train-body">
                                <div className="train-text-col">
                                    <h2>FIND YOUR NOTES<br /> WITHIN A <span className='flash-text'>FLASH</span></h2>
                                </div>
                                <div className="train-avatar-col">
                                    <Image src="/gifs/wally-west-speedster.gif" alt="Wally West speedster character representing fast note discovery" width={120} height={120} className="bento-avatar" unoptimized />
                                </div>
                            </div>
                        </div>

                        {/* Box 2: Upload */}
                        <div className="bento-item bento-card bento-card-lime">
                            <div className="bento-card-header">
                                <div className="bento-badge-outline"><CheckCircle2 size={14} /> PROVEN RESULTS</div>
                                <Sparkles size={20} />
                            </div>
                            <div className="bento-card-body bento-split">
                                <h2>SHARE NOTES<br />EFFORTLESSLY</h2>
                                <div className="bento-avatar-large-wrapper">
                                    <Image src="/gifs/peepo-cookie-peepo.gif" alt="Animated character representing effortless note sharing" width={120} height={120} className="bento-avatar-large" unoptimized />
                                    <div className="bento-check-badge"><CheckCircle2 size={16} color="var(--jet-black)" /></div>
                                </div>
                            </div>
                        </div>

                        {/* Box 4 Container */}
                        <div className="bento-bottom-row">
                            <div className="bento-item bento-card bento-card-black logotype-card">
                                <div className="bento-logo-center">
                                    <Image src="/images/studiva-butterfly.webp" alt="Studiva official butterfly icon" width={64} height={64} className="bento-logo-img" />
                                    <h2>STUDIVA™</h2>
                                </div>
                            </div>

                            <div className="bento-item bento-card bento-card-white customers-card">
                                <div className="bento-badge bento-badge-lime">900+ Students</div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Features;
