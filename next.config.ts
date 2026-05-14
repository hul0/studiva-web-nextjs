import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/sitemap.xml", destination: "/api/sitemap-index" },
      { source: "/sitemaps/:file", destination: "/api/sitemap?file=:file" },
    ];
  },
};

export default nextConfig;
