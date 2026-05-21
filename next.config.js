const path = require("path");
const os = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = {
        type: "filesystem",
        cacheDirectory: path.join(os.tmpdir(), "mts-trucking-webpack-cache"),
        buildDependencies: { config: [__filename] },
      };
    }
    return config;
  },
};
module.exports = nextConfig;
