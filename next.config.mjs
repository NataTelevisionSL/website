/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  swcMinify: false,
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};
export default nextConfig;
