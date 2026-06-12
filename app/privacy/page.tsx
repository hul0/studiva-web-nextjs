import type { Metadata } from 'next';
import Link from 'next/link';
import './legal.css';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read Studiva's Privacy Policy. Learn how we handle student data, protect your privacy, and manage free study materials securely.",
};

export default function PrivacyPage() {
    return (
        <div className="legal-body">
            <div className="legal-container">
                <header className="legal-header">
                    <Link href="/" className="legal-logo">Studiva</Link>
                    <h1 className="legal-h1">Privacy Policy</h1>
                    <p className="last-updated">Last Updated: June 12, 2026</p>
                </header>

                <section className="legal-content">
                    <p className="legal-p">Studiva (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a product by CRINE, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information when you use the Studiva mobile application and services (collectively, the &quot;Service&quot;).</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">1. Information We Collect</h2>

                    <h3 className="legal-h3">1.1 Personal Information You Provide</h3>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Account Information:</strong> When you register, we collect your name, email address, and username.</li>
                        <li className="legal-li"><strong>Profile Information:</strong> Optional information such as your profile customization settings (including Dicebear avatar generation seeds), bio, college/institution name, and exam type (e.g., JEE, NEET, UPSC).</li>
                        <li className="legal-li"><strong>Communication:</strong> Information you provide when contacting support or participating in community forums, group chats, or live sessions.</li>
                    </ul>

                    <h3 className="legal-h3">1.2 User-Generated Content</h3>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Study Materials:</strong> Notes, PDFs, flashcards, and playlists you upload or create.</li>
                        <li className="legal-li"><strong>Social Interactions:</strong> Stories, comments, messages, poll votes, and battle results.</li>
                        <li className="legal-li"><strong>Quiz Performance:</strong> Your scores, attempt history, and progress.</li>
                    </ul>

                    <h3 className="legal-h3">1.3 Information Collected Automatically</h3>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Usage Data:</strong> We track your study habits, including session duration, subjects studied, daily goals, streaks, and XP progression.</li>
                        <li className="legal-li"><strong>Device and Log Information:</strong> IP address, device type, brand, model, operating system version, device identifiers (including Android build fingerprint, iOS identifier for vendor, and advertising identifiers like IDFA/AAID), push notification (FCM) tokens, and app version. This data is collected to authenticate access, secure user accounts, detect and prevent fraud, and prevent system abuse.</li>
                        <li className="legal-li"><strong>Ad Interactions:</strong> We collect data on the advertisements shown to you and your interactions with them (impressions, clicks, rewarded ad completions).</li>
                    </ul>

                    <h3 className="legal-h3">1.4 Financial and Transaction Data</h3>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Virtual Currency:</strong> Records of your Earned Sparks and Emeralds.</li>
                        <li className="legal-li"><strong>Redemption Data:</strong> Information required to process reward redemptions (e.g., username, Emerald balance, and UPI ID or email for gift card delivery).</li>
                    </ul>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">2. How We Use Your Information</h2>
                    <p className="legal-p">We use the collected information for the following purposes:</p>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Service Provision:</strong> To operate and maintain the social learning platform, including study tracking, interactive lessons, and leaderboards.</li>
                        <li className="legal-li"><strong>Personalization:</strong> To tailor your feed and provide smart helper features like your &quot;Study Persona,&quot; personalized study plans, and content suggestions.</li>
                        <li className="legal-li"><strong>Smart Assistant Features:</strong> To process text inputs, snapped photos, notes, and study files via the Photon Study Assistant. Chat logs and history are cached locally on your device.</li>
                        <li className="legal-li"><strong>Rewards System:</strong> To manage virtual currencies (Sparks and Emeralds), calculate earnings, and process redemptions.</li>
                        <li className="legal-li"><strong>Monetization:</strong> To serve relevant advertisements and facilitate creator earnings.</li>
                        <li className="legal-li"><strong>Communication:</strong> To send app-related notifications, streak alerts, and updates.</li>
                        <li className="legal-li"><strong>Security &amp; Fraud Prevention:</strong> To protect against unauthorized access, detect fraudulent earning activities (such as simulated study time, automated clicks, or emulators) via device fingerprinting, IP validation, and rate-limit tracking, and to ensure community safety.</li>
                    </ul>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">3. Data Processing and Storage</h2>

                    <h3 className="legal-h3">3.1 Local Storage</h3>
                    <p className="legal-p">We utilize local storage (specifically Hive) on your mobile device to store application settings, user session configurations, and cached chat logs/history for the Photon Study Assistant. Caching this data locally ensures low-latency performance and offline access.</p>

                    <h3 className="legal-h3">3.2 AI Integration (Gemini &amp; Groq APIs)</h3>
                    <p className="legal-p">To power the Photon Study Assistant, Doubt Snap photo recognition, and notes summarization features, user-submitted prompts, worksheets, and note contents are securely transmitted to and processed by third-party large language model APIs, specifically:</p>
                    <ul className="legal-ul">
                        <li className="legal-li">Google Gemini API</li>
                        <li className="legal-li">Groq API</li>
                    </ul>
                    <p className="legal-p">These services process the content to generate step-by-step explanations, metadata suggestions, and interactive explanations. This data is not used to train public models.</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">4. Sharing of Information</h2>

                    <h3 className="legal-h3">4.1 With Other Users</h3>
                    <p className="legal-p">Your username, profile picture, rank, badges, and publicly shared content are visible to other users on leaderboards, in feeds, and within social features.</p>

                    <h3 className="legal-h3">4.2 Third-Party Service Providers</h3>
                    <p className="legal-p">We share information with third parties that help us provide the Service:</p>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Infrastructure &amp; Authentication:</strong> Cloudflare (CDN, Storage), Firebase (Auth, Analytics), and Turso (Database).</li>
                        <li className="legal-li"><strong>AI &amp; Processing APIs:</strong> Google Gemini API and Groq API.</li>
                    </ul>

                    <h3 className="legal-h3">4.3 Advertising Partners and Mediation Stack</h3>
                    <p className="legal-p">To deliver our ad-supported reward services, we integrate with Google AdMob and the AppLovin MAX mediation stack. Limited device identifiers (such as IDFA/AAID) and basic ad interaction records are shared with these networks and their demand partners (including Meta Audience Network, Unity, and ironSource) to serve personalized or contextual advertisements. You can opt out of personalized tracking via your device&apos;s system settings.</p>

                    <h3 className="legal-h3">4.4 Search Engine Indexing</h3>
                    <p className="legal-p">To improve the discoverability of public educational resources, basic public metadata regarding your profile (such as your username, bio, and profile picture) and public content titles/descriptions may be indexed by external search engines (e.g., Google). We explicitly safeguard your sensitive study materials and original uploaded documents (such as full PDFs or videos); direct links to these source files are never exposed to search engine crawlers.</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">5. Virtual Currencies (Sparks &amp; Emeralds)</h2>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Sparks:</strong> Non-monetary status points used for gamification and rank. History of Sparks earned is stored to maintain the integrity of leaderboards.</li>
                        <li className="legal-li"><strong>Emeralds:</strong> Reward points earned via ad revenue sharing and note sales. Emeralds do not expire, but transactions involving Emeralds are recorded for auditing and payout processing to prevent fraud.</li>
                        <li className="legal-li"><strong>No Cash Value:</strong> Emeralds represent virtual points and have no independent monetary value outside the Service&apos;s redemption framework.</li>
                    </ul>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">6. Data Security and Retention</h2>
                    <ul className="legal-ul">
                        <li className="legal-li"><strong>Security:</strong> We use industry-standard encryption and security measures to protect your data.</li>
                        <li className="legal-li"><strong>Retention:</strong> We retain your personal information as long as your account is active. If you delete your account, we may retain certain information for legal compliance, fraud prevention, or to resolve disputes.</li>
                    </ul>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">7. Your Rights and Choices</h2>
                    <p className="legal-p">Depending on your location, you may have the right to:</p>
                    <ul className="legal-ul">
                        <li className="legal-li">Access the personal data we hold about you.</li>
                        <li className="legal-li">Request correction or deletion of your data.</li>
                        <li className="legal-li">Opt-out of personalized advertising.</li>
                        <li className="legal-li">Set your profile to private to limit visibility.</li>
                    </ul>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">8. Children&apos;s Privacy</h2>
                    <p className="legal-p">The Service is intended for students aged 13 and above (or the minimum age required by local law). We do not knowingly collect data from children under this age without parental consent.</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">9. Changes to This Policy</h2>
                    <p className="legal-p">We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy in the app or via email.</p>

                    <hr className="legal-hr" />

                    <h2 className="legal-h2">10. Contact Us</h2>
                    <p className="legal-p">If you have any questions about this Privacy Policy, please contact us at <a className="legal-a" href="mailto:support@crine.in">support@crine.in</a> or visit <a className="legal-a" href="https://crine.in" target="_blank" rel="noopener noreferrer">crine.in</a></p>
                </section>

                <footer className="legal-footer">
                    <p>&copy; 2026 Studiva. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
