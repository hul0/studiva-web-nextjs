import type { MetadataRoute } from 'next';

const CANONICAL_BASE = 'https://studiva.co.in';
const R2_BASE_URL = 'https://cdn.crine.in/sitemaps';

// ---------------------------------------------------------------------------
// All static pages in the app that should be indexed.
// Keep this in sync with any new public pages added to `app/`.
// ---------------------------------------------------------------------------
const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: `${CANONICAL_BASE}`, changeFrequency: 'daily', priority: 1 },
  { url: `${CANONICAL_BASE}/privacy`, changeFrequency: 'monthly', priority: 0.3 },
  { url: `${CANONICAL_BASE}/tos`, changeFrequency: 'monthly', priority: 0.3 },
  { url: `${CANONICAL_BASE}/team`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${CANONICAL_BASE}/support`, changeFrequency: 'monthly', priority: 0.4 },
  { url: `${CANONICAL_BASE}/suggest-feature`, changeFrequency: 'monthly', priority: 0.4 },
  { url: `${CANONICAL_BASE}/campus-representative`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${CANONICAL_BASE}/verified-creator`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${CANONICAL_BASE}/revenue-calc`, changeFrequency: 'monthly', priority: 0.4 },
];

// ---------------------------------------------------------------------------
// generateSitemaps – tells Next.js which sitemap IDs exist.
//
// "static"           → returns STATIC_PAGES (above)
// "users-1", etc.    → proxied from the R2 sitemap-index.xml
// "content-1", etc.  → proxied from the R2 sitemap-index.xml
//
// Next.js generates:
//   /sitemap/static.xml
//   /sitemap/users-1.xml
//   /sitemap/content-1.xml
//   ...
//
// It also auto-generates a sitemap-index at /sitemap.xml pointing to each.
// ---------------------------------------------------------------------------
export async function generateSitemaps(): Promise<Array<{ id: string }>> {
  const ids: Array<{ id: string }> = [{ id: 'static' }];

  try {
    const res = await fetch(`${R2_BASE_URL}/sitemap-index.xml`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const xml = await res.text();

      // Match chunk filenames from <loc> tags.
      // Expected format: https://cdn.crine.in/sitemaps/users-1.xml
      const locRegex = /<loc>\s*https?:\/\/[^<]*\/sitemaps\/([^<\s]+\.xml)\s*<\/loc>/g;
      let match: RegExpExecArray | null;

      while ((match = locRegex.exec(xml)) !== null) {
        // Strip .xml → the filename becomes the sitemap id
        // e.g. "users-1.xml" → id "users-1"
        const filename = match[1];
        const id = filename.replace(/\.xml$/, '');
        ids.push({ id });
      }
    }
  } catch {
    // If R2 is unreachable we still serve the static sitemap.
    console.warn('[sitemap] Failed to fetch R2 sitemap-index; only static pages will be listed.');
  }

  return ids;
}

// ---------------------------------------------------------------------------
// sitemap(props) – returns the URL entries for a given sitemap ID.
//
// For "static": returns hardcoded static pages.
// For R2 chunks: fetches the XML from R2, parses <url> entries, rewrites
// <loc> from cdn.crine.in paths to canonical studiva.co.in paths, and
// extracts <image:loc> for image sitemap support.
// ---------------------------------------------------------------------------
export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;

  // --- Static pages ---
  if (id === 'static') {
    return STATIC_PAGES.map((page) => ({
      ...page,
      lastModified: new Date(),
    }));
  }

  // --- Dynamic R2-hosted sitemaps ---
  try {
    const res = await fetch(`${R2_BASE_URL}/${id}.xml`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`[sitemap] R2 returned ${res.status} for ${id}.xml`);
      return [];
    }

    const xml = await res.text();
    return parseUrlsetXml(xml);
  } catch {
    console.warn(`[sitemap] Failed to fetch R2 chunk ${id}.xml`);
    return [];
  }
}

// ---------------------------------------------------------------------------
// XML parsing helpers – lightweight regex-based parser.
// We avoid pulling in a full XML library for this simple, known structure.
// ---------------------------------------------------------------------------

/**
 * Parses a <urlset> XML string into MetadataRoute.Sitemap entries.
 *
 * Handles:
 *  - <loc>               → url (rewritten to canonical domain)
 *  - <lastmod>           → lastModified
 *  - <changefreq>        → changeFrequency
 *  - <priority>          → priority
 *  - <image:loc>         → images[]
 */
function parseUrlsetXml(xml: string): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Split into individual <url>…</url> blocks
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g);
  if (!urlBlocks) return entries;

  for (const block of urlBlocks) {
    const loc = extractTag(block, 'loc');
    if (!loc) continue;

    const entry: MetadataRoute.Sitemap[number] = {
      url: rewriteToCanonical(loc),
    };

    const lastmod = extractTag(block, 'lastmod');
    if (lastmod) entry.lastModified = lastmod;

    const changefreq = extractTag(block, 'changefreq');
    if (changefreq) {
      entry.changeFrequency = changefreq as MetadataRoute.Sitemap[number]['changeFrequency'];
    }

    const priority = extractTag(block, 'priority');
    if (priority) entry.priority = parseFloat(priority);

    // Image sitemap extension – collect all <image:loc> values
    const imageUrls: string[] = [];
    const imgRegex = /<image:loc>\s*([\s\S]*?)\s*<\/image:loc>/g;
    let imgMatch: RegExpExecArray | null;
    while ((imgMatch = imgRegex.exec(block)) !== null) {
      const imgUrl = imgMatch[1].trim();
      if (imgUrl) imageUrls.push(imgUrl);
    }
    if (imageUrls.length > 0) entry.images = imageUrls;

    entries.push(entry);
  }

  return entries;
}

/** Extracts the text content of the first occurrence of a simple XML tag. */
function extractTag(xml: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}>\\s*([\\s\\S]*?)\\s*</${tag}>`);
  const match = regex.exec(xml);
  return match ? match[1].trim() : null;
}

/**
 * Rewrites a URL from the R2/CDN domain to the canonical domain.
 *
 * The R2 worker writes URLs using the canonical domain already for content
 * and user profile pages, but this is a safety net in case the worker
 * emits cdn.crine.in URLs instead.
 */
function rewriteToCanonical(url: string): string {
  return url.replace(/^https?:\/\/cdn\.crine\.in/, CANONICAL_BASE);
}
