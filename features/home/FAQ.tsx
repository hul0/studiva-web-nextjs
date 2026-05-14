'use client';

import { useState, useRef, memo, useEffect } from 'react';
import { Plus, Minus, FileText, RefreshCw, HelpCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FAQ.css';

const faqCategories = [
    { id: 'funding', label: 'FUNDING', icon: <FileText size={16} strokeWidth={2.5} /> },
    { id: 'repayments', label: 'REPAYMENTS', icon: <RefreshCw size={16} strokeWidth={2.5} /> },
    { id: 'general', label: 'GENERAL', icon: <HelpCircle size={16} strokeWidth={2.5} /> },
];

const faqsData: Record<string, { q: string, a: string }[]> = {
    funding: [
        {
            q: 'HOW QUICKLY CAN I ACCESS THE FUNDS?',
            a: "Once your notes are unlocked by a student, the funds are instantly credited to your Studiva Wallet. You can withdraw them to your bank account via requesting us after 30-days",
        },
        {
            q: 'WHAT CAN I USE THE FUNDING FOR?',
            a: 'The earnings are yours to keep! You can use them for your tuition, books, gadgets, or even just for your daily expenses.',
        },
        {
            q: 'HOW DO I KNOW THAT MY COMPANY IS A GOOD MATCH?',
            a: 'Studiva is a marketplace for students, by students. If you have well-structured, high-quality notes that helped you succeed, you are a perfect match to become a creator on our platform.',
        },
        {
            q: 'CAN I PAY TO SUPPLIERS ABROAD?',
            a: 'Currently, Studiva processes payouts primarily to Indian bank accounts via UPI and NEFT. We are working on expanding our payout options for international creators soon.',
        },
    ],
    repayments: [
        {
            q: 'WHAT IS THE REVENUE SPLIT?',
            a: 'You keep 90% of all direct sales. For rewarded ad unlocks, we split the ad revenue 50/50.',
        },
        {
            q: 'ARE THERE ANY HIDDEN FEES?',
            a: 'No hidden fees. We only take a platform fee when a transaction is successful.',
        }
    ],
    general: [
        {
            q: 'IS THERE A LIMIT ON UPLOADS?',
            a: 'No! You can upload an unlimited number of notes. The more you upload, the higher your chances of earning.',
        },
        {
            q: 'HOW DO YOU PREVENT PIRACY?',
            a: 'Notes on Studiva are served in a secure viewer that prevents direct downloading and screenshots. Your content stays yours, always!',
        }
    ]
};

const FAQItem = memo(({ faq, index }: { faq: { q: string, a: string }, index: number }) => {
    const [isOpen, setIsOpen] = useState(index === 0);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isOpen) {
            gsap.to(contentRef.current, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' });
        } else {
            gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.4, ease: 'power3.out' });
        }
    }, [isOpen]);

    return (
        <div className="faq-row" onClick={() => setIsOpen(!isOpen)}>
            <div className="faq-row-header">
                <h3 className="faq-question">{faq.q}</h3>
                <span className="faq-icon">
                    {isOpen ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                </span>
            </div>
            <div className="faq-row-body" ref={contentRef} style={{ height: index === 0 ? 'auto' : 0, overflow: 'hidden', opacity: index === 0 ? 1 : 0 }}>
                <p className="faq-answer">{faq.a}</p>
            </div>
        </div>
    );
});

FAQItem.displayName = 'FAQItem';

const FAQ = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeCategory, setActiveCategory] = useState('general');

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useGSAP(() => {
        const el = sectionRef.current;
        if (!el) return;

        gsap.fromTo('.faq-row',
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 70%',
                    once: true
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section className="faq-section" id="faq" ref={sectionRef}>
            <div className="faq-container">
                <div className="faq-sidebar">
                    <h2 className="faq-main-title">FAQS</h2>
                    <div className="faq-categories">
                        {faqCategories.map(cat => (
                            <button
                                key={cat.id}
                                className={`faq-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                <span className="faq-cat-icon">{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="faq-content">
                    {faqsData[activeCategory].map((faq, i) => (
                        <FAQItem key={`${activeCategory}-${i}`} faq={faq} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
