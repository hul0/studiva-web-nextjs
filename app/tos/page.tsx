'use client';

import Link from 'next/link';
import './legal.css';

export default function TOSPage() {
    return (
        <div className="legal-body">
            <div className="legal-container">
                <header className="legal-header">
                    <Link href="/" className="legal-logo">Studiva</Link>
                    <h1 className="legal-h1">Terms of Service</h1>
                    <p className="last-updated">Last Updated: April 28, 2026</p>
                </header>

                <section className="legal-content">
                    <p className="legal-p">Welcome to Studiva! These Terms of Service ("Terms") govern your access to and use of the Studiva mobile application and services (the "Service"), provided by CRINE. By using the Service, you agree to be bound by these Terms.</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">1. Acceptance of Terms</h2>
                    <p className="legal-p">By creating an account or accessing the Service, you confirm that you are at least 13 years old (or the minimum age required by local law) and have the authority to enter into these Terms. If you do not agree, do not use the Service.</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">2. User Accounts</h2>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Account Accuracy:</strong> You must provide accurate and complete information when registering.</li>
                        <li className="legal-li"><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials.</li>
                        <li className="legal-li"><strong>Responsibility:</strong> You are responsible for all activities that occur under your account.</li>
                    </ul>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">3. Content and Intellectual Property</h2>

                    <h3 className="legal-h3">3.1 Your Content</h3>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Ownership:</strong> You retain ownership of the study materials, messages, and other content you upload.</li>
                        <li className="legal-li"><strong>License to CRINE:</strong> By posting content, you grant CRINE a worldwide, non-exclusive, royalty-free, sublicensable license to use, host, store, reproduce, modify, publish, and distribute your content for the purpose of operating and improving the Service.</li>
                    </ul>

                    <h3 className="legal-h3">3.2 Our Content</h3>
                    <p className="legal-p">Studiva and its logos, designs, and software are the intellectual property of CRINE. You may not use them without our prior written consent.</p>

                    <h3 className="legal-h3">3.3 Copyright Policy (DMCA)</h3>
                    <p className="legal-p">We respect intellectual property rights. If you believe your copyright has been infringed, please contact us at <a className="legal-a" href="mailto:support@crine.in">support@crine.in</a> with a formal takedown request.</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">4. Virtual Currencies and Rewards</h2>

                    <h3 className="legal-h3">4.1 Sparks (Status Currency)</h3>
                    <p className="legal-p">Sparks are non-monetary virtual points used to measure status and rank within the Service. Sparks have no monetary value and cannot be redeemed for cash or other assets.</p>

                    <h3 className="legal-h3">4.2 Emeralds (Reward Points)</h3>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Nature:</strong> Emeralds are virtual platform points awarded as part of our revenue-sharing model.</li>
                        <li className="legal-li"><strong>No Monetary Value:</strong> Emeralds are not a legal currency. They have no value outside the Service's redemption framework.</li>
                        <li className="legal-li"><strong>Redemption:</strong> You may redeem Emeralds for "Studiva Gift Cards" or other rewards offered within the app, subject to our minimum withdrawal thresholds and verification.</li>
                    </ul>

                    <h3 className="legal-h3">4.3 Revenue Sharing</h3>
                    <p className="legal-p">Our revenue-sharing model (e.g., sharing ad revenue with creators) is a discretionary reward program and does not constitute an employment relationship or a guaranteed income. Amounts are calculated based on verified ad revenue and platform engagement metrics.</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">5. Prohibited Conduct</h2>
                    <p className="legal-p">You agree not to:</p>
                    <ul className="legal-ul">
                        <li className="legal-li">Use automated systems (bots) to simulate study time or "farm" Sparks and Emeralds.</li>
                        <li className="legal-li">Upload content that is illegal, defamatory, or violates intellectual property rights.</li>
                        <li className="legal-li">Harass other users or disrupt community features (battles, groups).</li>
                        <li className="legal-li">Attempt to hack, reverse-engineer, or compromise the Service's security.</li>
                    </ul>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">6. Subscriptions and Payments</h2>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Tiers:</strong> We offer Free and Pro Plans. Pricing, validity and benefits are subject to change.</li>
                        <li className="legal-li"><strong>Refunds:</strong> Payments for subscriptions or direct Emerald purchases are generally non-refundable, except as required by law.</li>
                    </ul>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">7. Termination</h2>
                    <p className="legal-p">We reserve the right to suspend or terminate your account at any time, with or without notice, if we believe you have violated these Terms or engaged in fraudulent activity.</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">8. Disclaimers and Limitation of Liability</h2>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>As-Is Basis:</strong> The Service is provided "as is" and "as available" without warranties of any kind.</li>
                        <li className="legal-li"><strong>Limitation of Liability:</strong> To the maximum extent permitted by law, CRINE shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service or loss of user-generated content.</li>
                    </ul>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">9. Governing Law</h2>
                    <p className="legal-p">These Terms are governed by the laws of India. Any disputes arising from these Terms will be subject to the exclusive jurisdiction of the courts in India.</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">10. Contact Us</h2>
                    <p className="legal-p">For any questions regarding these Terms, please contact <a className="legal-a" href="mailto:support@crine.in">support@crine.in</a> or visit <a className="legal-a" href="https://crine.in" target="_blank" rel="noopener noreferrer">crine.in</a></p>
                </section>

                <footer className="legal-footer">
                    <p>&copy; 2026 Studiva. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
