'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import './ShareRedirect.css';

const REDIRECT_DELAY = 4000;
const FALLBACK_DELAY = 6500;

// ---------------------------------------------------------------------------
// Types shared with page.tsx (server passes these as props)
// ---------------------------------------------------------------------------
export type ServerMeta = {
    title: string;
    pageTitle: string;
    subtitle: string;
    description: string;
    image: string;
    ogType: 'article' | 'profile';
    stats: Record<string, number>;
} | null;

type Props = {
    kind: string;
    id: string;
    serverMeta: ServerMeta;
};

// ---------------------------------------------------------------------------
// ShareRedirectClient
//
// Receives all display data via server-rendered props — no client-side API
// calls, no client-side meta injection. OG tags are handled entirely by
// generateMetadata in page.tsx (server component).
//
// The client component is responsible only for:
//  1. Rendering the preview card UI
//  2. Deep-link redirect countdown + fallback
// ---------------------------------------------------------------------------
export function ShareRedirectClient({ kind, id, serverMeta }: Props) {
    const { deepLink, typeLabel } = useMemo(() => {
        const typeMap: Record<string, string> = {
            content: 'Content',
            user: 'Profile',
            note: 'Note',
            playlist: 'Playlist',
        };

        const tl = typeMap[kind] || kind.charAt(0).toUpperCase() + kind.slice(1);
        const dl = kind && id ? `studiva://${kind}/${id}` : 'studiva://home';

        return { deepLink: dl, typeLabel: tl };
    }, [kind, id]);

    // Start directly in 'preview' (or 'redirecting' for unknown types) — no loading state needed.
    const [phase, setPhase] = useState<'preview' | 'redirecting' | 'fallback'>(
        serverMeta ? 'preview' : 'redirecting'
    );
    const [countdown, setCountdown] = useState(3);

    // --- Redirect timer ---
    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            setPhase('redirecting');
            window.location.href = deepLink;
        }, REDIRECT_DELAY);

        const fallbackTimer = setTimeout(() => {
            setPhase('fallback');
        }, FALLBACK_DELAY);

        return () => {
            clearTimeout(redirectTimer);
            clearTimeout(fallbackTimer);
        };
    }, [deepLink]);

    // --- Countdown ---
    useEffect(() => {
        if (phase === 'fallback') return;
        const interval = setInterval(() => {
            setCountdown((c) => {
                if (c <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return c - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [phase]);

    const handleOpenApp = useCallback(() => {
        window.location.href = deepLink;
    }, [deepLink]);

    const fmt = (n: number) => {
        if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
        if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
        return String(n);
    };

    const isUser = kind === 'user';
    const isContent = kind === 'content';
    const meta = serverMeta;

    return (
        <div className="sr">
            <div className="sr__ambient" aria-hidden="true" />
            <div className="sr__card">
                <div className="sr__header">
                    <img src="/images/studiva-quill-icon.svg" alt="Studiva" className="sr__logo" />
                    <span className="sr__brand">Studiva</span>
                </div>
                <div className="sr__pill">
                    <span className="sr__pill-dot" />
                    {typeLabel}
                </div>
                {meta?.image && (
                    <div className={`sr__media ${isUser ? 'sr__media--avatar' : 'sr__media--preview'}`}>
                        <img
                            src={meta.image}
                            alt={meta.title}
                            className="sr__media-img"
                            onError={(e: any) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                )}
                <h1 className="sr__title">{meta?.title || `Shared ${typeLabel}`}</h1>
                {meta?.subtitle && <p className="sr__subtitle">{meta.subtitle}</p>}
                {meta?.description && <p className="sr__desc">{meta.description}</p>}
                {meta?.stats && (
                    <div className="sr__stats">
                        {isUser ? (
                            <>
                                <div className="sr__stat">
                                    <span className="sr__stat-val">{fmt(meta.stats.followers)}</span>
                                    <span className="sr__stat-label">Followers</span>
                                </div>
                                <div className="sr__stat-sep" />
                                <div className="sr__stat">
                                    <span className="sr__stat-val">{fmt(meta.stats.following)}</span>
                                    <span className="sr__stat-label">Following</span>
                                </div>
                                <div className="sr__stat-sep" />
                                <div className="sr__stat">
                                    <span className="sr__stat-val">{fmt(meta.stats.content)}</span>
                                    <span className="sr__stat-label">Uploads</span>
                                </div>
                            </>
                        ) : isContent ? (
                            <>
                                <div className="sr__stat">
                                    <span className="sr__stat-val">{fmt(meta.stats.views)}</span>
                                    <span className="sr__stat-label">Views</span>
                                </div>
                                <div className="sr__stat-sep" />
                                <div className="sr__stat">
                                    <span className="sr__stat-val">{fmt(meta.stats.sparks)}</span>
                                    <span className="sr__stat-label">Sparks</span>
                                </div>
                                <div className="sr__stat-sep" />
                                <div className="sr__stat">
                                    <span className="sr__stat-val">{fmt(meta.stats.saves)}</span>
                                    <span className="sr__stat-label">Saves</span>
                                </div>
                            </>
                        ) : null}
                    </div>
                )}
                <div className="sr__divider" />
                <div className="sr__redirect-status">
                    {(phase === 'preview' || phase === 'redirecting') && (
                        <div className="sr__status-row">
                            <div className="sr__spinner" />
                            <span className="sr__status-text">
                                Opening in Studiva{countdown > 0 ? ` in ${countdown}s` : '…'}
                            </span>
                        </div>
                    )}
                    {phase === 'fallback' && (
                        <span className="sr__status-text sr__status-text--muted">
                            Redirect didn't work? Use the buttons below.
                        </span>
                    )}
                </div>
                <button id="open-app-btn" className="sr__btn-primary" onClick={handleOpenApp}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Open in Studiva
                </button>
                <a href="/" className="sr__btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Get the App
                </a>
                <div className="sr__stores">
                    <a href="https://play.google.com/store/apps/details?id=com.studiva.app" className="sr__store-link" target="_blank" rel="noopener noreferrer">Google Play →</a>
                    <span className="sr__store-dot">·</span>
                    <a href="https://apps.apple.com/app/studiva" className="sr__store-link" target="_blank" rel="noopener noreferrer">App Store →</a>
                </div>
                <div className="sr__footer">Powered by <strong>CRINE</strong></div>
            </div>
        </div>
    );
}
