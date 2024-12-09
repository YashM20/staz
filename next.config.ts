import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
   
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
