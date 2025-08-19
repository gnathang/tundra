import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // disable dev indicators
  devIndicators: false,
  // add image support for local Strapi
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**"
      },
        {
        protocol: "https",
        hostname: "salty-refuge-88688-5d2aa6bd1957.herokuapp.com",
        pathname: "/**"
      }
    ]
  },
  // add svg webpack support
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
