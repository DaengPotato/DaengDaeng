/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};

const prod = process.env.NODE_ENV === 'production';

const withPWA = require('next-pwa')({
  customWorkerDir: 'src/worker',
  dest: 'public',
  disable: prod ? false : true,
});

module.exports = withPWA(nextConfig);
