'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './Team.css';

/* ── Helper: DiceBear Lorelei avatar URL ─────────────── */
const avatar = (seed: string) =>
    `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(seed)}&size=128`;

/* ── Team data ───────────────────────────────────────── */
const leadership = [
    { name: 'Rupam Ghosh', role: 'Lead App & Web Developer', tag: 'Founder', seed: 'Aiden' },
];

const engineering = [
    { name: 'Rudra Narayan Chatterjee', role: 'Web Developer', tag: 'Web Developer', seed: 'Jack' },
    { name: 'Ayush Burman', role: 'Full Stack Engineer', tag: 'Full Stack Engineer', seed: 'Jack' },
    { name: 'Debargha Sarkar', role: 'Android Developer', tag: 'App Developer', seed: 'Jack' },
];

const creative = [
    { name: 'Satyaki Das', role: 'Creative Director', tag: 'Creative Director', seed: 'Jack' },
    { name: 'Soham Singh', role: 'Creative Director', tag: 'Creative Director', seed: 'Alexander' },
    { name: 'Freja Chandni', role: 'Creative Director', tag: 'Creative Director', seed: 'Adrian' },
];

const prTeam = [
    { name: 'Md. Shadman Shahnawaz', role: 'PR Head', tag: 'PR Head', seed: 'Jack', image: '/team_figures/shadman.jpeg' },
    { name: 'Sk. Aqib', role: 'Outreach', seed: 'Alexander', image: '/team_figures/aqib.jpeg' },
    { name: 'Rohit Jha', role: 'Outreach', seed: 'Alexander' },
    { name: 'Anubhav Bishwakarma', role: 'Outreach', seed: 'Alexander' },
    { name: 'Subhamoy Sinha', role: 'Outreach', seed: 'Alexander' },
];

/* ── Section component ───────────────────────────────── */
const TeamSection = ({ label, title, members, variant = 'default' }: { label: string, title: string, members: any[], variant?: string }) => (
    <section className={`tm-section tm-section--${variant}`}>
        <div className="tm-container">
            <div className="tm-section__header" data-anim>
                <span className="tm-section__label">{label}</span>
                <h2 className="tm-section__title">{title}</h2>
            </div>
            <div className={`tm-grid tm-grid--${variant}`}>
                {members.map((m, i) => (
                    <div className="tm-card" key={i} data-anim>
                        <div className="tm-card__avatar-wrap">
                            <img
                                className="tm-card__avatar"
                                src={m.image || avatar(m.seed || m.name)}
                                alt={m.name}
                            />
                            {m.tag && <span className="tm-card__tag">{m.tag}</span>}
                        </div>
                        <div className="tm-card__info">
                            <h3 className="tm-card__name">{m.name}</h3>
                            <p className="tm-card__role">{m.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default function TeamPage() {
    const pageRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useGSAP(() => {
        gsap.utils.toArray('.tm-section').forEach((section: any) => {
            const header = section.querySelector('.tm-section__header');
            const cards = section.querySelectorAll('.tm-card');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 82%',
                    toggleActions: 'play none none none',
                    once: true,
                },
            });

            if (header) {
                tl.from(header, { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' });
            }
            if (cards.length) {
                tl.from(cards, {
                    y: 40,
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power3.out',
                }, '-=0.4');
            }
        });

        gsap.utils.toArray('.tm-card').forEach((card: any, i) => {
            gsap.to(card, {
                y: i % 2 === 0 ? -12 : 8,
                ease: 'none',
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 3,
                },
            });
        });
    }, { scope: pageRef });

    return (
        <div className="tm-page" ref={pageRef}>
            <Navbar />
            <header className="tm-hero">
                <div className="tm-hero__grid" aria-hidden="true" />
                <div className="tm-hero__ambient" aria-hidden="true" />
                <div className="tm-container tm-hero__inner">
                    <span className="tm-hero__eyebrow">The People Behind Studiva</span>
                    <h1 className="tm-hero__title">
                        Meet our <span className="tm-hero__accent">Team</span>
                    </h1>
                    <p className="tm-hero__sub">
                        Passionate students and builders crafting the future of educational content sharing.
                    </p>
                </div>
            </header>

            <TeamSection
                label="Leadership"
                title="The visionaries steering the ship."
                members={leadership}
                variant="leadership"
            />

            <TeamSection
                label="Engineering"
                title="Code that powers the platform."
                members={engineering}
                variant="default"
            />

            <TeamSection
                label="Creative"
                title="Design that tells the story."
                members={creative}
                variant="solo"
            />

            <TeamSection
                label="PR & Outreach"
                title="The voice that carries far."
                members={prTeam}
                variant="pr"
            />

            <section className="tm-cta">
                <div className="tm-container tm-cta__inner">
                    <h2 className="tm-cta__title">Want to be part of the journey?</h2>
                    <p className="tm-cta__sub">We're always looking for ambitious people who want to shape education.</p>
                    <div className="tm-cta__buttons">
                        <Link href="/verified-creator" className="tm-btn tm-btn--primary">
                            Become a Creator
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                        <Link href="/" className="tm-btn tm-btn--ghost">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
