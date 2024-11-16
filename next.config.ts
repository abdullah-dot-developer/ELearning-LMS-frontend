import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Allows any path after the hostname
      },
    ],
  },
  experimental: {
    reactRoot: true,
    surpressHydrationWarning: true,
  },
};

export default nextConfig;
