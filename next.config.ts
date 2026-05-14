import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.228.148.201"],
  async rewrites() {
    return [
      { source: "/sitemap.xml", destination: "/api/sitemap-index" },
      { source: "/static-sitemap.xml", destination: "/api/static-sitemap" },
      { source: "/sitemaps/:file*", destination: "/api/sitemap/:file*" },
    ];
  },
};

export default nextConfig;
