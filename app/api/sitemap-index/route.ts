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
    const baseUrl = `${protocol}://${host}`;

    xml = xml.replace(/https:\/\/cdn\.crine.in\/sitemaps\//g, `${baseUrl}/sitemaps/`);

    // Inject static sitemap into the index
    const staticSitemapEntry = `
  <sitemap>
    <loc>${baseUrl}/static-sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;
    
    if (xml.includes('</sitemapindex>')) {
      xml = xml.replace('</sitemapindex>', `${staticSitemapEntry}\n</sitemapindex>`);
    }

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
