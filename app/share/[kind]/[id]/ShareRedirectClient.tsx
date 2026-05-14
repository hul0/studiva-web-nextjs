'use client';

import { useMemo } from 'react';
import './ShareRedirect.css';

type ShareRedirectClientProps = {
    kind: string;
    id: string;
    initialData: any;
};

export function ShareRedirectClient({ kind, id, initialData }: ShareRedirectClientProps) {
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

    const meta = useMemo(() => {
        if (!initialData) return null;

        let title, description, image, subtitle;

        if (kind === 'content') {
            title = initialData.title || 'Shared Content';
            description = initialData.description || `Study material by ${initialData.creator_name || initialData.creator_username || 'a creator'}`;
            image = initialData.preview_link || '';
            subtitle = `by ${initialData.creator_name || initialData.creator_username || 'Studiva Creator'}`;
        } else {
            title = initialData.full_name || initialData.username || 'User';
            description = initialData.bio || `Check out ${title}'s profile and study materials on Studiva.`;
            image = initialData.avatar_url || '';
            subtitle = `@${initialData.username}`;
        }

        return {
            title,
            subtitle,
            description,
            image,
            stats: kind === 'user'
                ? {
                    followers: initialData.follower_count ?? 0,
                    following: initialData.following_count ?? 0,
                    content: initialData.content_count ?? 0,
                }
                : {
                    views: initialData.views ?? 0,
                    sparks: initialData.sparks_received ?? 0,
                    saves: initialData.saves ?? 0,
                },
        };
    }, [kind, initialData]);

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
                <div className="sr__redirect-status" style={{ marginBottom: '16px' }}>
                    <span className="sr__status-text sr__status-text--muted">
                        Preview this content below. Install the app if you haven't already.
                    </span>
                </div>
                <button id="open-app-btn" className="sr__btn-primary" onClick={handleOpenApp}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Open in Studiva App
                </button>
                <a href="https://play.google.com/store/apps/details?id=com.studiva.app" className="sr__btn-secondary" target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download from Play Store
                </a>
                <div className="sr__stores" style={{ marginTop: '12px' }}>
                    <a href="https://apps.apple.com/app/studiva" className="sr__store-link" target="_blank" rel="noopener noreferrer">Available on App Store →</a>
                </div>
                <div className="sr__footer">Powered by <strong>CRINE</strong></div>
            </div>
        </div>
    );
}
