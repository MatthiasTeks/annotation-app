/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'try-luminify.fr',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
