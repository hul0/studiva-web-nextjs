import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";
import Loader from "@/components/common/Loader";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.studiva.co.in"),
  title: {
    default: "Studiva | Your Academic Companion",
    template: "%s | Studiva",
  },
  description: "Studiva is a marketplace for students to buy and sell notes, earn through rewarded ads, and connect with other creators. Join the future of student-led economy.",
  keywords: ["study notes", "academic marketplace", "student earnings", "buy notes", "sell notes", "education", "student community"],
  authors: [{ name: "Studiva Team" }],
  creator: "Studiva",
  publisher: "Studiva",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Studiva | Your Academic Companion",
    description: "Your academic companion. Buy and sell notes, earn through rewarded ads, and join the future of student-led economy.",
    url: "https://www.studiva.co.in",
    siteName: "Studiva",
    images: [
      {
        url: "/images/studiva-lime.png",
        width: 1200,
        height: 630,
        alt: "Studiva - Your Academic Companion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studiva | Your Academic Companion",
    description: "Your academic companion. Buy and sell notes, earn through rewarded ads, and join the future of student-led economy.",
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
  "description": "A marketplace for students to share and earn from study materials",
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
