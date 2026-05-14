import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";
import Loader from "@/components/common/Loader";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Studiva",
  description: "Your academic companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
