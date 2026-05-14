'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Marquee.css';

const items = [
    'Upload notes instantly',
    'Earn from paid access',
    'Rewarded ads — not forced',
    'JEE · NEET · CBSE',
    'No subscription needed',
    'Withdraw via UPI',
    'Real student content',
    'Growing community',
    'Handwritten & PDF support',
    'Creator dashboard',
];

const Dot = () => <span className="marquee__dot" aria-hidden="true" />;

const Marquee = () => {
    const trackRef = useRef(null);
    const marqueeTween = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useGSAP(() => {
        const track = trackRef.current;
        if (!track) return;

        marqueeTween.current = gsap.to(track, {
            xPercent: -50,
            repeat: -1,
            duration: 35,
            ease: "none",
        });

        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                const velocity = self.getVelocity();
                const direction = self.direction;
                const timeScaleCurve = direction === 1 ? 1 + velocity / 2000 : -1 + velocity / 2000;
                
                if (marqueeTween.current) {
                    gsap.to(marqueeTween.current, { 
                        timeScale: timeScaleCurve, 
                        duration: 0.1, 
                        overwrite: true 
                    });
                    
                    gsap.to(marqueeTween.current, { 
                        timeScale: 1, 
                        duration: 0.5, 
                        delay: 0.15, 
                        overwrite: "auto" 
                    });
                }
            }
        });
    }, { scope: trackRef });

    const handleEnter = () => marqueeTween.current?.pause();
    const handleLeave = () => marqueeTween.current?.play();

    return (
        <div className="marquee-strip" aria-hidden="true" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <div className="marquee-track" ref={trackRef}>
                {[...items, ...items].map((item, i) => (
                    <span key={i} className="marquee__item">
                        {item}
                        <Dot />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
