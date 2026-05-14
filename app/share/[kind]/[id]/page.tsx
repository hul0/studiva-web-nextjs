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

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      type: kind === 'user' ? 'profile' : 'article',
      images: image ? [image] : [],
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: pageTitle,
      description,
      images: image ? [image] : [],
    },
  };
}

export default function Page() {
  return <ShareRedirectClient />;
}
