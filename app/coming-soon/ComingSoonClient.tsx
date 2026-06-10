'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './ComingSoon.css';

export default function ComingSoonClient() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        
        tl.from('.cs-subtitle', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        })
        .from('.cs-title span', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.2)"
        }, "-=0.6")
        .from('.cs-tape', {
            scaleX: 0,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            transformOrigin: "center left"
        }, "-=0.4")
        .from('.cs-date', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.8");

    }, { scope: containerRef });

    return (
        <div className="coming-soon-page" ref={containerRef}>
            <Navbar />
            
            <main className="cs-main">
                <div className="cs-content">
                    <p className="cs-subtitle">STUDIVA APP REVOLUTION</p>
                    
                    <h1 className="cs-title">
                        <span>COMING</span>
                        <span>SOON</span>
                    </h1>

                    <div className="cs-tape">
                        <div className="cs-tape-text">
                            <span>Stay Tuned</span>
                            <span>Stay Tuned</span>
                            <span>Stay Tuned</span>
                            <span>Stay Tuned</span>
                            <span>Stay Tuned</span>
                            <span>Stay Tuned</span>
                            <span>Stay Tuned</span>
                            <span>Stay Tuned</span>
                            <span>Stay Tuned</span>
                            <span>Stay Tuned</span>
                            <span>Stay Tuned</span>
                            <span>Stay Tuned</span>
                        </div>
                    </div>

                    <div className="cs-date">
                        <p>EARLY 2026</p>
                        <p>PREPARE FOR THE ULTIMATE FREE STUDY COMPANION</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
