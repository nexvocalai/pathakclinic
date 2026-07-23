/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  allowedDevOrigins: ['172.16.2.34'],
  async rewrites() {
    const apiUrl = process.env.API_URL || 'http://localhost:8080';
    return [
      {
        source: '/api/uploads/:path*',
        destination: `${apiUrl}/api/uploads/:path*`,
      },
    ];
  },
}

export default nextConfig
