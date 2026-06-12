import type { Metadata } from 'next';
import Link from 'next/link';
import './legal.css';

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read Studiva's Terms of Service. Learn about our community guidelines, user responsibilities, and free educational sharing policies.",
};

export default function TOSPage() {
    return (
        <div className="legal-body">
            <div className="legal-container">
                <header className="legal-header">
                    <Link href="/" className="legal-logo">Studiva</Link>
                    <h1 className="legal-h1">Terms of Service</h1>
                    <p className="last-updated">Last Updated: June 6, 2026</p>
                </header>

                <section className="legal-content">
                    <p className="legal-p">Welcome to Studiva! These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Studiva mobile application and services (the &quot;Service&quot;), provided by CRINE. By using the Service, you agree to be bound by these Terms.</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">1. Acceptance of Terms</h2>
                    <p className="legal-p">By creating an account or accessing the Service, you confirm that you are at least 13 years old (or the minimum age required by local law) and have the authority to enter into these Terms. If you do not agree, do not use the Service.</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">2. User Accounts</h2>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Account Accuracy:</strong> You must provide accurate and complete information when registering.</li>
                        <li className="legal-li"><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials (such as Firebase auth tokens).</li>
                        <li className="legal-li"><strong>Responsibility:</strong> You are responsible for all activities that occur under your account.</li>
                    </ul>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">3. Content and Intellectual Property</h2>

                    <h3 className="legal-h3">3.1 Your Content</h3>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Ownership:</strong> You retain ownership of the study notes, PDFs, flashcards, playlists, and comments you upload or create.</li>
                        <li className="legal-li"><strong>License to CRINE:</strong> By posting content, you grant CRINE a worldwide, non-exclusive, royalty-free, sublicensable license to use, host, store, reproduce, modify, publish, and distribute your content for the purpose of operating, improving, and displaying the Service.</li>
                        <li className="legal-li"><strong>Content Protection:</strong> For safety and copyright enforcement, we apply automatic visual watermarking to uploaded study documents and PDFs.</li>
                    </ul>

                    <h3 className="legal-h3">3.2 Our Content</h3>
                    <p className="legal-p">Studiva and its logos, designs, custom tactile assets, and software are the intellectual property of CRINE. You may not use them without our prior written consent.</p>

                    <h3 className="legal-h3">3.3 Copyright Policy (DMCA)</h3>
                    <p className="legal-p">We respect intellectual property rights. If you believe your copyright has been infringed, please contact us at <a className="legal-a" href="mailto:support@crine.in">support@crine.in</a> with a formal takedown request containing proof of ownership.</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">4. Virtual Currencies and Rewards</h2>

                    <h3 className="legal-h3">4.1 Sparks (Status Currency)</h3>
                    <p className="legal-p">Sparks are non-monetary virtual points used to measure status, milestones, and rankings within the Service. Sparks have no independent monetary value, cannot be redeemed for cash, and can only be used within the app&apos;s gamification system (e.g., purchasing streak shields, avatar cosmetics, or custom profile frames).</p>

                    <h3 className="legal-h3">4.2 Emeralds (Reward Points)</h3>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Nature:</strong> Emeralds (EMD) are virtual platform points awarded as part of our revenue-sharing model (such as ad impressions served on your notes) and note-sharing sales.</li>
                        <li className="legal-li"><strong>No Expiration:</strong> Emeralds earned on the platform do not expire.</li>
                        <li className="legal-li"><strong>Conversion and Redemption:</strong> Emeralds have no value outside the Service&apos;s redemption framework. You may request to redeem Emeralds for &quot;Studiva Gift Cards&quot; or other rewards (such as UPI/Paytm or Amazon vouchers) through our wallet page, subject to manual verification.</li>
                        <li className="legal-li"><strong>Minimum Threshold:</strong> The minimum withdrawal threshold is 5,000 Emeralds (which is valued at &#8377;100 INR in Studiva Gift Cards). No redemptions will be processed below this limit.</li>
                    </ul>

                    <h3 className="legal-h3">4.3 Revenue Sharing and Sponsoring</h3>
                    <p className="legal-p">Our revenue-sharing models (such as ad-share payouts or content unlocks) are discretionary reward programs and do not constitute an employment relationship or a guaranteed income. Payouts are calculated based on verified ad impressions and genuine platform engagement.</p>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Paid Content &amp; Courses:</strong> Creators may set notes lock prices between 10 and 500 EMD. Course sales are shared at a rate of 70% in Emeralds to the creator.</li>
                        <li className="legal-li"><strong>Power Tips:</strong> Creators receive 80% of virtual tips (Power Tips) after platform processing cuts.</li>
                    </ul>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">5. Studiva Premium</h2>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Activation:</strong> Studiva Premium is an upgraded, non-recurring membership tier. It can be purchased/activated for 30 days at the rate of 2,500 Emeralds. There is no recurring automatic billing or traditional monthly credit card subscription plan.</li>
                        <li className="legal-li"><strong>Benefits:</strong> Activations grant ad-free feed access, a golden profile verification tick, a golden animated frame, one free daily spin in the Spin the Wheel game, free notes previews, and direct local downloads.</li>
                        <li className="legal-li"><strong>Refunds:</strong> Emerald purchases of Studiva Premium memberships are final and non-refundable.</li>
                    </ul>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">6. Prohibited Conduct and Anti-Cheat Policy</h2>
                    <p className="legal-p">You agree not to engage in any activity that cheats or manipulates the Service&apos;s gamification, ad revenue, or reward models. Prohibited behaviors include:</p>
                    <ul className="legal-ul">
                        <li className="legal-li">Using automated systems (bots, auto-clickers, macro recorders, or scripts) to simulate study time, automate quizzes, or farm Sparks and Emeralds.</li>
                        <li className="legal-li">Accessing the Service via Android/iOS emulators, virtual machines, or sandboxes to bypass focus tracking or device fingerprinting.</li>
                        <li className="legal-li">Installing, utilizing, or running ad-blocking software, DNS filters, or modifications that block, disable, or tamper with ad displays, video players, or rewarded ad placements.</li>
                        <li className="legal-li">Tampering with system clocks, local databases (Hive caches), network traffic, or APIs to manipulate daily login streaks, daily goal completion, spin wheel timers, or focus study logs.</li>
                        <li className="legal-li">Scraping, spamming, abusing, or sending automated queries to the Photon Study Assistant (Google Gemini &amp; Groq APIs).</li>
                        <li className="legal-li">Harassing other users, posting defamatory, illegal, or offensive study notes, or creating duplicate accounts to exploit referral bounties.</li>
                    </ul>
                    <p className="legal-p">Violation of these rules will result in immediate account termination, forfeiture of all Sparks and Emeralds, and potential blocking of your device and IP address.</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">7. Disclaimers and Limitation of Liability</h2>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>As-Is Basis:</strong> The Service, including the Photon Study Assistant and study explanations, is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind. We make no guarantees regarding the academic accuracy of answers generated by the study helper APIs (Google Gemini/Groq) or exam readiness.</li>
                        <li className="legal-li"><strong>Limitation of Liability:</strong> To the maximum extent permitted by law, CRINE shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service, loss of user-generated content, or academic performance.</li>
                    </ul>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">8. Governing Law</h2>
                    <p className="legal-p">These Terms are governed by the laws of India. Any disputes arising from these Terms will be subject to the exclusive jurisdiction of the courts in India.</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">9. Contact Us</h2>
                    <p className="legal-p">For any questions regarding these Terms, please contact us at <a className="legal-a" href="mailto:support@crine.in">support@crine.in</a> or visit <a className="legal-a" href="https://crine.in" target="_blank" rel="noopener noreferrer">crine.in</a>.</p>
                </section>

                <footer className="legal-footer">
                    <p>&copy; 2026 Studiva. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
