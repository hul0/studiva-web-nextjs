import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.228.148.201", "10.93.139.190"],

  // ---------------------------------------------------------------------------
  // Sitemap rewrites – serve XML sitemaps directly from the CDN.
  //
  //   /sitemap.xml         → https://cdn.crine.in/sitemaps/sitemap-index.xml
  //   /sitemaps/:file.xml  → https://cdn.crine.in/sitemaps/:file.xml
  //
  // This replaces the old app/sitemap.ts approach (fetch → parse → re-emit).
  // The CDN already hosts the fully-formed XML; no need to re-process it.
  // ---------------------------------------------------------------------------
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "https://cdn.crine.in/sitemaps/sitemap-index.xml",
      },
      {
        source: "/sitemaps/:path*",
        destination: "https://cdn.crine.in/sitemaps/:path*",
      },
    ];
  },
};

export default nextConfig;
