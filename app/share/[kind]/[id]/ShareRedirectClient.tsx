'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import {
    FaInstagram,
    FaExternalLinkAlt,
    FaUserCircle,
    FaRegQuestionCircle,
    FaClone,
    FaBookOpen,
    FaListUl,
    FaRegFileAlt,
    FaGlobe,
    FaApple,
    FaAndroid,
    FaGooglePlay,
} from 'react-icons/fa';
import './ShareRedirect.css';
import { FaX, FaXTwitter } from 'react-icons/fa6';

type ShareRedirectClientProps = {
    kind: string;
    id: string;
    initialData: any;
};

export function ShareRedirectClient({ kind, id, initialData }: ShareRedirectClientProps) {
    const [device, setDevice] = useState<'ios' | 'android' | 'desktop'>('desktop');
    const [avatarError, setAvatarError] = useState(false);
    const [creatorAvatarError, setCreatorAvatarError] = useState(false);

    const getContentFallbackIcon = (type: string) => {
        const t = type?.toLowerCase() || '';
        if (t.includes('quiz')) return <FaRegQuestionCircle />;
        if (t.includes('flashcard')) return <FaClone />;
        if (t.includes('lesson') || t.includes('course')) return <FaBookOpen />;
        if (t.includes('playlist')) return <FaListUl />;
        return <FaRegFileAlt />;
    };

    const { deepLink, typeLabel } = useMemo(() => {
        let dl = 'studiva://home';
        let tl = 'App';

        if (kind && id) {
            const contentTypeName = initialData?.content_type || kind;
            const typeMap: Record<string, string> = {
                content: 'Content',
                user: 'Profile',
                note: 'Note',
                playlist: 'Playlist',
                playlists: 'Playlist',
                quiz: 'Quiz',
                quizzes: 'Quiz',
                flashcard: 'Flashcard',
                flashcards: 'Flashcard',
                lesson: 'Lesson',
                lessons: 'Lesson',
                course: 'Course',
                courses: 'Course',
            };

            const contentTypeToPlural: Record<string, string> = {
                quiz: 'quizzes',
                quizzes: 'quizzes',
                flashcard: 'flashcards',
                flashcards: 'flashcards',
                lesson: 'lessons',
                lessons: 'lessons',
                course: 'courses',
                courses: 'courses',
                playlist: 'playlists',
                playlists: 'playlists',
                note: 'content',
                content: 'content',
            };

            tl = typeMap[contentTypeName] || contentTypeName.charAt(0).toUpperCase() + contentTypeName.slice(1);

            if (kind === 'user') {
                dl = `studiva://user/${id}`;
            } else {
                const pluralKind = contentTypeToPlural[contentTypeName] || kind;
                dl = `studiva://${pluralKind}/${id}`;
            }

            console.log('[ShareRedirectClient] Resolving deepLink/typeLabel:', {
                kind,
                id,
                contentTypeName,
                resolvedTypeLabel: tl,
                resolvedDeepLink: dl
            });
        }

        return { deepLink: dl, typeLabel: tl };
    }, [kind, id, initialData]);

    useEffect(() => {
        console.log('[ShareRedirectClient] Mounted with parameters:', { kind, id });
        console.log('[ShareRedirectClient] Initial API Data received:', initialData);
    }, [kind, id, initialData]);

    useEffect(() => {
        const ua = navigator.userAgent.toLowerCase();
        let detected: 'ios' | 'android' | 'desktop' = 'desktop';
        if (/iphone|ipad|ipod/.test(ua)) {
            detected = 'ios';
        } else if (/android/.test(ua)) {
            detected = 'android';
        }
        console.log('[ShareRedirectClient] User Agent / Device detection result:', {
            userAgent: navigator.userAgent,
            detectedDevice: detected
        });
        setDevice(detected);
    }, []);

    // Auto-redirect mobile devices to the deep link immediately
    useEffect(() => {
        if (device !== 'desktop' && deepLink) {
            console.log('[ShareRedirectClient] Auto-redirecting to deep link:', deepLink);
            window.location.href = deepLink;
        }
    }, [device, deepLink]);

    const meta = useMemo(() => {
        if (!initialData) return null;

        let title, description, image, subtitle, creator, dateText;

        if (kind === 'user') {
            title = initialData.full_name || initialData.username || 'User';
            description = initialData.bio || `Check out ${title}'s profile and study materials on Studiva.`;
            image = initialData.avatar_url || '';
            subtitle = `@${initialData.username}`;
            dateText = initialData.created_at ? `Joined Studiva on ${new Date(initialData.created_at * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}` : '';
        } else {
            title = initialData.title || `Shared ${typeLabel}`;
            description = initialData.description || `Learn Interactively with Studiva`;
            image = initialData.preview_link || '';
            subtitle = `by ${initialData.creator_name || initialData.creator_username || 'Studiva Creator'}`;
            dateText = initialData.created_at ? `Created on ${new Date(initialData.created_at * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}` : '';
            creator = {
                name: initialData.creator_name || 'Studiva Creator',
                username: initialData.creator_username || 'creator',
                avatar: initialData.creator_avatar || '',
            };
        }

        return {
            title,
            subtitle,
            description,
            image,
            creator,
            dateText,
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
    }, [kind, initialData, typeLabel]);

    const handleOpenApp = useCallback(() => {
        console.log('[ShareRedirectClient] Opening deep link:', deepLink);
        window.location.href = deepLink;
    }, [deepLink]);

    const fmt = (n: number) => {
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
        if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
        return String(n);
    };

    const isUser = kind === 'user';
    const isContent = ['content', 'note', 'playlist', 'playlists', 'quiz', 'quizzes', 'flashcard', 'flashcards', 'lesson', 'lessons', 'course', 'courses'].includes(kind);

    return (
        <div className="sr">
            {/* Ambient glow orbs */}
            <div className="sr__ambient" aria-hidden="true" />
            <div className="sr__ambient-secondary" aria-hidden="true" />

            <div className="sr__container">
                <div className="sr__card">
                    {/* ── Header Row ── */}
                    <div className="sr__header-row">
                        <div className="sr__header">
                            <img src="/images/studiva-butterfly.webp" alt="Studiva Logo" className="sr__logo" />
                            <span className="sr__brand">Studiva</span>
                        </div>
                        <div className="sr__pill">
                            <span className="sr__pill-dot" />
                            {typeLabel}
                        </div>
                    </div>

                    {/* ── Content Preview Section ── */}
                    {isUser ? (
                        <div className="sr__profile-preview">
                            <div className="sr__media sr__media--avatar">
                                {meta?.image && !avatarError ? (
                                    <img
                                        src={meta.image}
                                        alt={meta.title}
                                        className="sr__media-img"
                                        onError={() => setAvatarError(true)}
                                    />
                                ) : (
                                    <div className="sr__avatar-fallback">
                                        <FaUserCircle />
                                    </div>
                                )}
                            </div>
                            <div className="sr__profile-info">
                                <h1 className="sr__title">{meta?.title || 'User'}</h1>
                                {meta?.subtitle && <p className="sr__subtitle">{meta.subtitle}</p>}
                                {meta?.description && <p className="sr__desc">{meta.description}</p>}
                            </div>
                        </div>
                    ) : (
                        <div className="sr__content-preview">
                            {meta?.image ? (
                                <div className="sr__thumbnail">
                                    <img
                                        src={meta.image}
                                        alt={meta.title}
                                        className="sr__thumbnail-img"
                                        onError={(e: any) => { e.target.style.display = 'none'; }}
                                    />
                                </div>
                            ) : (
                                <div className="sr__thumbnail sr__thumbnail--fallback">
                                    {getContentFallbackIcon(initialData?.content_type || kind)}
                                </div>
                            )}
                            <div className="sr__content-info">
                                <h1 className="sr__title">{meta?.title || `Shared ${typeLabel}`}</h1>
                                {meta?.subtitle && <p className="sr__subtitle">{meta.subtitle}</p>}
                                {meta?.description && <p className="sr__desc">{meta.description}</p>}
                            </div>
                        </div>
                    )}

                    {/* ── Stats ── */}
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
                                        <span className="sr__stat-label">Likes</span>
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

                    {/* ── Separator Line ── */}
                    <div className="sr__divider" />

                    {/* ── Actions Section ── */}
                    <div className="sr__actions">
                        {/* 1. Open in App (Primary CTA) */}
                        <button id="open-app-btn" className="sr__btn-primary" onClick={handleOpenApp}>
                            <FaExternalLinkAlt className="sr__btn-icon" />
                            <span>Open in App</span>
                        </button>

                        {/* 2. View on Web (Secondary CTA) - only for content */}
                        {isContent && (
                            <a
                                id="view-web-btn"
                                href={`https://app.studiva.co.in/content/${id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sr__btn-secondary"
                            >
                                <FaGlobe className="sr__btn-icon" />
                                <span>View on Web</span>
                            </a>
                        )}

                        {/* 3. Promoted Google Play Button */}
                        <a
                            href="https://play.google.com/store/apps/details?id=com.studiva.app&utm_source=studiva.co.in&utm_medium=referral&utm_campaign=studiva-share-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sr__btn-googleplay"
                        >
                            <FaGooglePlay className="sr__btn-icon-large" />
                            <div className="sr__btn-googleplay-text">
                                <span className="sr__googleplay-sub">GET IT ON</span>
                                <span className="sr__googleplay-main">Google Play</span>
                            </div>
                        </a>

                        {/* 4. Secondary Sub-Actions */}
                        <div className="sr__secondary-actions">
                            <a
                                href="https://x.com/studiva_hq"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sr__action-link"
                            >
                                <FaXTwitter />
                                <span>Twitter</span>
                            </a>
                            <span className="sr__action-separator">•</span>
                            <a
                                href="https://instagram.com/studiva.co.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sr__action-link"
                            >
                                <FaInstagram />
                                <span>Instagram</span>
                            </a>
                        </div>
                    </div>

                    {/* ── Footer ── */}
                    <div className="sr__card-footer">
                        Powered by
                        <a href="https://www.crine.in" target="_blank" rel="noopener noreferrer" className="sr__crine-link">
                            <img src="https://www.crine.in/crine-logo.svg" alt="CRINE Logo" className="sr__crine-logo" />
                            <strong>CRINE</strong>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
