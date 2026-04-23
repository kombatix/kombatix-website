/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export — deploys to Firebase Hosting CDN, no SSR.
  output: 'export',

  // No trailing slashes — cleaner URLs, matches firebase.json cleanUrls setting.
  trailingSlash: false,

  // next/image optimization requires a server. Static export can't do it.
  // We pre-generate OG images with Nano Banana Pro, so this is fine.
  images: { unoptimized: true },

  // Security + hygiene
  productionBrowserSourceMaps: false,
  poweredByHeader: false,

  // Optional perf
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
