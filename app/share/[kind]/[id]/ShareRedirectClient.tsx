'use client';

import { useMemo, useState, useEffect } from 'react';
import { FaGooglePlay, FaInstagram, FaExternalLinkAlt } from 'react-icons/fa';
import './ShareRedirect.css';

type ShareRedirectClientProps = {
    kind: string;
    id: string;
    initialData: any;
};

export function ShareRedirectClient({ kind, id, initialData }: ShareRedirectClientProps) {
    const [device, setDevice] = useState<'ios' | 'android' | 'desktop'>('desktop');
    const [countdown, setCountdown] = useState(3);
    const [isPaused, setIsPaused] = useState(false);
    const [hasRedirected, setHasRedirected] = useState(false);

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

            tl = typeMap[contentTypeName] || contentTypeName.charAt(0).toUpperCase() + contentTypeName.slice(1);
            dl = `studiva://${kind}/${id}`;
        }

        return { deepLink: dl, typeLabel: tl };
    }, [kind, id, initialData]);

    useEffect(() => {
        const ua = navigator.userAgent.toLowerCase();
        let detected: 'ios' | 'android' | 'desktop' = 'desktop';
        if (/iphone|ipad|ipod/.test(ua)) {
            detected = 'ios';
        } else if (/android/.test(ua)) {
            detected = 'android';
        }
        setDevice(detected);
    }, []);

    useEffect(() => {
        if (device === 'desktop' || isPaused || hasRedirected) return;

        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    window.location.href = deepLink;
                    setHasRedirected(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [device, deepLink, isPaused, hasRedirected]);

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
            description = initialData.description || `Study material by ${initialData.creator_name || initialData.creator_username || 'a creator'}`;
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

    const handleOpenApp = () => {
        window.location.href = deepLink;
    };

    const fmt = (n: number) => {
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
        if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
        return String(n);
    };

    const isUser = kind === 'user';
    const isContent = ['content', 'note', 'playlist', 'playlists', 'quiz', 'quizzes', 'flashcard', 'flashcards', 'lesson', 'lessons', 'course', 'courses'].includes(kind);

    return (
        <div className="sr">
            <div className="sr__ambient" aria-hidden="true" />
            <div className="sr__card">
                
                <div className="sr__header-row">
                    <div className="sr__header">
                        <img src="/images/studiva-quill-icon.svg" alt="Studiva" className="sr__logo" />
                        <span className="sr__brand">Studiva</span>
                    </div>
                    <div className="sr__pill">
                        <span className="sr__pill-dot" />
                        {typeLabel}
                    </div>
                </div>

                {meta?.image && (
                    <div className={`sr__media ${isUser ? 'sr__media--avatar' : 'sr__media--preview'}`}>
                        <img src={meta.image} alt={meta.title} className="sr__media-img" onError={(e: any) => { e.target.style.display = 'none'; }} />
                    </div>
                )}
                
                <h1 className="sr__title">{meta?.title || (kind ? `Shared ${typeLabel}` : 'Studiva')}</h1>
                {meta?.subtitle && <p className="sr__subtitle">{meta.subtitle}</p>}
                {meta?.description && <p className="sr__desc">{meta.description}</p>}

                {meta?.creator && (
                    <div className="sr__creator-card">
                        <img 
                            src={meta.creator.avatar || "/images/default-avatar.png"} 
                            alt={meta.creator.name} 
                            className="sr__creator-avatar" 
                            onError={(e: any) => { e.target.src = "/images/default-avatar.png"; }}
                        />
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

                {device !== 'desktop' && (
                    <>
                        <div className="sr__divider" />
                        <div className="sr__intelligent-redirect">
                            <div className="sr__progress-track">
                                <div 
                                    className="sr__progress-bar" 
                                    style={{ 
                                        width: `${hasRedirected ? 100 : ((3 - countdown) / 3) * 100}%`,
                                        transition: countdown === 3 ? 'none' : 'width 1s linear'
                                    }} 
                                />
                            </div>
                            <div className="sr__redirect-info">
                                <div className="sr__status-row">
                                    {!hasRedirected && !isPaused && <div className="sr__spinner" />}
                                    <span className="sr__status-text">
                                        {hasRedirected 
                                            ? 'Opening Studiva App...' 
                                            : isPaused 
                                                ? 'Redirection paused' 
                                                : `Opening app in ${countdown}s...`}
                                    </span>
                                </div>
                                <button 
                                    className="sr__action-btn" 
                                    onClick={() => setIsPaused(!isPaused)}
                                >
                                    {isPaused ? 'Resume' : 'Pause'}
                                </button>
                            </div>
                        </div>
                    </>
                )}

                <div className="sr__divider" />
                
                <button id="open-app-btn" className="sr__btn-primary" onClick={handleOpenApp}>
                    <FaExternalLinkAlt style={{ marginRight: '8px' }} />
                    Open in Studiva App
                </button>

                <div className="sr__divider" style={{ margin: '16px 0 12px 0' }} />

                <div className="sr__stores-row">
                    <a href="https://play.google.com/store/apps/details?id=com.studiva.app" className="sr__btn-store" target="_blank" rel="noopener noreferrer">
                        <FaGooglePlay style={{ marginRight: '6px' }} />
                        Play Store
                    </a>
                    <a href="https://instagram.com/studiva.co.in" className="sr__btn-store" target="_blank" rel="noopener noreferrer">
                        <FaInstagram style={{ marginRight: '6px' }} />
                        Instagram
                    </a>
                </div>

                <div className="sr__footer">
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
