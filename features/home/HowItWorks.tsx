'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UploadCloud, Banknote, Unlock, FastForward } from 'lucide-react';
import './HowItWorks.css';

const steps = [
    {
        title: 'Upload your notes',
        desc: 'Quickly upload your PDFs in high resolution.',
        icon: <UploadCloud size={32} strokeWidth={1.5} />,
        color: 'var(--lime-green)'
    },
    {
        title: 'Set access mode',
        desc: 'Choose free or ad-supported reward access.',
        icon: <Banknote size={32} strokeWidth={1.5} />,
        color: '#ffffff'
    },
    {
        title: 'Students unlock it',
        desc: 'Learners unlock for free or support via ad rewards.',
        icon: <Unlock size={32} strokeWidth={1.5} />,
        color: 'var(--soft-ivory)'
    },
    {
        title: 'Instant Withdrawals',
        desc: 'Withdraw earnings directly to UPI.',
        icon: <FastForward size={32} strokeWidth={1.5} />,
        color: 'var(--surface-3)'
    },
];

const HowItWorks = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useGSAP(() => {
        const el = sectionRef.current;
        if (!el) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: "top top",
                end: "+=3000",
                pin: true,
                scrub: 1,
            }
        });

        tl.fromTo(".hiw-word", {
            opacity: 0,
            scale: 3,
            z: 500,
            y: 100,
            rotationX: 90
        }, {
            opacity: 1,
            scale: 1,
            z: 0,
            y: 0,
            rotationX: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out"
        });

        tl.to({}, { duration: 1 });

        tl.to(".hiw-word", {
            opacity: 0,
            y: -200,
            scale: 0.5,
            duration: 1,
            stagger: 0.1,
            ease: "power2.in"
        });

        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth < 1024;

        tl.fromTo(".hiw-scatter-card", {
            x: (i) => [-window.innerWidth, window.innerWidth, -window.innerWidth, window.innerWidth][i],
            y: (i) => [-window.innerHeight, window.innerHeight, window.innerHeight, -window.innerHeight][i],
            rotation: (i) => [180, -180, 90, -90][i],
            scale: 0.2,
            opacity: 0
        }, {
            x: (i) => {
                if (isMobile) return [-90, 90, -90, 90][i];
                if (isTablet) return [-220, -75, 75, 220][i];
                return [-420, -140, 140, 420][i];
            },
            y: (i) => {
                if (isMobile) return [-110, -110, 110, 110][i];
                if (isTablet) return [30, -20, 25, -15][i];
                return [20, -10, 15, -5][i];
            },
            rotation: (i) => {
                if (isMobile) return [-2, 2, -1, 3][i];
                return [-8, 5, -3, 6][i];
            },
            scale: 1,
            opacity: 1,
            duration: 2,
            stagger: 0.2,
            ease: "back.out(1.2)"
        }, "-=0.5");

    }, { scope: sectionRef });

    return (
        <section className="how-it-works-scatter" id="how-it-works" ref={sectionRef}>
            <div className="hiw-container">
                <h2 className="hiw-hero-text">
                    <span className="hiw-word" style={{ display: 'inline-block', marginRight: '30px' }}>Kaise</span>
                    <span className="hiw-word" style={{ display: 'inline-block' }}>nahi hogi</span><br />
                    <span className="hiw-word" style={{ display: 'inline-block' }}>padhai?</span>
                </h2>

                <div className="hiw-cards-wrapper">
                    {steps.map((step, i) => (
                        <div key={i} className={`hiw-scatter-card hiw-card-${i}`} style={{ backgroundColor: step.color }}>
                            <div className="hiw-card-img-box">
                                {step.icon}
                            </div>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                            <div className="hiw-card-pin"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
