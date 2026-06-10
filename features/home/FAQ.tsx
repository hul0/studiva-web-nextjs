'use client';

import { useState, useRef, memo, useEffect } from 'react';
import { Plus, Minus, FileText, RefreshCw, HelpCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FAQ.css';

const faqCategories = [
    { id: 'resources', label: 'RESOURCES', icon: <FileText size={16} strokeWidth={2.5} /> },
    { id: 'rewards', label: 'REWARDS', icon: <RefreshCw size={16} strokeWidth={2.5} /> },
    { id: 'general', label: 'GENERAL', icon: <HelpCircle size={16} strokeWidth={2.5} /> },
];

const faqsData: Record<string, { q: string, a: string }[]> = {
    resources: [
        {
            q: 'WHAT KIND OF STUDY NOTES CAN I FIND ON STUDIVA?',
            a: 'Studiva offers a wide range of academic resources, specializing in college syllabus prep. You can find comprehensive MAKAUT Notes, WBJEE Notes for engineering entrance exams, semester-wise lecture notes, and solved question papers—all for free.',
        },
        {
            q: 'HOW DO I DOWNLOAD OR ACCESS THE NOTES?',
            a: 'You can access all notes instantly on the Studiva app. Simply search for your target topic (e.g., MAKAUT computer science or WBJEE physics prep) and view them. Access is completely free for students.',
        },
        {
            q: 'HOW DO YOU PREVENT PLAGIARISM AND PIRACY?',
            a: 'Notes on Studiva are served in a secure viewer that prevents direct downloading and screenshots. Your uploaded study materials stay secure, protecting your intellectual property.',
        },
    ],
    rewards: [
        {
            q: 'HOW DO CREATORS EARN REWARDS?',
            a: 'We share ad revenue generated from non-intrusive rewarded ads. When a student unlocks your note for free by viewing a quick ad, the revenue is split 50/50 and instantly credited to your Studiva Wallet.',
        },
        {
            q: 'HOW DO I WITHDRAW MY EARNINGS?',
            a: 'Once your wallet reaches the minimum withdrawal threshold of ₹100, you can request a direct transfer to your Indian bank account via UPI or NEFT. Payouts are processed within 30 days of verification.',
        },
        {
            q: 'ARE THERE ANY HIDDEN FEES?',
            a: 'No hidden fees. It is completely free to upload notes and free to access them. We only monetize through advertising and optional premium subscriptions.',
        },
    ],
    general: [
        {
            q: 'IS THERE A LIMIT ON UPLOADS?',
            a: 'No! You can upload an unlimited number of study materials. The more high-quality notes (like MAKAUT study sheets or WBJEE question guides) you share, the more learners you help, and the more rewards you earn.',
        },
        {
            q: 'DOES STUDIVA CHARGE FOR STUDY MATERIALS?',
            a: 'Never. Our mission is to democratize education. Studiva promotes free study notes for everyone. We do not use buy and sell mechanics, keeping high-quality education accessible to all.',
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
    const [activeCategory, setActiveCategory] = useState('resources');

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
