'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import './Comparison.css';

const features = [
    { text: '90% Creator Revenue Share', color: 'accent' },
    { text: 'Rewarded Ad Support', color: 'light' },
    { text: '₹200 Withdrawal Threshold', color: 'light' },
    { text: 'Content Security', color: 'accent' },
    { text: 'Powerful SEO Discoverability', color: 'accent' },
    { text: 'Fast Partner Approval', color: 'light' }
];

const Comparison = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useGSAP(() => {
        const el = sectionRef.current;

        gsap.to('.why-question-mark', {
            y: -10,
            rotation: 25,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.from('.why-title-line', {
            scrollTrigger: {
                trigger: el,
                start: 'top 75%',
                once: true
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });

        gsap.from('.why-pill', {
            scrollTrigger: {
                trigger: el,
                start: 'top 70%',
                once: true
            },
            scale: 0.8,
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.5)'
        });

    }, { scope: sectionRef });

    return (
        <section className="why-section" id="compare" ref={sectionRef}>
            <div className="why-container">
                <div className="why-header">
                    <div className="why-text-block">
                        <div className="why-title-line why-white">WHY</div>
                        <div className="why-title-line why-accent">CHOOSE</div>
                        <div className="why-title-line why-us-line">
                            <span className="why-arrow-circle">
                                <ArrowRight size={36} strokeWidth={3} color="#000" />
                            </span>
                            <span className="why-white">US</span>
                        </div>
                    </div>
                    <div className="why-question-mark">?</div>
                </div>

                <div className="why-pills-grid">
                    {features.map((f, i) => (
                        <div key={i} className={`why-pill why-pill--${f.color}`}>
                            <div className="why-pill-dot"></div>
                            <span className="why-pill-text">{f.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Comparison;
