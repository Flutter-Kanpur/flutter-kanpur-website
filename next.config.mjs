/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Remove experimental.appDir since it's default now
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com', 'drive.google.com', "strapi.dhiwise.com", "miro.medium.com", "iconflux.com", "i.ytimg.com", "foleys-assets.spicyweb.net.au", "media.gettyimages.com", "cdn.prod.website-files.com",]
  },
  // Disable static optimization for dynamic routes
  trailingSlash: false,
  // Ensure proper asset prefix for Firebase hosting
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // External packages for server components
  serverExternalPackages: ['firebase-admin'],
  // Ensure proper output for Firebase Functions
  distDir: '.next',
};

export default nextConfig;
