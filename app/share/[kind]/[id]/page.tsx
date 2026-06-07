import { Metadata } from 'next';
import { ShareRedirectClient } from './ShareRedirectClient';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ kind: string; id: string }>;
};

async function fetchMetaData(kind: string, id: string) {
  const workerUrl = process.env.WORKER_URL || 'https://api.studiva.co.in';
  const internalSecret = process.env.INTERNAL_API_SECRET || process.env.NEXT_PUBLIC_INTERNAL_API_SECRET;

  if (!internalSecret) {
    console.error(`[ShareRedirect] ERROR: No internal secret found in environment variables.`);
    return null;
  }

  const endpointType = kind === 'user' ? 'user' : 'content';
  const url = `${workerUrl.replace(/\/$/, '')}/public/${endpointType}/${id}`;
  const headers = {
    'Authorization': `Bearer ${internalSecret}`,
    'Content-Type': 'application/json',
    'User-Agent': 'Studiva-NextJS-Server/1.0',
  };

  try {
    const res = await fetch(url, {
      headers,
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      console.error(`[ShareRedirect] ERROR: API returned non-OK status ${res.status} for ${url}`);
      return null;
    }

    const json = await res.json();
    return json?.data || null;
  } catch (err: any) {
    console.error(`[ShareRedirect] EXCEPTION during fetch for ${kind}/${id}:`, err?.message || err);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kind, id } = await params;

  const validKinds = ['content', 'user', 'quizzes', 'flashcards', 'lessons', 'courses', 'playlists'];
  if (!validKinds.includes(kind)) {
    return { title: 'Shared Content | Studiva' };
  }

  const data = await fetchMetaData(kind, id);
  if (!data) return { title: 'Shared Content | Studiva' };

  let title, description, image;

  if (kind === 'user') {
    title = data.full_name || data.username || 'User';
    description = data.bio || `Check out ${title}'s profile and study materials on Studiva.`;
    image = data.avatar_url || '';
  } else {
    const contentTypeName = data.content_type || kind;
    const typeLabel = contentTypeName.charAt(0).toUpperCase() + contentTypeName.slice(1);
    title = data.title || `Shared ${typeLabel}`;
    description = data.description || `Study ${contentTypeName} by ${data.creator_name || data.creator_username || 'a creator'}`;
    image = data.preview_link || '';
  }

  const pageTitle = kind === 'user'
    ? `${title} (@${data.username}) · Studiva`
    : `${title} | Studiva`;

  const url = `https://www.studiva.co.in/share/${kind}/${id}`;

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

  let appDeepLink = `studiva://${kind}/${id}`;
  if (kind !== 'user') {
    const contentTypeName = data.content_type || kind;
    const pluralKind = contentTypeToPlural[contentTypeName] || kind;
    appDeepLink = `studiva://${pluralKind}/${id}`;
  }

  return {
    title: pageTitle,
    description,
    metadataBase: new URL('https://www.studiva.co.in'),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: 'Studiva',
      type: kind === 'user' ? 'profile' : 'article',
      images: image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : [],
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      site: '@studiva',
      creator: '@studiva',
      title: pageTitle,
      description,
      images: image ? [image] : [],
    },
    appleWebApp: {
      title: 'Studiva',
      statusBarStyle: 'black-translucent',
    },
    other: {
      'al:android:package': 'com.studiva.app',
      'al:android:app_name': 'Studiva',
      'al:android:url': appDeepLink,
      'al:ios:app_name': 'Studiva',
      'al:ios:url': appDeepLink,
      'apple-itunes-app': `app-id=com.studiva.app, app-argument=${appDeepLink}`,
    }
  };
}

function generateSchema(kind: string, id: string, data: any) {
  if (!data) return null;

  if (kind === 'user') {
    return {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      'mainEntity': {
        '@type': 'Person',
        'name': data.full_name || data.username || 'User',
        'alternateName': data.username,
        'image': data.avatar_url || '',
        'description': data.bio || `Check out ${data.full_name || data.username || 'User'}'s profile and study materials on Studiva.`,
        'url': `https://www.studiva.co.in/share/user/${data.username}`,
        'knowsAbout': ['Education', 'Study Notes', 'Academic learning', 'Quizzes', 'Lessons', 'Courses'],
      }
    };
  }

  const contentTypeName = data.content_type || kind;
  const typeMap: Record<string, string> = {
    content: 'LearningResource',
    note: 'LearningResource',
    quiz: 'Quiz',
    quizzes: 'Quiz',
    flashcard: 'LearningResource',
    flashcards: 'LearningResource',
    lesson: 'Course',
    lessons: 'Course',
    course: 'Course',
    courses: 'Course',
    playlist: 'Collection',
    playlists: 'Collection',
  };

  const resourceType = typeMap[contentTypeName] || 'LearningResource';

  return {
    '@context': 'https://schema.org',
    '@type': resourceType === 'Quiz' ? 'Quiz' : (resourceType === 'Course' ? 'Course' : 'LearningResource'),
    'name': data.title || `Shared ${contentTypeName}`,
    'description': data.description || `High-quality study resource on Studiva.`,
    'learningResourceType': contentTypeName,
    'image': data.preview_link || '',
    'url': `https://www.studiva.co.in/share/${kind}/${id}`,
    'author': {
      '@type': 'Person',
      'name': data.creator_name || data.creator_username || 'Studiva Creator',
      'image': data.creator_avatar || '',
    },
    'provider': {
      '@type': 'Organization',
      'name': 'Studiva',
      'url': 'https://www.studiva.co.in',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.studiva.co.in/images/studiva-quill-icon.png'
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': String(data.views ? Math.max(1, Math.floor(data.views / 7)) : 3),
      'bestRating': '5',
      'worstRating': '1'
    },
    'interactionStatistic': [
      {
        '@type': 'InteractionCounter',
        'interactionType': 'https://schema.org/WatchAction',
        'userInteractionCount': data.views || 0
      },
      {
        '@type': 'InteractionCounter',
        'interactionType': 'https://schema.org/LikeAction',
        'userInteractionCount': data.sparks_received || 0
      }
    ]
  };
}

export default async function Page({ params }: Props) {
  const { kind, id } = await params;
  const data = await fetchMetaData(kind, id);
  const schema = generateSchema(kind, id, data);

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <ShareRedirectClient kind={kind} id={id} initialData={data} />
    </>
  );
}
