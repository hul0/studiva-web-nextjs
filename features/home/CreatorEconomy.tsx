'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CreatorEconomy.css';

const statsData = [
    {
        desc: 'Revenue share we provide our creators on every sale.',
        value: 90,
        suffix: '%',
        prefix: ''
    },
    {
        desc: 'Different monetization modes available for your notes.',
        value: 3,
        suffix: '+',
        prefix: ''
    },
    {
        desc: 'Supported content types including PDFs and Quizzes.',
        value: 4,
        suffix: '+',
        prefix: ''
    },
    {
        desc: 'Minimum withdrawal threshold for instant UPI transfer.',
        value: 100,
        suffix: '',
        prefix: '₹'
    },
    {
        desc: 'Average activity of learners who stay with our platform.',
        value: 85,
        suffix: '%',
        prefix: ''
    }
];

const StatSquare = ({ stat }: { stat: typeof statsData[0] }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const numRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useGSAP(() => {
        if (!numRef.current) return;

        gsap.fromTo(numRef.current, {
            innerHTML: "0"
        }, {
            innerHTML: stat.value.toString(),
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    }, { scope: cardRef });

    return (
        <div className="ce-square-card" ref={cardRef}>
            <div className="ce-bracket ce-tl"></div>
            <div className="ce-bracket ce-tr"></div>
            <div className="ce-bracket ce-bl"></div>
            <div className="ce-bracket ce-br"></div>

            <p className="ce-square-desc">{stat.desc}</p>
            <div className="ce-square-val">
                {stat.prefix}<span ref={numRef}>0</span>{stat.suffix}
            </div>
        </div>
    );
};

const CreatorEconomy = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useGSAP(() => {
        const el = sectionRef.current;
        if (!el) return;

        gsap.fromTo(".ce-big-text", {
            y: 50, opacity: 0
        }, {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: ".ce-big-text", start: "top 80%" }
        });

        gsap.fromTo(".ce-square-card", {
            scale: 0.8, opacity: 0, rotation: 5
        }, {
            scale: 1, opacity: 1, rotation: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: ".ce-squares-grid",
                start: "top 75%"
            }
        });

    }, { scope: sectionRef });

    return (
        <section className="creator-economy-squares" id="creators" ref={sectionRef}>
            <div className="ce-bg-graphic">
                <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="400" cy="400" r="300" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                    <circle cx="400" cy="400" r="200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                    <circle cx="400" cy="400" r="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                    <path d="M 100 400 Q 400 100 700 400 T 100 400" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                    <path d="M 400 100 Q 700 400 400 700 T 400 100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                </svg>
            </div>

            <div className="container ce-squares-container">
                <div className="ce-top-row">
                    <h2 className="ce-big-text">
                        MONETIZATION IS<br />
                        A LONG-TERM<br />
                        STRATEGY
                    </h2>
                </div>

                <div className="ce-squares-grid">
                    <div className="ce-grid-col ce-col-1">
                        <StatSquare stat={statsData[0]} />
                        <StatSquare stat={statsData[3]} />
                    </div>

                    <div className="ce-grid-col ce-col-2">
                        <StatSquare stat={statsData[1]} />
                        <div className="ce-mid-text">
                            WE DON'T JUST HOST<br />
                            FILES - WE PROVIDE<br />
                            SOLUTIONS
                        </div>
                    </div>

                    <div className="ce-grid-col ce-col-3">
                        <StatSquare stat={statsData[2]} />
                        <StatSquare stat={statsData[4]} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreatorEconomy;
