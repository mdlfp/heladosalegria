import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "heladosalegria-production.up.railway.app",
      },
    ],
  },
};

export default nextConfig;
