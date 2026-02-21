/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: '/events', destination: '/event2', permanent: false }];
  },
  // Remove unsupported `eslint` config (use package.json or .eslintrc instead)
  // Remove experimental.appDir since it's default now
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com', pathname: '/**' },
      { protocol: 'https', hostname: 'drive.google.com', pathname: '/**' },
      { protocol: 'https', hostname: 'strapi.dhiwise.com', pathname: '/**' },
      { protocol: 'https', hostname: 'miro.medium.com', pathname: '/**' },
      { protocol: 'https', hostname: 'iconflux.com', pathname: '/**' },
      { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/**' },
      { protocol: 'https', hostname: 'foleys-assets.spicyweb.net.au', pathname: '/**' },
      { protocol: 'https', hostname: 'media.gettyimages.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.prod.website-files.com', pathname: '/**' },
    ],
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
