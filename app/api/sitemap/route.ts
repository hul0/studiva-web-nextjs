import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const file = searchParams.get('file');
    
    if (!file) {
      return new NextResponse('Missing sitemap file parameter', { status: 400 });
    }

    const response = await fetch(`https://cdn.crine.in/sitemaps/${file}`);
    
    if (!response.ok) {
      return new NextResponse('Failed to fetch sitemap', { status: response.status });
    }

    const xml = await response.text();

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400'
      }
    });
  } catch (error) {
    console.error('Sitemap Proxy Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
