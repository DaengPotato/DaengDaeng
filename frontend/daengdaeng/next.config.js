/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s3.ap-northeast-2.amazonaws.com', 'search.pstatic.net'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

// const prod = process.env.NODE_ENV === 'production';

// const withPWA = require('next-pwa')({
//   customWorkerDir: 'src/worker',
//   dest: 'public',
//   disable: prod ? false : true,
// });

module.exports = nextConfig;
