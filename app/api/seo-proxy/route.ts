import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json({ error: 'Missing type or id' }, { status: 400 });
    }

    if (type !== 'content' && type !== 'user') {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const workerUrl = process.env.WORKER_URL || 'https://api.studiva.co.in';
    const internalSecret = process.env.NEXT_PUBLIC_INTERNAL_API_SECRET || process.env.INTERNAL_API_SECRET;

    if (!internalSecret) {
      console.error('INTERNAL_API_SECRET is missing');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const endpoint = `${workerUrl}/public/${type}/${id}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${internalSecret}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch from worker: ${response.statusText}` }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400'
      }
    });
  } catch (error) {
    console.error('SEO Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
