/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export - generates static HTML files
  // Content will be fetched dynamically in the browser via client components
  output: 'export',
  images: {
    unoptimized: true
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

