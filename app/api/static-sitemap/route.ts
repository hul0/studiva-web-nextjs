import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://studiva.co.in';

  const staticRoutes = [
    '',
    '/team',
    '/support',
    '/privacy',
    '/tos',
    '/verified-creator',
    '/revenue-calc',
    '/suggest-feature',
    '/campus-representative',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes.map(route => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    }
  });
}
