import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "heladosalegria-production.up.railway.app",
      },
    ],
  },
};

export default nextConfig;
