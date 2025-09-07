

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental.appDir since it's default now
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com', 'drive.google.com']
  }
};

export default nextConfig;
