import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const response = await fetch('https://cdn.crine.in/sitemaps/sitemap-index.xml');
    
    if (!response.ok) {
      return new NextResponse('Failed to fetch sitemap index', { status: response.status });
    }

    let xml = await response.text();
    
    // Rewrite the sitemap URLs to use our own domain
    const host = req.headers.get('host') || 'studiva.co.in';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    xml = xml.replace(/https:\/\/cdn\.crine\.in\/sitemaps\//g, `${protocol}://${host}/sitemaps/`);

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400'
      }
    });
  } catch (error) {
    console.error('Sitemap Index Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
