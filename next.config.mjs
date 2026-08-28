/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },

  /**
   * Set in next.config rather than vercel.json so they apply identically in
   * local dev, on Vercel, and on any other host.
   *
   * Deliberately no long-lived cache headers on /images: those filenames are
   * not content-hashed, so an aggressive immutable cache would strand visitors
   * on stale artwork the moment a real photograph replaces a category tile.
   * Next's own /_next/* assets are hashed and already cached correctly.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
