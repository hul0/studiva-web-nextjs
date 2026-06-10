'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, TrendingUp, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './RevenueCalc.css';

export default function RevenueCalcClient() {
    const [viewersPerDay, setViewersPerDay] = useState(500);
    const [notesPerWeek, setNotesPerWeek] = useState(2);
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);

    const containerRef = useRef(null);
    const revNumRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const adRev = 0.01;
        const rewardBonus = 1;
        const convRate = 0.1;
        const valuePerViewer = (rewardBonus * convRate) + (adRev * (1 - convRate));
        const total = Math.floor(viewersPerDay * 30 * valuePerViewer * notesPerWeek / 4);

        if (revNumRef.current) {
            gsap.to(revNumRef.current, {
                innerHTML: total,
                duration: 0.5,
                snap: { innerHTML: 1 },
                ease: "power2.out"
            });
        }

        setMonthlyRevenue(total);
    }, [viewersPerDay, notesPerWeek]);

    useGSAP(() => {
        gsap.from(".rev-card", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out"
        });
    }, { scope: containerRef });

    return (
        <div className="revenue-calc-page" ref={containerRef}>
            <Navbar />
            <div className="rev-container">
                <Link href="/" className="rev-back-btn">
                    <ArrowLeft size={20} /> BACK TO HOME
                </Link>

                <header className="rev-header">
                    <h1 className="rev-title">ESTIMATE YOUR <span className="highlight">EARNINGS</span></h1>
                    <p className="rev-subtitle">See how much you can earn by sharing your knowledge with the Studiva community.</p>
                </header>

                <div className="rev-grid">
                    <div className="rev-card rev-inputs">
                        <div className="input-group">
                            <div className="input-header">
                                <Users size={20} className="icon" />
                                <span>Daily Viewers</span>
                                <span className="val-badge">{viewersPerDay.toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min="5"
                                max="1000"
                                step="5"
                                value={viewersPerDay}
                                onChange={(e) => setViewersPerDay(parseInt(e.target.value))}
                                className="rev-slider"
                            />
                            <div className="slider-labels">
                                <span>5</span>
                                <span>5000+</span>
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="input-header">
                                <BookOpen size={20} className="icon" />
                                <span>Notes Uploaded Per Week</span>
                                <span className="val-badge">{notesPerWeek}</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={notesPerWeek}
                                onChange={(e) => setNotesPerWeek(parseInt(e.target.value))}
                                className="rev-slider"
                            />
                            <div className="slider-labels">
                                <span>1</span>
                                <span>20+</span>
                            </div>
                        </div>

                        <div className="rev-info-box">
                            <TrendingUp size={16} />
                            <p>Based on average ad rewards and free download patterns on Studiva.</p>
                        </div>
                    </div>

                    <div className="rev-card rev-results">
                        <span className="results-label">ESTIMATED MONTHLY REVENUE</span>
                        <div className="revenue-display">
                            <span className="currency">₹</span>
                            <h2 className="amount" ref={revNumRef}>0</h2>
                        </div>
                        <p className="payout-note">Withdraw instantly to your bank account via UPI.</p>

                        <div className="perks-list">
                            <div className="perk-item">
                                <div className="perk-dot"></div>
                                <span>90% Revenue Share</span>
                            </div>
                            <div className="perk-item">
                                <div className="perk-dot"></div>
                                <span>Ad-Supported Monetization</span>
                            </div>
                            <div className="perk-item">
                                <div className="perk-dot"></div>
                                <span>Free Download Ad Rewards</span>
                            </div>
                        </div>

                        <Link href="/dashboard" className="rev-cta-btn">
                            START EARNING NOW
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
