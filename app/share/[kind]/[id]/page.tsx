import { Metadata } from 'next';
import { ShareRedirectClient } from './ShareRedirectClient';

type Props = {
  params: Promise<{ kind: string; id: string }>;
};

async function fetchMetaData(kind: string, id: string) {
  const workerUrl = process.env.WORKER_URL || 'https://api.studiva.co.in';
  const internalSecret = process.env.NEXT_PUBLIC_INTERNAL_API_SECRET || process.env.INTERNAL_API_SECRET;

  if (!internalSecret) return null;

  try {
    const res = await fetch(`${workerUrl}/public/${kind}/${id}`, {
      headers: {
        'Authorization': `Bearer ${internalSecret}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json?.data;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kind, id } = await params;
  
  if (kind !== 'content' && kind !== 'user') {
    return { title: 'Shared Content | Studiva' };
  }

  const data = await fetchMetaData(kind, id);
  if (!data) return { title: 'Shared Content | Studiva' };

  let title, description, image;

  if (kind === 'content') {
    title = data.title || 'Shared Content';
    description = data.description || `Study material by ${data.creator_name || data.creator_username || 'a creator'}`;
    image = data.preview_link || '';
  } else {
    title = data.full_name || data.username || 'User';
    description = data.bio || `Check out ${title}'s profile and study materials on Studiva.`;
    image = data.avatar_url || '';
  }

  const pageTitle = kind === 'content'
    ? `${title} | Studiva`
    : `${title} (@${data.username}) · Studiva`;

  const url = `https://studiva.co.in/share/${kind}/${id}`;
  const appDeepLink = `studiva://${kind}/${id}`;

  return {
    title: pageTitle,
    description,
    metadataBase: new URL('https://studiva.co.in'),
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
    }
  };
}

export default async function Page({ params }: Props) {
  const { kind, id } = await params;
  const data = await fetchMetaData(kind, id);
  
  return <ShareRedirectClient kind={kind} id={id} initialData={data} />;
}
