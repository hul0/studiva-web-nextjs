'use client';

import Link from 'next/link';
import './legal.css';

export default function DeleteAccountPage() {
    return (
        <div className="legal-body">
            <div className="legal-container">
                <header className="legal-header">
                    <Link href="/" className="legal-logo">Studiva</Link>
                    <h1 className="legal-h1">Account Deletion</h1>
                    <p className="last-updated">Effective Date: March 23, 2026</p>
                </header>

                <section className="legal-content">
                    <p className="legal-p">At Studiva, we respect your privacy and provide you with full control over your personal data. If you no longer wish to use our services, you can request the deletion of your account and all associated data at any time.</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">How to Request Account Deletion</h2>
                    <p className="legal-p">You can initiate the deletion of your Studiva account through the following methods:</p>
                    
                    <div className="steps-card">
                        <h3 className="legal-h3">1. In-App Deletion (Recommended)</h3>
                        <p className="legal-p">The fastest way to delete your account is directly within the Studiva mobile application:</p>
                        <div className="step-list">
                            <div className="step-item">
                                <span className="step-number">1</span>
                                <span className="step-text">Open the <strong>Studiva</strong> app on your mobile device.</span>
                            </div>
                            <div className="step-item">
                                <span className="step-number">2</span>
                                <span className="step-text">Navigate to your <strong>Profile</strong> tab (person icon).</span>
                            </div>
                            <div className="step-item">
                                <span className="step-number">3</span>
                                <span className="step-text">Tap on <strong>Settings</strong> (gear icon).</span>
                            </div>
                            <div className="step-item">
                                <span className="step-number">4</span>
                                <span className="step-text">Select <strong>Account Settings</strong>.</span>
                            </div>
                            <div className="step-item">
                                <span className="step-number">5</span>
                                <span className="step-text">Tap on <strong>Delete Account</strong> and follow the on-screen prompts.</span>
                            </div>
                        </div>
                    </div>

                    <div className="steps-card" style={{ marginTop: '24px' }}>
                        <h3 className="legal-h3">2. Request via Email</h3>
                        <p className="legal-p">If you are unable to access the app, you can request deletion by contacting our support team:</p>
                        <div className="email-box">
                            <p className="legal-p">Send an email to: <a className="legal-a" href="mailto:nmrupam@proton.me"><strong>nmrupam@proton.me</strong></a></p>
                            <p className="legal-p">Subject: <strong>Account Deletion Request</strong></p>
                            <p className="legal-p">Status: <strong>Will be processed within 30 days</strong></p>
                        </div>
                    </div>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">Data That Is Deleted</h2>
                    <p className="legal-p">Upon successful processing of your deletion request, the following information will be permanently removed from our active databases:</p>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Personal Identity:</strong> Your name, email address, username, and profile picture.</li>
                        <li className="legal-li"><strong>User-Generated Content:</strong> Your uploaded notes, PDFs, flashcards, playlists, and stories.</li>
                        <li className="legal-li"><strong>Social Data:</strong> Messages, comments, and group chat participations.</li>
                        <li className="legal-li"><strong>Progress & Achievements:</strong> Study stats, XP history, streaks, and quiz performance records.</li>
                    </ul>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">Data That May Be Retained</h2>
                    <p className="legal-p">In accordance with legal requirements and for the security of our community, we may retain certain limited information for a specific period:</p>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Financial & Audit Records:</strong> Transaction history related to virtual currencies (Emeralds/Sparks) and rewards redemptions may be kept for up to 7 years to comply with tax and auditing regulations.</li>
                        <li className="legal-li"><strong>Security & Fraud Prevention:</strong> If an account was flagged for fraudulent activity or security breaches, we may retain specific device identifiers or log data to prevent future abuse.</li>
                        <li className="legal-li"><strong>Legal Compliance:</strong> We may retain data as required by law or to respond to valid legal processes.</li>
                    </ul>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">What Happens After Deletion?</h2>
                    <p className="legal-p">Once your account is deleted, it cannot be restored. All your earned Sparks, Emeralds, and study materials will be permanently lost. If you wish to use Studiva again in the future, you will need to create a new account.</p>

                    <p className="legal-p">If you have any further questions regarding your data or the deletion process, please contact us at <a className="legal-a" href="mailto:nmrupam@proton.me">nmrupam@proton.me</a></p>
                </section>

                <footer className="legal-footer">
                    <p>&copy; 2026 Studiva. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
