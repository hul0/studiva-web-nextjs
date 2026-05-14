import { Metadata } from 'next';
import { ShareRedirectClient } from './ShareRedirectClient';

type Props = {
  params: Promise<{ kind: string; id: string }>;
};

const CANONICAL_BASE = 'https://studiva.co.in';

// ---------------------------------------------------------------------------
// Server-side API fetch — runs once at request time, feeds both
// generateMetadata (OG tags) and the page component (preview UI props).
// ---------------------------------------------------------------------------
async function fetchShareData(kind: string, id: string) {
  const workerUrl = process.env.WORKER_URL || 'https://api.studiva.co.in';
  const internalSecret =
    process.env.INTERNAL_API_SECRET || process.env.NEXT_PUBLIC_INTERNAL_API_SECRET;

  if (!internalSecret) return null;

  try {
    const res = await fetch(`${workerUrl}/public/${kind}/${id}`, {
      headers: {
        Authorization: `Bearer ${internalSecret}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Shared helper — derives display fields from the raw API response.
// Used by both generateMetadata and the page component so they stay in sync.
// ---------------------------------------------------------------------------
function deriveDisplayMeta(kind: string, data: Record<string, any>) {
  if (kind === 'content') {
    const title = data.title || 'Shared Content';
    const creatorName =
      data.creator_name || data.creator_username || 'a creator';
    return {
      title,
      pageTitle: `${title} | Studiva`,
      subtitle: `by ${data.creator_name || data.creator_username || 'Studiva Creator'}`,
      description:
        data.description || `Study material by ${creatorName}`,
      image: data.preview_link || '',
      ogType: 'article' as const,
      stats: {
        views: data.views ?? 0,
        sparks: data.sparks_received ?? 0,
        saves: data.saves ?? 0,
      } as Record<string, number>,
    };
  }

  // kind === 'user'
  const title = data.full_name || data.username || 'User';
  return {
    title,
    pageTitle: `${title} (@${data.username}) · Studiva`,
    subtitle: `@${data.username}`,
    description:
      data.bio ||
      `Check out ${title}'s profile and study materials on Studiva.`,
    image: data.avatar_url || '',
    ogType: 'profile' as const,
    stats: {
      followers: data.follower_count ?? 0,
      following: data.following_count ?? 0,
      content: data.content_count ?? 0,
    } as Record<string, number>,
  };
}

// ---------------------------------------------------------------------------
// generateMetadata — instant, server-rendered OG/Twitter tags.
// Next.js de-duplicates the fetch automatically (same URL + same options).
// ---------------------------------------------------------------------------
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kind, id } = await params;

  if (kind !== 'content' && kind !== 'user') {
    return {
      title: 'Shared Content | Studiva',
      description: 'Open this link in the Studiva app.',
    };
  }

  const data = await fetchShareData(kind, id);
  if (!data) {
    return {
      title: 'Shared Content | Studiva',
      description: 'Open this link in the Studiva app.',
    };
  }

  const m = deriveDisplayMeta(kind, data);

  return {
    title: m.pageTitle,
    description: m.description,
    alternates: {
      canonical: `${CANONICAL_BASE}/share/${kind}/${id}`,
    },
    openGraph: {
      title: m.pageTitle,
      description: m.description,
      url: `${CANONICAL_BASE}/share/${kind}/${id}`,
      siteName: 'Studiva',
      type: m.ogType,
      images: m.image ? [{ url: m.image }] : [],
    },
    twitter: {
      card: m.image ? 'summary_large_image' : 'summary',
      title: m.pageTitle,
      description: m.description,
      images: m.image ? [m.image] : [],
    },
  };
}

// ---------------------------------------------------------------------------
// Page — fetches data once server-side (de-duped with generateMetadata)
// and passes everything the client component needs as props. Zero client
// fetches means the preview UI renders on first paint.
// ---------------------------------------------------------------------------
export default async function Page({ params }: Props) {
  const { kind, id } = await params;

  const needsFetch = kind === 'content' || kind === 'user';
  let meta = null;

  if (needsFetch) {
    const data = await fetchShareData(kind, id);
    if (data) {
      meta = deriveDisplayMeta(kind, data);
    }
  }

  return <ShareRedirectClient kind={kind} id={id} serverMeta={meta} />;
}
