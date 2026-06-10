import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";
import Loader from "@/components/common/Loader";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.studiva.co.in"),
  title: {
    default: "Studiva | Free Study Notes, MAKAUT & WBJEE Resources",
    template: "%s | Studiva",
  },
  description: "Studiva is the ultimate study platform for students to get free study notes, including MAKAUT Notes, WBJEE Notes, and engineering college resources. Share notes, earn ad rewards, and connect with peer creators at zero cost.",
  keywords: [
    "Studiva",
    "MAKAUT Notes",
    "WBJEE Notes",
    "free study notes",
    "college notes free",
    "engineering study materials",
    "MAKAUT syllabus notes",
    "WBJEE preparation guide",
    "solved university papers",
    "student rewards platform",
    "peer learning network"
  ],
  authors: [{ name: "Studiva Team" }],
  creator: "Studiva",
  publisher: "Studiva",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Studiva | Free Study Notes, MAKAUT & WBJEE Resources",
    description: "Access free study notes, MAKAUT preparation guides, and WBJEE exam resources. Share notes and earn rewards through ad support at zero cost.",
    url: "https://www.studiva.co.in",
    siteName: "Studiva",
    images: [
      {
        url: "/images/studiva-lime.png",
        width: 1200,
        height: 630,
        alt: "Studiva - Free Study Notes & Academic Companion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studiva | Free Study Notes, MAKAUT & WBJEE Resources",
    description: "Get free study notes, MAKAUT preparation materials, and WBJEE resources. Share study files and earn rewards through ad-support.",
    images: ["/images/studiva-lime.png"],
    creator: "@studiva_hq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Studiva",
  "url": "https://www.studiva.co.in",
  "logo": "https://www.studiva.co.in/images/studiva-logo.svg",
  "description": "A platform for students to share and access free study materials, MAKAUT Notes, and WBJEE Notes while earning from ad rewards.",
  "sameAs": [
    "https://www.instagram.com/studiva.co.in"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <div className="noise" aria-hidden="true" />
        <SmoothScroll>
          <Suspense fallback={
            <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', background: 'var(--bg)' }}>
              <Loader size="large" />
              <span style={{ color: 'var(--text-3)', fontSize: '14px', fontWeight: '600', letterSpacing: '4px', opacity: 0.8 }}>STUDIVA</span>
            </div>
          }>
            {children}
          </Suspense>
        </SmoothScroll>
      </body>
    </html>
  );
}
