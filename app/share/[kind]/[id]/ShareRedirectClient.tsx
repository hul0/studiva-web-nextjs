'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import './ShareRedirect.css';

const REDIRECT_DELAY = 4000;
const FALLBACK_DELAY = 6500;

export function ShareRedirectClient() {
    const params = useParams();
    
    if (!params) {
        return <div className="sr"><div className="sr__spinner" /></div>;
    }

    const kind = params.kind as string;
    const id = params.id as string;

    const { deepLink, typeLabel } = useMemo(() => {
        let dl = 'studiva://home';
        let tl = 'App';

        if (kind && id) {
            const typeMap: Record<string, string> = {
                content: 'Content',
                user: 'Profile',
                note: 'Note',
                playlist: 'Playlist',
            };

            tl = typeMap[kind] || kind.charAt(0).toUpperCase() + kind.slice(1);
            dl = `studiva://${kind}/${id}`;
        }

        return { deepLink: dl, typeLabel: tl };
    }, [kind, id]);

    const needsFetch = kind === 'content' || kind === 'user';
    const [phase, setPhase] = useState(needsFetch ? 'loading' : 'redirecting');
    const [meta, setMeta] = useState<any>(null);
    const [countdown, setCountdown] = useState(3);

    const injectMeta = useCallback((name: string | null, property: string | null, content: string) => {
        if (!content) return;
        const selector = name
            ? `meta[name="${name}"]`
            : `meta[property="${property}"]`;
        let el = document.querySelector(selector);
        if (!el) {
            el = document.createElement('meta');
            if (name) el.setAttribute('name', name);
            if (property) el.setAttribute('property', property);
            document.head.appendChild(el);
        }
        el.setAttribute('content', content);
    }, []);

    useEffect(() => {
        if (!needsFetch) return;

        let cancelled = false;
        const fetchMeta = async () => {
            try {
                const res = await fetch(`https://api.studiva.co.in/public/${kind}/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_INTERNAL_API_SECRET || ''}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!res.ok || cancelled) {
                    setPhase('redirecting');
                    return;
                }
                const json = await res.json();
                const data = json?.data;
                if (!data || cancelled) {
                    setPhase('redirecting');
                    return;
                }

                let title, description, image, subtitle;

                if (kind === 'content') {
                    title = data.title || 'Shared Content';
                    description = data.description || `Study material by ${data.creator_name || data.creator_username || 'a creator'}`;
                    image = data.preview_link || '';
                    subtitle = `by ${data.creator_name || data.creator_username || 'Studiva Creator'}`;
                } else {
                    title = data.full_name || data.username || 'User';
                    description = data.bio || `Check out ${title}'s profile and study materials on Studiva.`;
                    image = data.avatar_url || '';
                    subtitle = `@${data.username}`;
                }

                const pageTitle = kind === 'content'
                    ? `${title} | Studiva`
                    : `${title} (@${data.username}) · Studiva`;
                document.title = pageTitle;
                injectMeta('description', null, description);
                injectMeta(null, 'og:title', pageTitle);
                injectMeta(null, 'og:description', description);
                injectMeta(null, 'og:type', kind === 'user' ? 'profile' : 'article');
                injectMeta(null, 'og:url', window.location.href);
                if (image) injectMeta(null, 'og:image', image);
                injectMeta('twitter:card', null, image ? 'summary_large_image' : 'summary');
                injectMeta(null, 'twitter:title', pageTitle);
                injectMeta(null, 'twitter:description', description);
                if (image) injectMeta(null, 'twitter:image', image);

                if (!cancelled) {
                    setMeta({
                        title,
                        subtitle,
                        description,
                        image,
                        stats: kind === 'user'
                            ? {
                                followers: data.follower_count ?? 0,
                                following: data.following_count ?? 0,
                                content: data.content_count ?? 0,
                            }
                            : {
                                views: data.views ?? 0,
                                sparks: data.sparks_received ?? 0,
                                saves: data.saves ?? 0,
                            },
                    });
                    setPhase('preview');
                }
            } catch (err) {
                console.error('SEO fetch failed:', err);
                if (!cancelled) setPhase('redirecting');
            }
        };

        fetchMeta();
        return () => { cancelled = true; };
    }, [kind, id, needsFetch, injectMeta]);

    useEffect(() => {
        if (phase === 'loading') return;

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
    }, [phase, deepLink]);

    useEffect(() => {
        if (phase !== 'preview' && phase !== 'redirecting') return;
        const interval = setInterval(() => {
            setCountdown(c => {
                if (c <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return c - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [phase]);

    const handleOpenApp = () => {
        window.location.href = deepLink;
    };

    const fmt = (n: number) => {
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
        if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
        return String(n);
    };

    const isUser = kind === 'user';
    const isContent = kind === 'content';

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
                        <img src={meta.image} alt={meta.title} className="sr__media-img" onError={(e: any) => { e.target.style.display = 'none'; }} />
                    </div>
                )}
                <h1 className="sr__title">{meta?.title || (kind ? `Shared ${typeLabel}` : 'Studiva')}</h1>
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
                    {phase === 'loading' && (
                        <div className="sr__status-row">
                            <div className="sr__spinner" />
                            <span className="sr__status-text">Loading content…</span>
                        </div>
                    )}
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
