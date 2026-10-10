import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a separate build/test run use its own folder without touching a running dev server.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  // Pin the project root: a stray package-lock.json in the user's home folder otherwise makes
  // Next.js guess the wrong workspace root.
  turbopack: { root: __dirname },
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 for site photographs; 90 for the YouTube poster frame, which is shown large.
    qualities: [75, 90],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  experimental: {
    globalNotFound: true,
    // Optimistic routing guessed the page segment of /en/about from the home page's tree and asked
    // for a path that does not exist (a 404 on every prefetch). Prefetches use the real route tree.
    optimisticRouting: false,
  },
};

export default nextConfig;
