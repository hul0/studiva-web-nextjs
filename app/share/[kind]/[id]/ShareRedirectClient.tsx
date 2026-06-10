'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import {
    FaGooglePlay,
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
    FaCheckCircle,
} from 'react-icons/fa';
import './ShareRedirect.css';

type ShareRedirectClientProps = {
    kind: string;
    id: string;
    initialData: any;
};

export function ShareRedirectClient({ kind, id, initialData }: ShareRedirectClientProps) {
    const [device, setDevice] = useState<'ios' | 'android' | 'desktop'>('desktop');
    const [hasAttemptedOpen, setHasAttemptedOpen] = useState(false);
    const [avatarError, setAvatarError] = useState(false);
    const [creatorAvatarError, setCreatorAvatarError] = useState(false);
    const [showAppPrompt, setShowAppPrompt] = useState(false);

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

        // Stagger the app prompt entrance
        const timer = setTimeout(() => setShowAppPrompt(true), 600);
        return () => clearTimeout(timer);
    }, []);

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
        setHasAttemptedOpen(true);

        // After attempting deep link, show install prompt if app didn't open
        setTimeout(() => {
            setHasAttemptedOpen(true);
        }, 2000);
    }, [deepLink]);

    const handleGetApp = useCallback(() => {
        if (device === 'ios') {
            // Placeholder for future App Store link
            window.open('https://play.google.com/store/apps/details?id=com.studiva.app', '_blank');
        } else {
            window.open('https://play.google.com/store/apps/details?id=com.studiva.app', '_blank');
        }
    }, [device]);

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
                {/* ── Content Preview Card ── */}
                <div className="sr__card">
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

                    {isUser ? (
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
                    ) : (
                        <div className="sr__media sr__media--preview">
                            {meta?.image ? (
                                <img
                                    src={meta.image}
                                    alt={meta.title}
                                    className="sr__media-img"
                                    onError={(e: any) => { e.target.style.display = 'none'; }}
                                />
                            ) : (
                                <div className="sr__content-fallback">
                                    {getContentFallbackIcon(initialData?.content_type || kind)}
                                </div>
                            )}
                        </div>
                    )}

                    <h1 className="sr__title">{meta?.title || (kind ? `Shared ${typeLabel}` : 'Studiva')}</h1>
                    {meta?.subtitle && <p className="sr__subtitle">{meta.subtitle}</p>}
                    {meta?.description && <p className="sr__desc">{meta.description}</p>}

                    {meta?.creator && (
                        <div className="sr__creator-card">
                            {meta.creator.avatar && !creatorAvatarError ? (
                                <img
                                    src={meta.creator.avatar}
                                    alt={meta.creator.name}
                                    className="sr__creator-avatar"
                                    onError={() => setCreatorAvatarError(true)}
                                />
                            ) : (
                                <div className="sr__creator-avatar-fallback">
                                    <FaUserCircle />
                                </div>
                            )}
                            <div className="sr__creator-info">
                                <span className="sr__creator-label">Shared by</span>
                                <span className="sr__creator-name">{meta.creator.name}</span>
                                <span className="sr__creator-username">@{meta.creator.username}</span>
                            </div>
                        </div>
                    )}

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

                    {meta?.dateText && (
                        <div className="sr__date-text">
                            {meta.dateText}
                        </div>
                    )}
                </div>

                {/* ── App Install Prompt ── */}
                <div className={`sr__app-prompt ${showAppPrompt ? 'sr__app-prompt--visible' : ''}`}>
                    {/* Open in App Button */}
                    <button id="open-app-btn" className="sr__btn-open-app" onClick={handleOpenApp}>
                        <div className="sr__btn-open-app-icon">
                            <FaExternalLinkAlt />
                        </div>
                        <div className="sr__btn-open-app-text">
                            <span className="sr__btn-open-app-title">Open in Studiva</span>
                            <span className="sr__btn-open-app-sub">View this {typeLabel.toLowerCase()} in the app</span>
                        </div>
                        <svg className="sr__btn-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>

                    {/* Divider with text */}
                    <div className="sr__or-divider">
                        <span>Don&apos;t have the app?</span>
                    </div>

                    {/* Get the App CTA */}
                    <button id="get-app-btn" className="sr__btn-get-app" onClick={handleGetApp}>
                        <div className="sr__btn-get-app-icon">
                            {device === 'ios' ? <FaApple /> : <FaAndroid />}
                        </div>
                        <div className="sr__btn-get-app-text">
                            <span className="sr__btn-get-app-title">
                                Get Studiva
                            </span>
                            <span className="sr__btn-get-app-sub">
                                {device === 'ios' ? 'Download on the App Store' : 'Download on Google Play'}
                            </span>
                        </div>
                        <svg className="sr__btn-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>

                    {/* Feature highlights */}
                    <div className="sr__features">
                        <div className="sr__feature">
                            <FaCheckCircle className="sr__feature-icon" />
                            <span>Interactive quizzes &amp; flashcards</span>
                        </div>
                        <div className="sr__feature">
                            <FaCheckCircle className="sr__feature-icon" />
                            <span>AI-powered study assistant</span>
                        </div>
                        <div className="sr__feature">
                            <FaCheckCircle className="sr__feature-icon" />
                            <span>Learn with friends &amp; creators</span>
                        </div>
                    </div>

                    {/* Web Coming Soon */}
                    <div className="sr__web-notice">
                        <div className="sr__web-notice-icon">
                            <FaGlobe />
                        </div>
                        <div className="sr__web-notice-text">
                            <span className="sr__web-notice-title">Studiva for Web</span>
                            <span className="sr__web-notice-sub">Coming soon. We&apos;re crafting the web experience.</span>
                        </div>
                    </div>

                    {/* Social Row */}
                    <div className="sr__social-row">
                        <a href="https://play.google.com/store/apps/details?id=com.studiva.app" className="sr__social-link" target="_blank" rel="noopener noreferrer">
                            <FaGooglePlay />
                            <span>Play Store</span>
                        </a>
                        <div className="sr__social-dot" />
                        <a href="https://instagram.com/studiva.co.in" className="sr__social-link" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                            <span>Instagram</span>
                        </a>
                    </div>
                </div>

                {/* ── Footer ── */}
                <div className={`sr__footer ${showAppPrompt ? 'sr__footer--visible' : ''}`}>
                    Powered by
                    <a href="https://www.crine.in" target="_blank" rel="noopener noreferrer" className="sr__crine-link">
                        <img src="https://www.crine.in/crine-logo.svg" alt="CRINE Logo" className="sr__crine-logo" />
                        <strong>CRINE</strong>
                    </a>
                </div>
            </div>
        </div>
    );
}
