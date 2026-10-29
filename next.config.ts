import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Basic browser protections on every page. (A strict Content-Security-Policy
  // is left out: in Next.js it forces every page to render on demand instead
  // of being served from Vercel's cache.)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
