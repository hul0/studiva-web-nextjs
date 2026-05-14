'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './NotFound.css';

export default function NotFound() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        
        tl.from('.not-found__image-wrapper', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.5)",
            delay: 0.2
        })
        .from('.not-found__404', {
            scale: 0.8,
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.4)"
        }, "-=0.4")
        .from('.not-found__text', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.6");

        gsap.to('.not-found__image-wrapper', {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: containerRef });

    return (
        <div className="not-found-page" ref={containerRef}>
            <Navbar />
            <main className="not-found-main">
                <div className="not-found__header-content">
                    <h1 className="not-found__404">404</h1>
                    <p className="not-found__text">The Page You Requested Could Not Be Found.</p>
                </div>
                <div className="not-found__image-wrapper">
                    <img 
                        src="/images/error_cat_404.png" 
                        alt="Grumpy Error Cat" 
                        className="not-found__image"
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
