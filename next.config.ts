import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "maxtuero.thenightowl.team",
      },
      {
        protocol: "https",
        hostname: "d2c6uubg0k03va.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
