import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true, // старий запис лишається тут
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
      },
    ],
  },
};

export default nextConfig;
