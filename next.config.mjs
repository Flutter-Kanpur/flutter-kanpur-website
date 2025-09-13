

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental.appDir since it's default now
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com', 'drive.google.com', "strapi.dhiwise.com", "miro.medium.com", "iconflux.com", "i.ytimg.com", "cdn.prod.website-files.com", ]
  }
};

export default nextConfig;
